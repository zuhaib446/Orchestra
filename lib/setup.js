const apigw    = require("./apigw");
const s3    = require("./s3");
const ddb    = require("./dynamodb");

const router1 = require("./backend/routes/dynamoroutes")

exports.apply = async function (app) {
	await apigw.apply(app);
	await ddb.apply(app);
	await s3.apply(app);
	app.use("/orc",router1); //GET /orc/dblist 
							// GET /orc/tablelist

}
