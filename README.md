![build](https://github.com/limplash/Orchestra/workflows/build/badge.svg)
# Orchestra
Local Amazon Web Services Emulator

# Prerequisite

1. Docker, Docker-Compose
2. Node.js, npm

# Install 

1. git clone https://github.com/limplash/Orchestra.git
2. cd Orchestra
3. cp .env.sample .env
4. npm install
5. sudo docker-compose up --build

You can now visit `http://localhost:3000/api/echo/any-string` 

# Usage

Orchestra is a simple emulator for AWS lambda run time (nodejs) , Api gateway, DynamoDB local ad S3 http static. Once set up you can view the test apigateway and test lambda functions.
To create an Api create a file in the apigateway folder, the name of the file will be used for naming the Api the api file should export a array of resources and methods in the following form 

```
File test.js

exports.api = [
	{
		resource:"test",
		methods:[
			{
				method:"GET",
				lambda:"test_lam",
				parameters:["id"]
			}
		]
	}
]
```
The above code will create a route `GET /test/test/{id}` and link it to the lambda function `test_lam` 

To create a lambda function creat a folder in the lambda folder with the name of the lambda function and it should contain an index file which exports a handler just like the lambda in the AWS 

Currently working on the DynamoDB CLI tools for now you can problematically create DynamoDB tables 
