const fs = require('fs');
const axios = require('axios');
const process = require('process');

const arg = process.argv[2]

if (arg.includes(".com")) webCat(arg)
else cat(arg)
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url)
        console.log(res.data)
    }
    catch (error) {
        console.error(`Error fetching ${url}: ${error}`)
        process.exit(1)
    }
}