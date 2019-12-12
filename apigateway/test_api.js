exports.api = [
	{
		resource:"test",
		methods:[
			{
				method:"GET",
				lambda:"echo",
				parameters:["id"]
			}
		]
	}
]