
exports.handler = async (event) => {	  
	return  {
		statusCode: 200,		
		body: "Echo = " + event.pathParameters.id
	};	
};
