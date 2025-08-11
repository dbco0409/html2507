$(document).ready(function() {
    $("#date").daterangepicker({
        locale: {
        "separator": " - ",                     // 시작일시와 종료일시 구분자
        "format": 'YYYY.MM.DD',     // 일시 노출 포맷
        "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
        },
        autoApply:true,
        alwaysShowCalendars: true,
        timePicker:false,                        // 시간 노출 여부
        showDropdowns: true,                     // 년월 수동 설정 여부
    });
});

async function getWeatherApiParamsFromAI() {
    const target = document.getElementById('target').value;
    const style = document.getElementById('style').value;

    // DOM 요소
    const resultDiv = document.getElementById('search_result');
    const resultArea = document.getElementById('resultArea');

    // 로딩 상태 보여주기
    document.getElementById("solution").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.querySelector(".quick_loading").style.display = "block";

    try {
        const response = await fetch('./api/get_solution.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                goal: target,
                habit: style
            })
        });

        const data = await response.json();

        if (data.result) {
            // 결과 표시
            resultArea.innerHTML = data.result;

            // 결과 화면 전환
            document.querySelector(".quick_loading").style.display = "none";
            document.getElementById("solution").style.display = "block";
            document.getElementById("search_result").style.display = "block";
        } else {
            alert("결과를 받아오지 못했습니다.");
            document.querySelector(".quick_loading").style.display = "none";
            document.getElementById("search_result").style.display = "block";
        }

    } catch (err) {
        console.error(err);
        alert("에러 발생: " + err.message);
        document.querySelector(".quick_loading").style.display = "none";
        document.getElementById("search_result").style.display = "block";
    }
}

