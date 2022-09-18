
const axios = require('axios')
const AdmZip = require('adm-zip')
const csv = require('csvtojson')
const fs = require('fs-extra');

const carsDataRegex = new RegExp(/^.*\/_data\/db\/cars.csv$/);
const manufacturersDataRegex = new RegExp(/^.*\/_data\/db\/maker.csv$/);
const legendDataRegex = new RegExp(/^.*\/_data\/legend\/\d{2}-\d{2}-\d{2}.csv$/);

const parseDate = (dataString) => {
    let [year, month, day] = (dataString.split('-'))
    year = '20'.concat(year)
    return new Date(`${year}-${month}-${day}`)
}

const getZip = async (url) => {
    const options =  { 
        method: 'GET',
        url: url,
        responseType: "arraybuffer"
    };
    const { data } = await axios(options);
    const zip = new AdmZip(data);
    return zip;
}

const build = async () => {
    const zip = await getZip('https://github.com/ddm999/gt7info/archive/web-new.zip')
    
    const manufacturersCsvData = zip.getEntries().find(entry => {
        return manufacturersDataRegex.test(entry.entryName)
    })
    const manufacturersData = await csv().fromString(manufacturersCsvData.getData().toString('utf8'));
    fs.outputFileSync('data/manufacturers.json', JSON.stringify(manufacturersData))
    
    const carsCsvData = zip.getEntries().find(entry => {
        return carsDataRegex.test(entry.entryName)
    })
    const carsData = await csv().fromString(carsCsvData.getData().toString('utf8'));
    fs.outputFileSync('data/cars.json', JSON.stringify(carsData))


    const lengendCsvData = zip.getEntries().filter(entry => {
        return legendDataRegex.test(entry.entryName)
    })
    
    const carOccurences = []
    
    const datesArray = []
    
    for await (let entry of lengendCsvData) {
        let data = entry.getData().toString('utf8')
        let jsonData = await csv().fromString(data);
        let regex = new RegExp(/(\d{2}-\d{2}-\d{2})\.csv$/gm)
        let date = parseDate(regex.exec(entry.entryName)[1])
        datesArray.push(date)
    
        jsonData.forEach(car => {
            carOccurences.push({
                id: car.id,
                price: car.cr,
                state: car.state,
                date: date
            })
        })
    }
    
    fs.outputFileSync('data/occurrences.json', JSON.stringify(carOccurences))

    fs.outputFileSync('data/date.json', JSON.stringify(Date()))
}

build()