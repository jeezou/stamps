const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/get_reference', async (req, res) => {    
  let theme = req.query.theme
  try {
      var client = new pg.Client(conString);
      var response = [];
      await client.connect();

      let resp = await client.query(`select distinct(country) country from location where theme = '${theme}' `)
      
      let countries = [] 
      resp.rows.forEach(row => {
        countries.push(row.country)
      })

      let counter = 0
      for (let i = 0; i < countries.length; i++) {
        let resp = await client.query(`select count(stamp_id) from location where theme = '${theme}' and country = '${countries[i]}'`)
        response.push({
          id: ++counter,
          country: countries[i],
          amount: resp.rows[0].count
        })
      }

      await client.end()
      res.send({data: response})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 