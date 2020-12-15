const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/countries', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        var response = [];
        await client.connect();
        const querystr = `select distinct(country) stamp_id, country, theme from location where theme = '${req.query.theme}' order by stamp_id desc`;

        var resp = await client.query(querystr);
        let counter = 0;
        resp.rows.forEach(row => {
            let data = {
              id:  ++counter,
              country: row.country,
              theme: row.theme,
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