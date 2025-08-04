
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');  // 탭들
    const buttons = document.querySelectorAll('.btn_tab');  // 버튼들
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 모든 버튼과 탭에서 active 클래스 제거
            buttons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            // 클릭된 버튼과 관련된 탭에 active 클래스 추가
            button.classList.add('active');
            tabs[index].classList.add('active');
        });
    });

});


$(window).on("scroll", function () {
	if ($(window).scrollTop() > 100) {
		$("#header").addClass("scroll");
	} else {
		$("#header").removeClass("scroll");
	}
});

function rentPop(a){
	$(".quick_tab .btn").removeClass("active");
	$("#"+a).addClass("active");
	if(a=='month')
		$("#period").text('1달');
	else
		$("#period").text('1일');
}

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
