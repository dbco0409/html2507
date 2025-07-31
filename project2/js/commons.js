
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

	if(a=='#pop_date'){
		$("#start_date").daterangepicker({
		    locale: {
		    "separator": " ~ ",                     // 시작일시와 종료일시 구분자
		    "format": 'YYYY-MM-DD',     // 일시 노출 포맷
		    "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
		    "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
		    },
			autoApply:true,
			alwaysShowCalendars: true,
		    timePicker:false,                        // 시간 노출 여부
		    showDropdowns: true,                     // 년월 수동 설정 여부
		});
		$( "#start_date2" ).datepicker({
			dateFormat:"yy-mm-dd",
			dayNames : ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
			dayNamesMin : ['월','화','수','목','금','토','일'],
			monthNamesShort:  [ "1월", "2월", "3월", "4월", "5월", "6월","7월", "8월", "9월", "10월", "11월", "12월" ],
			changeMonth:true,
        	changeYear:true,
			nextText:"다음",
        	prevText:"이전",
			showOtherMonths:true
		});
	}
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
