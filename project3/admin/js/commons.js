$(document).ready(function() {
	$("#navs .inner .nav .m").each(function(e){
		$("#navs .inner .nav .m").eq(e).hover(function(){
			$("#navs .inner .nav .m").eq(e).toggleClass("over");
		});
	});
});
function loca(n){
	location.href=n;
}