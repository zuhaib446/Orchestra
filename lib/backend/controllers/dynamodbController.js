const AWS = require('aws-sdk');

const listTables = function(limit = 100){
	const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	return ddb.listTables({Limit: limit}).promise();
}

exports.getTableNames = async function(req,res,next){
	try{
		let tabs = await listTables();
		tabs = tabs.TableNames;
		res.json(tabs)
	}
	catch(e){
		console.log(e);
		res.status(400).send("some error ");
	}
}

exports.addTable = async function(req,res,next){	
	try{
		console.log(req.body);

		res.json({success:"yaaa"})
	}
	catch(e){
		console.log(e);
		res.status(400).send("some error ");
	}
}

