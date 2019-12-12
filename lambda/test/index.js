const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {	  
	return  {
		statusCode: 200,		
		body: "this is a new route"
	};	
};
