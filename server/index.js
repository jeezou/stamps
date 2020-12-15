const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const get_themes = require('./api/get_themes')
const get_serias = require('./api/get_serias')
const get_sizes = require('./api/get_sizes')
const get_volumes = require('./api/get_volumes')
const get_pages = require('./api/get_pages')
const get_positions = require('./api/get_positions')

const countries = require('./api/countries')
const volumes = require('./api/volumes')
const location = require('./api/location')
const serial_themes = require('./api/serial_themes')
const search_stamp = require('./api/search_stamp')
const add = require('./api/add')
const remove_theme = require('./api/remove_theme')
const move_stamp = require('./api/move_stamp')
const get_reference = require('./api/get_reference')
const get_report = require('./api/get_report')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8080'
}));

app.get('/', (req, res) => {
  res.send('<h3>Welcome to Stamp Collection API<h3>')
})

app.get('/get_themes', get_themes);
app.get('/get_serias', get_serias);
app.get('/get_sizes', get_sizes);
app.get('/get_volumes', get_volumes);
app.get('/get_pages', get_pages);
app.get('/get_positions', get_positions);

app.get('/countries', countries)
app.get('/volumes', volumes);
app.get('/location', location);
app.get('/serial_themes', serial_themes);
app.get('/search_stamp', search_stamp);

app.post('/add', add);
app.post('/remove_theme', remove_theme);
app.post('/move_stamp', move_stamp);

app.get('/get_reference', get_reference);
app.get('/get_report', get_report);


app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
