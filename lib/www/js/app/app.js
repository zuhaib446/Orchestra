define(function(require){
	var $ = require("jquery");
	var html = require("text!app/app.html");
	var ddb  = require("pages/dynamodb/dynamodb");
	var lam  = require("pages/lambda/lambda");
	var api  = require("pages/apigw/apigw");
	var sss  = require("pages/s3/s3");
	require("bootstrap");
	$("body").html(html);
	$("#Orchestra-main-nav-ul").find("a").click(function(){
		var obj = $(this);
		var action = obj.data('action');
		if(action == "dynamodb"){
			ddb.render();
		}
		else if(action == "s3"){
			sss.render();
		}
		else if(action == "apigw"){
			api.render();
		}
		else if(action == "lambda"){
			lam.render();
		}
	})
	ddb.render();
});