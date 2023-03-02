const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
// const log = require('./logs/logger')
const cookieParse = require("cookie-parser");
const robots = require("express-robots-txt");
const dotenv = require("dotenv");
const DB = require("./config/mongoDB");
dotenv.config();

// setting up global variables
global.ROOT_DIR = path.resolve(__dirname);
global.CONFIG = {};

var port = process.env.PORT || 3000;
// init express
var app = (module.exports = express());

// server static files
app.use("/public", express.static(path.join(__dirname, "public")));

// setting up robot.txt
app.use(robots({ UserAgent: "*", Disallow: "/public/" }));

app.set("view engine", "ejs");

app.use("views", express.static(path.join(__dirname, "views")));

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse applilcation/json
app.use(bodyParser.json());

app.use(cookieParse());

app.use(cors());

// global.log = require('./logs')

// load comman CONFIG
CONFIG = require(`${ROOT_DIR}/config/config`);

app.use((req, res, next) => {
  const OY_ENV = process.env.NODE_ENV || "development";

  // load conditional config
  const conditionalcnf = require(`${ROOT_DIR}/config/${req.headers.host.match(/^localhost/) ? "development" : "production"}/config`);
  // comdine config into global variables
  CONFIG = { ...CONFIG, ...conditionalcnf };

  CONFIG.BASE_URL = req.headers.host.match(/^localhost/)
    ? `http://${req.headers.host}/`
    : `https://${req.headers.host}/`;

  next();
});

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next()
});

app.use(require("./config/routes"));

app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500).render('error');
  res.send(500);
});

app.use((req, res, next) => {
  if (req.url.startsWith("/v1") || req.url.startsWith("/api")) {
    console.log("URL ", req.url);
    res.sendStatus(404);
  } else {
    res.status(404).render("error/404");
  }
});


app.listen(port, async () => {
  await DB.connection()
  console.log(`I'm running @ ${port} env:${process.env.NODE_ENV}`)
});
