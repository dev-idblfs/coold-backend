
const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const cors = require("cors")
// const log = require('./logs/logger')
const cookieParse = require('cookie-parser');
const robots = require('express-robots-txt');

// setting up global variables
global.ROOT_DIR = path.resolve(__dirname);
global.CONFIG = {};

var port = process.env.PORT || 3000;
// init express
var app = module.exports = express()

// server static files
app.use('/public', express.static(path.join(__dirname, 'public')))

// setting up robot.txt
app.use(robots({ UserAgent: '*', Disallow: '/public/' }))

app.set('view engine', 'ejs')

app.use('views', express.static(path.join(__dirname, 'views')))

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse applilcation/json
app.use(bodyParser.json());

app.use(cookieParse())


var whitelist = ['https://onxcy.com', 'https://onxcy.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    console.log(req.headers)
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        console.log('aa');
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        console.log('ggg');
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

// global.log = require('./logs')

app.use((req, res, next) => {
    const OY_ENV = process.env.NODE_ENV || 'development'

    // load comman CONFIG
    const globalcnf = require(`${ROOT_DIR}/config/config`);
    // load conditional config
    const conditionalcnf = require(`${ROOT_DIR}/config/${req.headers.host.match(/^localhost/) ? 'development' : 'production'}/config`);
    // comdine config into global variables
    CONFIG = { ...globalcnf, ...conditionalcnf };

    CONFIG.BASE_URL = req.headers.host.match(/^localhost/) ? `http://${req.headers.host}/` : `https://${req.headers.host}/`

    next();
})

app.use(require('./config/routes'));

app.use((err, req, res, next) => {

    console.log(err);
    // res.status(500).render('error');
    res.send(500)
})

app.use((req, res, next) => {
    res.status(400).render('error/404');
})

app.listen(port, () => console.log(`I'm running @ ${port}`))
