const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const uu = require('url-unshort')();


const file = path.resolve(__dirname, '..', 'files', 'CG_F2.csv')

const regexLatLog = /-\d.\d*,-\d{2}.\d*/g
const regexCoord = /7%C2%.+%22W/




fs.createReadStream(file)
    .pipe(csv())
    .on('data', async function (row) {
        try {
            const url = await uu.expand(`${row.coordinates}`)
            if (url) {
                console.log("seq"+row.sequence, decodeURI(url.match(regexCoord)).replace('+', ' '))

            }
            else console.log('not expanded');
        } catch (err) {
            console.log(err);
        }
        // console.log(row.coordinates);
    })
    .on('end', function () {
        console.table("End")
        // TODO: SAVE users data to another file
    })