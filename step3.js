const fs = require('fs');
const axios = require('axios');
const process = require('process');

let arg = process.argv[2]

if (arg.includes(".com")) console.log(webCat(arg))

else if (arg === '--out') {
    let writeFile = process.argv[3];
    let writeData = '';
    if (process.argv[4].includes(".com"))
        writeData = webCat(process.argv[4])
    else writeData = cat(process.argv[4])

    fs.writeFile(writeFile, writeData, { encoding: 'utf8', flag: 'a' }, err => {
        if (err) {
            console.log(`Couldn't write ${writeFile}: ${err}`)
            process.exit(1)
        }
    })
}
else console.log(cat(arg))

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1)
        }
        return data
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url)
        return res.data
    }
    catch (error) {
        console.error(`Error fetching ${url}: ${error}`)
        process.exit(1)
    }
}
// let out;
// let path;

// if (process.argv[2] === '--out') {
//     out = process.argv[3];
//     path = process.argv[4];
// }
// else { path = process.argv[2] }

// if (path.includes(".com")) webCat(path, out)
// else cat(path, out)

// function cat(path, out) {
//     fs.readFile(path, 'utf8', (err, data) => {
//         if (err) {
//             console.log(`Error reading ${path}: ${err}`);
//             process.exit(1)
//         }
//         outputData(data, out)
//     })
// }

// async function webCat(url, out) {
//     try {
//         let res = await axios.get(url)
//         outputData(res.data, out)
//     }
//     catch (error) {
//         console.error(`Error fetching ${url}: ${error}`)
//         process.exit(1)
//     }
// }

// function outputData(data, out) {
//     if (out) {
//         fs.writeFile(out, data, 'utf8', err => {
//             if (err) {
//                 console.log(`Couldn't write ${data}: ${err}`)
//                 process.exit(1)
//             }
//         })
//     }
//     else {
//         console.log(data)
//     }
// }