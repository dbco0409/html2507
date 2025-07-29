$(document).ready(function() {

	let typingtxts = ["FAST", "SMART", "YOURS", "VALUE", "READY"];
	let typingtxtsKor = ["빠르게, 원하는 시간에","똑똑하게, 합리적인 선택","당신의 방식대로","가치 있는 경험","언제든지 준비 완료"];
	let currentIdx = 0;
	let typingBool = false;
	let typingIdx = 0;
	let tyInt;

	function startTyping() {
		typingBool = true;
		typingIdx = 0;
		$(".typing").text(""); // 초기화
		$(".typing-sm").hide().text(""); // 초기화 및 숨김
		var typingTxt = typingtxts[currentIdx].split("");
		var typingSm = typingtxtsKor[currentIdx];
		tyInt = setInterval(function() {
			if (typingIdx < typingTxt.length) {
				$(".typing").append(typingTxt[typingIdx]);
				typingIdx++;
			} else {
				clearInterval(tyInt);
				$(".typing-sm").text(typingSm).fadeIn(400, function() {
					setTimeout(function() {
						$(".typing-sm").fadeOut(400);
						setTimeout(startDeleting, 400); // fadeOut 후 삭제 시작
					}, 1000); // 보여지는 시간
				});
			}
		}, 100);
	}

	function startDeleting() {
		let text = $(".typing").text();
		let deleteIdx = text.length;
		let delInt = setInterval(function() {
			if (deleteIdx > 0) {
				$(".typing").text(text.substring(0, deleteIdx - 1));
				deleteIdx--;
			} else {
				clearInterval(delInt);
				currentIdx = (currentIdx + 1) % typingtxts.length;
				setTimeout(startTyping, 500); // 삭제 후 딜레이
			}
		}, 50);
	}

	startTyping(); 

	var main01_slider = new Swiper('#main01 .main_slider', {
		slidesPerView: 1,
        spaceBetween: 25,
		loop:true,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		  },
		pagination: {
          el: "#main01 .pages .pgNum",
          type: "fraction",
        },
		});
	$("#main01 .pages .pause").click(function(){
		main01_slider.autoplay.stop();
	});
	$("#main01 .pages .prev").click(function(){
		main01_slider.slidePrev();
	});
	$("#main01 .pages .next").click(function(){
		main01_slider.slideNext();
	});

});
