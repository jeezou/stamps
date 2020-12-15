const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/search_stamp', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        var response = [];
        await client.connect();
        const querystr = `select country, stamp_theme, size, color, price from location left join info on info.id = location.stamp_id where theme = '${req.query.theme}' and volume = '${req.query.volume}' and page = '${req.query.page}' and position = '${req.query.position}'`;
     
        var resp = await client.query(querystr);
        let counter = 0;
        resp.rows.forEach(row => {
            let data = {
              id:  ++counter,
              country: row.country,
              stamp_theme: row.stamp_theme,
              size: row.size,
              color: row.color,
              price: row.price
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