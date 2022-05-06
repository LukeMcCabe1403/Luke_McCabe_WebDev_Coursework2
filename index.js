const express = require('express');
const app = express();
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cookieParser())

app.use(express.urlencoded({extended: false}));

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));

const router = require('./routes/restaurantRoutes');
app.use('/', router); 

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})