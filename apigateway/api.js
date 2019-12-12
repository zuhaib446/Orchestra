exports.api = [
	{
		resource:"echo",
		methods:[
			{
				method:"GET",
				lambda:"echo",
				parameters:["id"]
			}
		]
	}
]