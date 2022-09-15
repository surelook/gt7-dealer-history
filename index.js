
import axios from 'axios';
import AdmZip from 'adm-zip';
import csv from 'csvtojson'
import fs, {writeFileSync} from "fs"

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

async function get(url) {
    const options =  { 
        method: 'GET',
        url: url,
        responseType: "arraybuffer"
    };
    const {data } = await axios(options);
    return data;
}

const zipFileBuffer = await get('https://github.com/ddm999/gt7info/archive/web-new.zip');
const zip = new AdmZip(zipFileBuffer);

const carsDataRegex = new RegExp(/^.*\/_data\/db\/cars.csv$/);
const manufacturersDataRegex = new RegExp(/^.*\/_data\/db\/maker.csv$/);
const legendDataRegex = new RegExp(/^.*\/_data\/legend\/\d{2}-\d{2}-\d{2}.csv$/);

const manufacturersCsvData = zip.getEntries().find(entry => {
    return manufacturersDataRegex.test(entry.entryName)
})

const manufacturersData = await csv().fromString(manufacturersCsvData.getData().toString('utf8'));

const carsCsvData = zip.getEntries().find(entry => {
    return carsDataRegex.test(entry.entryName)
})

const carsData = await csv().fromString(carsCsvData.getData().toString('utf8'));

const lengendCsvData = zip.getEntries().filter(entry => {
    return legendDataRegex.test(entry.entryName)
})

const carOccurences = []

const datesArray = []

const parseDate = (dataString) => {
    let [year, month, day] = (dataString.split('-'))
    year = '20'.concat(year)
    return new Date(`${year}-${month}-${day}`)
}

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

const carOccurencesById = carOccurences.reduce((acc, curr) => {
    let pointer = acc.find(occurence => occurence[0].id === curr.id)
    if (!pointer) {
        acc.push([curr])
    } else {
        pointer.push(curr);
    }
    return acc;
},[])
console.log(carOccurencesById)

const stateIcon = (state) => {
    switch(state) {
        case 'limited':
            return '&#9888;'
        case 'soldout':
            return '&#10006;'
        case 'normal':
            return '&check;'
        case 'new':
            return '&starf;'
    }
}

const stateLabel = (state) => {
    switch(state) {
        case 'limited':
            return 'Limited Stock'
        case 'soldout':
            return 'Sold Out'
        case 'normal':
            return 'In Stock'
        case 'new':
            return 'New'
    }
}

const formatCredits = (credits) => {
    return `${credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} cr`
}

const Page = `<!DOCTYPE html>
<html>
    <head>
        <title>GT7 Historic Stock Info</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <style>
        body {
            font-family: "Helvetica Neue", "sans-serif";
            font-size: .874rem;
            background-color: #1c1e20;
            min-height: 100vh;
            color: #b0b6c4;
        }
        a {
            color: #45b0ff;
        }
        .discrete {
            color: #686a70;
        }
        table {
            table-layout: fixed;
            border-collapse: separate; /* Don't collapse */
            border-spacing: 0;
        }
        td, th {
            padding: 5px;
            border-bottom: 2px solid #1c1e20;
            background-color: #202024;
            min-width: 1.4em;
        }
        th:first-child {
            border-right: 2px solid #1c1e20;
        }
        tr:hover td,
        tr:hover th {
            background-color: #202229;
        }
        tbody th {
            position: -webkit-sticky;
            position: sticky;
            left: 0;
            z-index: 1;
            text-align: left;
            padding: 5px 10px;
        }
        thead tr {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 2;
        }
        thead th {
            padding-top: 1em;
            white-space: nowrap;
        }
        thead th:first-child {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 3;
        }
        tbody td {
            text-align: center;
        }
        .state {
            cursor: default;
        }
        .state.soldout {
            color: #a12a34;
        }
        .state.normal {
            color: #45b0ff;
        }
        .state.limited {
            color: #f3f629;
        }
        .state.new {
            color: #95b217;
        }
        .month-label {
            position: absolute;
            transform: translateY(-1.1em);
            font-size: 0.8em;
        }
        .message {
            border-top: 2px solid #1c1e20;
            background-color: #202229;
            padding: 5px 10px;
            position: -webkit-sticky;
            position: sticky;
            bottom: 0;
            left: 0;
            z-index: 4;
        }
        </style>
        <table>
            <thead>
            <tr>
                <th>
                </th>
                ${datesArray.map((date, index, array) => {
                    let label
                    if (index === 0 || array[index].getMonth() !== array[index - 1].getMonth()) {
                        label = `${monthNames[array[index].getMonth()]} ${array[index].getFullYear()}`
                    }
                    return `<th>${label ? `<span class="month-label">${label}</span>` : ''}${date.getDate()}</th>`
                }).join('')}
            </tr>
            </thead>
            <tbody>
        ${Object.entries(carOccurencesById).map(([key, value]) =>  {
            return `<tr>
            <th>${carsData.find(car => car.ID == value[0].id).ShortName}</th>
            ${datesArray.map(date => {
                return `<td>${(() => {
                    let entry = value.find(occurence => occurence.date === date)
                    return `${entry ? `<span title="${entry.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}&#10;${stateLabel(entry.state)}&#10;${formatCredits(entry.price)}" class="state ${entry.state}">${stateIcon(entry.state)}</span>` : ''}`
                })()}</td>`
            }).join('')}
        </tr>`
        }).join('')}
            </tbody>
        </table>
        <div class="message">Data provided by <a href="https://ddm999.github.io/gt7info/">GT7 Info</a>. <span class="discrete">Last retrieved at ${Date()}</span></div>
    </body>
</html>`

if (!fs.existsSync('dist')){
    fs.mkdirSync('dist');
}
writeFileSync("dist/index.html", Page)