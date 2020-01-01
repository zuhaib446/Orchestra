define(function (require) {
	var $ = require("jquery");
	var html = require("text!pages/dynamodb/dynamodb.html");

	var successFailModal = require("helpers/successFailModal");

	var renderTable = function (data) {
		for (var i = 0, l = data.length; i < l; i++) {
			$("#dynamodb-table-names").append('<tr><td>' + (i + 1) + '</td><td>' + data[i] + '</td><td><button class="btn btn-success" data-tname="' + data[i] + '" data-action="view"><i class="fa fa-fw fa-edit"></i>View</button> <button class="btn btn-danger" data-tname="' + data[i] + '" data-action="delete"><i class="fa fa-fw fa-trash"></i>Delete</button></td></tr>')
		}
		$("#dynamodb-table-names").find("button").click(function (e) {
			var obj = $(this);
			var action = obj.data('action');
			var tname = obj.data('tname');
			if (action == "view") {
				console.log("view = " + tname)
			}
			else if (action == "delete") {
				//console.log("delete = " + tname)
				$.post('/orc/dbdelete', { table: tname }).done(function (result) {
					if (result.success) {
						successFailModal.success("Delete Table", result.success, function () {
							obj.closest('tr').remove();
						});
					}
					else if (result.error) {
						successFailModal.fail("Delete Table", result.error, function () {
						});
					}
				}).fail(function (result) {

				});
			}
		})
	}
	var render = function (data) {
		$("#orchestra-main-app-area").html(html);
		$("#add-table-button").click(function () {
			$("#add-table-modal").modal("show");
		})
		$("#add-table-save-btn").click(function () {
			var form = $("#add-table-form")[0];
			if (form.checkValidity() === false) {
				return form.classList.add('was-validated');
			}
			$.post("/orc/ddbadd", $("#add-table-form").serialize()).done(function (d) {
				if (d.success) {
					$("#add-table-modal").modal("hide");
					successFailModal.success("Add New Table", d.success, function () {
						$('a[data-action="dynamodb"]').click();
					});
				}
				else if (d.error) {
					successFailModal.fail("Add New Table", d.error, function () {
					});
				}
			}).fail(function (e) {

			})
		})
		renderTable(data);
	}
	var view = {
		render: function () {
			$.getJSON("/orc/dblist").done(function (d) {
				render(d);
			}).fail(function (e) {
				alert("Server Error : " + e.responseText);
			})
		}
	}
	return view;
})
