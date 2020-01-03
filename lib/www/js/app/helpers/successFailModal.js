define(function(require){
	var $ = require("jquery");
	
	return {

		success:function(title,body,cb){
			$("#__orchestra-internal-modal").find(".modal-header").removeClass("bg-danger").addClass("bg-success")
			$("#__orchestra-internal-modal").modal("show");
			$("#__orchestra-internal-modal-label").text(title);
			$("#__orchestra-internal-modal-body").html(body);
			$("#__orchestra-internal-modal").one("hidden.bs.modal",function(){
				cb && cb();
			})
		},
		fail:function(title,body,cb){
			$("#__orchestra-internal-modal").find(".modal-header").removeClass("bg-success").addClass("bg-danger")
			$("#__orchestra-internal-modal").modal("show");
			$("#__orchestra-internal-modal-label").text(title);
			$("#__orchestra-internal-modal-body").html(body);
			$("#__orchestra-internal-modal").one("hidden.bs.modal",function(){
				cb && cb();
			})
		}

	}

	require("bootstrap");
})