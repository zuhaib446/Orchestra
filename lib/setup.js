const apigw    = require("./apigw");
const s3    = require("./s3");
const ddb    = require("./dynamodb");

exports.apply = async function (app) {
	await apigw.apply(app);
	await ddb.apply(app);
	return s3.apply(app);
}