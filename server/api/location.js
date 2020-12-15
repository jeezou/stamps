const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/location', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        var response = [];
        await client.connect();
        const querystr = `select stamp_id, theme, country, stamp_theme, volume, page, position from location left join info on info.id = location.stamp_id where theme = '${req.query.theme}' order by stamp_id asc`;

        var resp = await client.query(querystr);
        let counter = 0;
        resp.rows.forEach(row => {
            let data = {
              id:  ++counter,
              theme: row.theme,
              country: row.country,
              stamp_theme: row.stamp_theme, 
              volume: row.volume,
              page: row.page,
              position: row.position
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