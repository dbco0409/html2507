$(window).on("scroll", function () {
	if ($(window).scrollTop() > 100) {
		$("#header").addClass("scroll");
	} else {
		$("#header").removeClass("scroll");
	}
});


function showPop(a){
	$(a).fadeIn();
}

function hidePop(a){
	$(a).fadeOut();
}

function fnMove(seq){
		var offset = $(seq).offset();
		$('html, body').animate({scrollTop : offset.top}, 400);
}

function fnback(n){
	history.back();
}
function loca(n){
	location.href=n;
}
