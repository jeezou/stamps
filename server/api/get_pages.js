const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/get_pages', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        await client.connect();
        const querystr = `select distinct(page) page, volume, theme from location where theme = '${req.query.theme}' and volume = '${req.query.volume}' `;
        var response = [];
        var resp = await client.query(querystr);
        resp.rows.forEach(row => {
            response.push({name: row.page})
        });
        await client.end()
        res.send({data: response})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 