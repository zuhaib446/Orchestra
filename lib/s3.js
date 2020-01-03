const fs    = require("fs");
const path  = require("path");
const express = require('express');
const s3path = path.join(__dirname,'../s3/');

exports.apply = async function (app) {
	const dir   = await fs.promises.opendir(s3path);
	for await (const dirent of dir) {		
		if(dirent.name == "orchestra") {
			console.log("S3 bucket orchestra is taken ");
			continue;
		}
		app.use(`/${dirent.name}`, express.static(path.join(s3path,dirent.name)))
	}
}