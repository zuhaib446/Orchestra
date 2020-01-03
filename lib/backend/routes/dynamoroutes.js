const express = require('express')
const router = express.Router()
const controller = require("../controllers/dynamodbController");

// define the home page route
router.get('/dblist', controller.getTableNames);
router.post('/ddbadd', controller.addNewDynamoDb);
router.post('/dbdelete', controller.deleteDynamoDb);

module.exports = router;