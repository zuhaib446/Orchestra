const fs    = require("fs");
const path  = require("path");
const express = require('express');
const s3path = path.join(__dirname,'../s3/');

exports.apply = async function (app) {
	const dir   = await fs.promises.opendir(s3path);
	app.get('/favicon.ico',function(req,res){
		res.sendFile(path.join(__dirname,'./www/img/favicon.ico'));
	})
	app.use(`/orchestra`, express.static(path.join(__dirname,'./www/')))
	for await (const dirent of dir) {		
		if(dirent.name == "orchestra") {
			console.log("S3 bucket orchestra is taken ");
			continue;
		}
		app.use(`/${dirent.name}`, express.static(path.join(s3path,dirent.name)))
	}
}