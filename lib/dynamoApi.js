const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const create = async function (name,schema){

} 

const edit = async function (param){

} 

const remove = async function (param){

} 

const list = async function(param){

}

const read = async function(param){

}

const getdbs = function(limit = 100){
	var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	return ddb.listTables({Limit: limit}).promise()
} 

exports.api = {
	create,edit,remove,list,read,getdbs
}

