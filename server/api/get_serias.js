const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/get_serias', async (req, res) => {    
    try {
        var client = new pg.Client(conString);
        await client.connect();
        const querystr = `select serial_number from info group by serial_number`;
        var response = [];
        var resp = await client.query(querystr);
        resp.rows.forEach(row => {
            response.push({name: row.serial_number})
        });
        await client.end()
        res.send({data: response})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 