const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/stamps";
const router = express.Router()

router.get('/get_report', async (req, res) => {    
  let themes = []
  let table = []
  
  try {
      var client = new pg.Client(conString);
      await client.connect();


      let resp = await client.query(`select distinct(theme) theme from location `)
      resp.rows.forEach(row => {
        themes.push(row.theme)
      })

      
      for (let j = 0; j < themes.length; j++) {  
        var theme = {};
        theme.name = themes[j]
        theme.tableData = []
        
        let resp = await client.query(`select distinct(country) country from location where theme = '${themes[j]}' `)
      
        let countries = [] 
        resp.rows.forEach(row => {
          countries.push(row.country)
        })
  
        let counter = 0
        for (let i = 0; i < countries.length; i++) {
          let resp = await client.query(`select count(stamp_id) from location where theme = '${themes[j]}' and country = '${countries[i]}'`)
          theme.tableData.push({
            id: ++counter,
            country: countries[i],
            amount: resp.rows[0].count
          })
        }

        table.push(theme)
      }

      resp = await client.query(`select distinct(country) from location `)
      let countries = resp.rows.length;

      resp = await client.query(`select distinct(volume, page) from location`)
      let pages = resp.rows.length;


      let data = {table, countries, pages}

      await client.end()
      res.send({data})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 