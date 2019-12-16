const express = require('express');
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

setup.apply(app)
	.then(function(){
		app.listen(parseInt(process.env.SERVER_PORT), function (){ 
			console.log(`Orchestra launched @ ${process.env.SERVER_PORT} `)
		})
	})
	.catch(console.error);


