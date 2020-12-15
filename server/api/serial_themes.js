const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/serial_themes', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        var response = [];
        await client.connect();
        const querystr = `select stamp_id, serial_theme, stamp_theme, serial_number, size from location left join info on info.id = location.stamp_id where size= '${req.query.size}' order by stamp_id desc`;

        var resp = await client.query(querystr);
        let counter = 0;
        resp.rows.forEach(row => {
            let data = {
              id: ++counter,
              serial_theme: row.serial_theme,
              stamp_theme: row.stamp_theme,
              serial_number: row.serial_number,
              size: row.size
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