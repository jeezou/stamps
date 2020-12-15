const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.post('/move_stamp', async (req, res) => {
    try {

      console.log(req.body)

      var client = new pg.Client(conString);
      await client.connect();

      var resp = await client.query(`select max(volume) from location where theme = '${req.body.new_theme}' and country = '${req.body.country}'`);
      if(resp.rows[0].max){
        const MAX_PAGE = 192
        const MAX_POS = 6
        let volume = resp.rows[0].max;

        console.log(`Check volume ${volume}`)
        var resp = await client.query(`select max(page) from location where volume = '${volume}'`);
        let page = resp.rows[0].max

        var resp = await client.query(`select max(position) from location where volume = '${volume}' and page = '${page}'`);
        let position = resp.rows[0].max

        console.log(`Vol - ${volume}\nPage - ${page}\nPosition - ${position}`)

        if(page == MAX_PAGE && position == MAX_POS){
          // create new volume
          var resp = await client.query(`select max(volume) from location`);
          volume = resp.rows[0].max
          page = 1
          position = 1
        } else if(position == MAX_POS){
          // create new page
          page += 1
          position = 1
        } else {
          // create new position
          position += 1
        }

        var resp = await client.query(`update location set theme = '${req.body.new_theme}', volume = '${volume}', page = '${page}', position='${position}' where volume = '${req.body.volume}' and page = '${req.body.page}' and position = '${req.body.position}'`);
        


      
      }else{
        //create new volume or not...
        var resp = await client.query(`select max(volume) from location`);
        let new_volume = resp.rows[0].max
        
        var resp = await client.query(`select count(stamp_id) from location where volume = '${new_volume}'`);
        if(resp.rows[0].count > 1) new_volume += 1
        console.log(new_volume) 

        var resp = await client.query(`update location set theme = '${req.body.new_theme}', volume = '${new_volume}', page = '1', position = '1' where volume = '${req.body.volume}' and page = '${req.body.page}' and position = '${req.body.position}'`);

      }     

      await client.end()
      res.send({error: false})
    }
    catch(e){
      console.log(`error - ${e}`)
    }
})

module.exports = router 