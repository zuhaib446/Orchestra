const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const setup = require("./lib/setup");

require('dotenv').config()

AWS.config.update({
  region: process.env.DB_REGION,
  endpoint: process.env.DB_PATH,
  accessKeyId:process.env.DB_ACCESSKEY,
  secretAccessKey:process.env.DB_SECRETKEY
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

setup.apply(app).catch(console.error);

app.listen(parseInt(process.env.SERVER_PORT), function (){ 
	console.log(`V4 PLAS launched @ ${process.env.SERVER_PORT} `)
})

