const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.post('/remove_theme', async (req, res) => {
    try {
        var client = new pg.Client(conString);
        await client.connect();

        let id = []
        var resp = await client.query(`select stamp_id from location where theme = '${req.body.theme}'`);
        if(resp.rows.length){
          resp.rows.forEach(item => {
            id.push(item.stamp_id)
          })
          console.log(id);
          if(id.length > 0){
            let str = `delete from info where id in (${id[0]}`
            for (let i = 1; i < id.length; i++) {
              str += ', '+id[i]              
            }
            str += ')'
            console.log(str)

            var resp = await client.query(`delete from location where theme = '${req.body.theme}'`);
            var resp = await client.query(str);
          }
        }else{
          console.log(`ERROR`)
          res.send({error: true})
          return
        }     

        await client.end()
        res.send({error: false})
    }
    catch(e){
        console.log(`error - ${e}`)
    }
})

module.exports = router 