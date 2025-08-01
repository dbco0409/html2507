$(document).ready(function() {
    $("#date").daterangepicker({
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
})