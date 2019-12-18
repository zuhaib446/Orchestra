define(function(require){
	var $ = require("jquery");

	var cereateTable = function(data){
		var table = $("<table>")
		var thead = $("<thead>").html("<tr><th>NAME</th></tr>");
		var tbody = $("<tbody>");

		for(var i=0,l=data.length;i<l;i++){
			console.log(data[i])
			tbody.append("<tr><td>"+data[i]+"</td></tr>")
		}
		return table.append([thead,tbody])
	}

	$.getJSON("/orc/dblist")
	.done(function(d){
		$("#someid").html('<h1>'+$("#someid").data("action")+'</h1> ').append(cereateTable(d));
	})
	.fail(function(e){
		alert("there is an error my firned")
	})

	
});