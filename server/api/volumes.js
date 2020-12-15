const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/volumes', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        var response = [];
        await client.connect();
        const querystr = `select stamp_id, theme, stamp_theme, volume, serial_number from location left join info on info.id = location.stamp_id where serial_number = '${req.query.seria}' order by stamp_id desc`;

        var resp = await client.query(querystr);
        let counter = 0;
        resp.rows.forEach(row => {
            let data = {
              id:  ++counter,
              theme: row.theme,
              stamp_theme: row.stamp_theme,
              volume: row.volume,
              serial_number: row.serial_number
            }
            response.push(data);
        });
        await client.end()
        res.send({data: response})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 