define(function(require){
	var $ = require("jquery");
	var html = require("text!pages/dynamodb/dynamodb.html");

	var yesnomodal = require("helpers/modal");
	
	var renderTable = function(data){		
		for(var i=0,l=data.length;i<l;i++){
			$("#dynamodb-table-names").append('<tr><td>'+(i+1)+'</td><td>'+data[i]+'</td><td><button class="btn btn-success" data-tname="'+data[i]+'" data-action="view"><i class="fa fa-fw fa-edit"></i>View</button> <button class="btn btn-danger" data-tname="'+data[i]+'" data-action="delete"><i class="fa fa-fw fa-trash"></i>Delete</button></td></tr>')
		}
		$("#dynamodb-table-names").find("button").click(function(e){
			var obj  = $(this);
			var action = obj.data('action');
			var tname = obj.data('tname');
			if (action == "view"){
				console.log("view = "+tname)
			}
			else if(action == "delete"){
				console.log("delete = "+tname)
			}
		})
	}
	var render = function(data){
		$("#orchestra-main-app-area").html(html);
		$("#add-table-button").click(function(){
			$("#add-table-modal").modal("show");
		})
		$("#add-table-save-btn").click(function(){
			var form = $("#add-table-form")[0];				
			if (form.checkValidity() === false){					
				return form.classList.add('was-validated');
			}				
			$.post("/orc/dbaddtable",$("#add-table-form").serialize()).done(function(d){
				$("#add-table-modal").modal("hide");	
				yesnomodal.success("Add New Table","We Successfully added new table",function(){
					alert("you closed me ")
				});
			}).fail(function(e){

			})
		})
		renderTable(data);
	}
	var view = {
		render : function(){
			$.getJSON("/orc/dblist").done(function(d){
				render(d);
			}).fail(function(e){
				alert("Server Error : "+e.responseText);
			})	
		}
	}
	return view;
})
