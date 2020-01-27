const express = require('express')
const router = express.Router()
const dynamoController = require("../controllers/dynamodbController");

// define the home page route
router.get('/dblist', dynamoController.getTableNames);
router.post('/ddbadd', dynamoController.addNewDynamoDb);
router.post('/dbdelete', dynamoController.deleteDynamoDb);
router.post('/gettabledata', dynamoController.getTableData);
router.post('/gettabledescription', dynamoController.getTableDescription);
module.exports = router;