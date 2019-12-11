const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const getlist = function(limit){
	var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	return ddb.listTables({Limit: limit}).promise()
}

exports.handler = async (event) => {	  
	try {
		let list = await getlist(10);
		return  {
			statusCode: 200,
			headers: {
			  "Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(list.TableNames)
		};
	}
	catch(e){
		return  {
			statusCode: 400,
			headers: {
				"Access-Control-Allow-Origin": "*"
			},
			body: err.code
		};
	}
};
