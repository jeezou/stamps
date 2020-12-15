const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.post('/add', async (req, res) => {
    try {
        var client = new pg.Client(conString);
        await client.connect();

        let volume_number
        var resp = await client.query("select max(volume) from location");
        if(resp.rows.length){
          volume_number = ++(resp.rows[0].max);
        }else{
          console.log(`ERROR`)
          res.send({error: true})
          return
        }
        await client.query(`
          insert into info
          (
            produce_country,
            serial_number,
            serial_theme,
            year,
            color,
            size,
            price,
            stamp_theme
          )
          values
          (
            '${req.body.produce_country}', 
            '${req.body.serial_number}', 
            '${req.body.serial_theme}',
            '${req.body.year}',
            '${req.body.color}',
            '${req.body.size}',
            '${req.body.price}',
            '${req.body.stamp_theme}'
          )
        `)

        await client.query(`
          insert into location 
          (
            theme,
            country,
            volume,
            page,
            position
          )
          values 
          (
            '${req.body.theme}',
            '${req.body.produce_country}',
            '${volume_number}',
            '${req.body.page}', 
            '${req.body.position}'
          )
        `)
        await client.end()
    
        res.send({error: false})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 