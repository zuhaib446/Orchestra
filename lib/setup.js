const apigw    = require("./apigw");
const s3    = require("./s3");
const ddb    = require("./dynamodb");
const path  = require("path");
const express = require('express');

const router1 = require("./backend/routes/dynamoroutes")

exports.apply = async function (app) {

	app.get('/favicon.ico',function(req,res){
		res.sendFile(path.join(__dirname,'./www/img/favicon.ico'));
	})
	app.use(`/orchestra`, express.static(path.join(__dirname,'./www/')))
	app.use("/orc",router1); 
	await apigw.apply(app);
	await ddb.apply(app);
	await s3.apply(app);
}
