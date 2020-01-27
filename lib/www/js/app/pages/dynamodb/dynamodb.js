define(function (require) {
	var $ = require("jquery");
	var html = require("text!pages/dynamodb/dynamodb.html");
	var tablehtml = require("text!pages/dynamodb/dynamotable.html");
	var flash = require("helpers/successFailModal");

	var addTable = function (cb) {
		$.post("/orc/ddbadd", $("#add-table-form").serialize()).done(function (d) {
			if (d.success) {
				$("#add-table-modal").modal("hide");
				flash.success("Add New Table", d.success, cb);
			}
			else if (d.error) {
				flash.fail("Add New Table", d.error);
			}
		}).fail(function (e) {
			alert("Server side error : " + e.responseText)
		})
	}

	var deleteTable = function (tname, cb) {
		$.post('/orc/dbdelete', { table: tname }).done(function (result) {
			if (result.success) {
				flash.success("Delete Table", result.success, cb);
			}
			else if (result.error) {
				flash.fail("Delete Table", result.error);
			}
		}).fail(function (e) {
			alert("Server side error : " + e.responseText)
		});
	}

	var render = function (data) {
		$("#orchestra-main-app-area").empty().html(html);
		$("#add-table-button").click(function () {
			$("#add-table-form").removeClass('was-validated')[0].reset();
			$("#add-table-modal").modal("show");
		})
		$("#add-table-save-btn").click(function () {
			var form = $("#add-table-form")[0];
			if (form.checkValidity() === false) {
				return form.classList.add('was-validated');
			}
			addTable(function () {
				$('a[data-action="dynamodb"]').click();
			});
		})
		renderTables(data);
	}

	var renderTables = function (data) {
		for (var i = 0, l = data.length; i < l; i++) {
			$("#dynamodb-table-names").append('<tr><td>' + (i + 1) + '</td><td>' + data[i] + '</td><td><button class="btn btn-success" data-tname="' + data[i] + '" data-action="view"><i class="fa fa-fw fa-edit"></i>View</button> <button class="btn btn-danger" data-tname="' + data[i] + '" data-action="delete"><i class="fa fa-fw fa-trash"></i>Delete</button></td></tr>')
		}
		$("#dynamodb-table-names").find("button").click(function (e) {
			var obj = $(this);
			var action = obj.data('action');
			var tname = obj.data('tname');
			if (action == "view") {
				$.post('/orc/gettabledata', { table: tname }).done(function (d) {
					$("#orchestra-main-app-area").empty().html(tablehtml);
					renderTableData(d);
				}).fail(function (e) {

				});
			}
			else if (action == "delete") {
				deleteTable(tname, function () {
					obj.closest('tr').remove();
				});
			}
		});
	}

	var renderTableData = function (data) {
		for (var i = 0, l = data.items.length; i < l; i++) {
			$('#dynamodb-table-data').append('<tr><td>' + (i + 1) + '</td><td>' + data.items[i] + '</td></tr>');
		}
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
});
