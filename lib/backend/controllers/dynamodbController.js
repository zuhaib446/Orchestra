const AWS = require('aws-sdk');

const listTables = function (limit = 100) {
	const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	return ddb.listTables({ Limit: limit }).promise();
}

exports.getTableNames = async function (req, res, next) {
	try {
		let tabs = await listTables();
		tabs = tabs.TableNames;
		res.json(tabs)
	}
	catch (e) {
		console.log(e);
		res.status(400).send("some error ");
	}
}

exports.deleteDynamoDb = async function (req, res, next) {
	const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	let response = await deleteTable(req.body.table, ddb);
	res.json(response);
}

const deleteTable = async function (tname, ddb) {
	try {
		await ddb.deleteTable({ TableName: tname }).promise();
		return { success: 'Table ' + tname + ' deleted' };
	}
	catch (e) {
		return { error: 'Error in delete table ' + tname };
	}
}

exports.addNewDynamoDb = async function (req, res, next) {

	const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	let tables = await ddb.listTables({ Limit: 100 }).promise();

	tables = tables.TableNames;

	for await (let tbl of tables) {
		if (tbl != req.body.tablename) {
			if (req.body.sortkey) {
				var tableStructure =
				{
					TableName: req.body.tablename, AttributeDefinitions: [
						{ AttributeName: req.body.partitionkey, AttributeType: req.body.partitiontype }, { AttributeName: req.body.sortkey, AttributeType: req.body.sorttype }
					], KeySchema: [
						{ AttributeName: req.body.partitionkey, KeyType: 'HASH' }, { AttributeName: req.body.sortkey, KeyType: 'RANGE' }
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1
					}
				};
			}
			else {
				var tableStructure =
				{
					TableName: req.body.tablename,
					AttributeDefinitions: [
						{ AttributeName: req.body.partitionkey, AttributeType: req.body.partitiontype }
					],
					KeySchema: [
						{ AttributeName: req.body.partitionkey, KeyType: 'HASH' }
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1
					}
				};
			}
			let response;
			response = await createTable(tableStructure, ddb);
			res.json(response);
		}
	}
}

const createTable = async function (tableStructure, ddb) {
	try {
		await ddb.createTable(tableStructure).promise();
		let msg = 'Table ' + tableStructure.TableName + ' created ';
		return { success: msg }
	}
	catch (e) {
		let msg = 'Error while creating table ' + tableStructure.TableName;
		return { error: msg }
	}
}

exports.getTableData = async function (req, res, next) {
	const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	let response = await getDynamoTableData(req.body.table, ddb);
	res.json(response);
}

const getDynamoTableData = async function (tablename, ddb) {
	var params = {
		TableName: tablename
	};
	let data = {
		items: [],
		count: 0,
		scannedCount: 0
	};

	try {
		while (1) {
			let temp = await ddb.scan(params).promise();
			data.items.push(...temp.Items);
			data.count += temp.Count;
			data.scannedCount += temp.ScannedCount;
			if (data.LastEvaluatedKey) {
				params.ExclusiveStartKey = data.LastEvaluatedKey;
				continue;
			}
			break;
		}
		//console.log("Scan Complete > ", data);
		return (data);
	}
	catch (e) {
		let msg = 'Error while retriving table ' + tablename + ":- " + e;
		return { error: msg }
	}
}

exports.getTableDescription = async function (req, res) {
	const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	try {
		let description = await ddb.describeTable({ TableName: req.body.table }).promise();
		res.json(description);
	}
	catch (e) {
		res.status(500).json(e);
	}
}