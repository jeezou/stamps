const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/get_sizes', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        await client.connect();
        const querystr = `select size from info group by size`;
        var response = [];
        var resp = await client.query(querystr);
        resp.rows.forEach(row => {
            response.push({name: row.size})
        });
        await client.end()
        res.send({data: response})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 