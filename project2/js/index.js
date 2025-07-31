$(document).ready(function() {

	let typingtxts = ["SPEED EXPERTS", "SMART CHOICE", "PERSONAL DRIVE", "VALUE JOURNEY", "ALWAYS READY"];
	let typingtxtsKor = ["당신이 필요한 순간, 가장 빠르게 도착합니다.<br/>위카는 신속한 예약과 출고 시스템으로 언제 어디서나 바로 이용할 수 있는 렌터카 서비스를 제공합니다.","위카는 합리적인 요금과 투명한 운영으로 사용자 중심의 편리함을 제공합니다. <br/>똑똑한 선택이 시작되는 곳, 위카.","원하는 시간, 원하는 장소, 원하는 차량까지. <br/>위카는 고객의 라이프스타일에 맞춘 유연한 서비스로, 나만의 이동 방식을 존중합니다.","단순한 이동 수단을 넘어서, 여행과 일상의 가치를 더합니다. <br/>위카는 고객 한 사람 한 사람의 경험이 <br/>더 나은 내일로 이어질 수 있도록 돕습니다.","예상치 못한 순간에도 걱정 없이. 24시간 언제든지 예약과 이용이 가능한 시스템으로, <br/>위카는 당신의 모든 여정에 대비되어 있습니다."];
	let currentIdx = 0;
	let typingBool = false;
	let typingIdx = 0;
	let tyInt;

	function startTyping() {
		typingBool = true;
		typingIdx = 0;
		$(".typing").text(""); // 메인 텍스트 초기화

		const typingTxt = typingtxts[currentIdx].split("");
		const typingSm = typingtxtsKor[currentIdx];

		// ✅ 서브 텍스트 요소는 보여주되 내용은 아직 없음
		$(".typing-sm").hide().text("").fadeIn(); 

		tyInt = setInterval(function () {
			if (typingIdx < typingTxt.length) {
				$(".typing").append(typingTxt[typingIdx]);
				typingIdx++;
			} else {
				clearInterval(tyInt);
				setTimeout(startDeleting, 3000);
			}
		}, 100);

		$(".typing-sm").html(typingSm);
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
				setTimeout(startTyping, 100); // 삭제 후 딜레이
			}
		}, 50);
	}

	startTyping();

});
