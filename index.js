
const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const cors = require("cors")
// const log = require('./logs/logger')
const cookieParse = require('cookie-parser')

// setting up global variables
global.ROOT_DIR = path.resolve(__dirname);
global.CONFIG = {};

// init express
var app = module.exports = express()

// server static files
app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.use('views', express.static(path.join(__dirname, 'views')))

// allow cross origin
app.use(cors());

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse applilcation/json
app.use(bodyParser.json());

app.use(cookieParse())

// global.log = require('./logs')

app.use((req, res, next) => {
    const nvENV = process.env.NODE_ENV || 'development'

    // CONFIG = require('./config')
    CONFIG.BASE_URL = `https://${req.hostname}`

    next();
})

app.use(require('./config/routes'));

app.use((err, req, res, next) => {

    console.lg(err);
    // res.status(500).render('error');
    res.send(500)
})

app.use((req, res, next) => {
    res.status(400).render('error/404');
})

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))
