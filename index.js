
import axios from 'axios';
import AdmZip from 'adm-zip';
import csv from 'csvtojson'
import {writeFileSync} from "fs"

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

for await (let entry of lengendCsvData) {
	let data = entry.getData().toString('utf8')
    let jsonData = await csv().fromString(data);
    let regex = new RegExp(/(\d{2}-\d{2}-\d{2})\.csv$/gm)
    let date = regex.exec(entry.entryName)[1]
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
    if(!acc[curr.id]) acc[curr.id] = [];
    acc[curr.id].push(curr);
    return acc;
},{});

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

const Page = `<html>
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
        table {
            border-collapse: separate; /* Don't collapse */
            border-spacing: 0;
        }
        td, th {
            padding: 5px;
            border-bottom: 2px solid #1c1e20;
            background-color: #202229;
        }
        tbody th {
            position: sticky;
            left: 0;
            z-index: 1;
            text-align: left;
            padding: 5px 10px;
            border-right: 2px solid #1c1e20;
        }
        thead th {
            position: sticky;
            top: 0;
            z-index: 2;
            white-space: nowrap;
        }
        thead th:first-child {
            left: 0;
            z-index: 3;
        }
        tbody td {
            text-align: center;
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
        .message {
            border-top: 2px solid #1c1e20;
            background-color: #202229;
            padding: 5px 10px;
            position: sticky;
            bottom: 0;
            left: 0;
            z-index: 4;
        }
        </style>
        <table>
            <thead>
                <th>
                </th>
                ${datesArray.map(date => `<th>${date}</th>`).join('')}
            </thead>
            <tbody>
        ${Object.entries(carOccurencesById).map(([key, value]) =>  {
            return `<tr>
            <th>${carsData.find(car => car.ID == key).ShortName}</th>
            ${datesArray.map(date => {
                return `<td>${(() => {
                    let entry = value.find(occurence => occurence.date === date)
                    return `${entry ? `<span title="${stateLabel(entry.state)}" class="state ${entry.state}">${stateIcon(entry.state)}</span>` : ''}`
                })()}</td>`
            }).join('')}
        </tr>`
        }).join('')}
            </tbody>
        </table>
        <div class="message">Data provided by <a href="https://ddm999.github.io/gt7info/">GT7 Info</a>.</div>
    </body>
</html>`
 
writeFileSync("./dist/index.html", Page)