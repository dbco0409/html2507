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
    const addr = document.getElementById('addr').value;
    const dateRange = document.getElementById('date').value.replace(/\s/g, '');
    const [startDateStr, endDateStr] = dateRange.split('-');
    const API_KEY = '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'; // 여기에 OpenAI API 키를 넣어주세요 (테스트 용도만)
    const prompt = `
사용자가 여행지로 '${addr}'를 선택했고, 여행 기간은 ${startDateStr}부터 ${endDateStr}까지입니다.

작년 같은 시기의 날씨를 추정해서 아래 기준에 따라 'when' 코드를 정해줘:

when 코드 기준:
1. 맑은 날이 많음
2. 비가 자주 옴
3. 흐리고 쌀쌀함
4. 매우 추움
5. 더움

또한 지역 키워드를 기반으로 다음 기준에 따라 'where' 코드를 정해줘:

where 코드 기준:
1. 도시
2. 시골
3. 산
4. 바다
5. 강변
6. 섬

반드시 아래 형식으로만 출력해:
when: 숫자
where: 숫자
`;

    const body = {
        model: 'gpt-4.1',
        messages: [
            { role: 'system', content: '너는 세계 날씨와 여행 스타일을 분석하는 전문가야.' },
            { role: 'user', content: prompt }
        ],
        temperature: 0.7
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(body)
        });
        
    } catch (error) {
        if (response.status === 429) {
            console.error("Rate limit exceeded. Try again later.");
            return "";
        }else
            console.error('Error: ', error);
            return "";
    }
}
function getDateDiff(start, end) {
    const startDate = new Date(start.slice(0, 4), start.slice(4, 6) - 1, start.slice(6, 8));
    const endDate = new Date(end.slice(0, 4), end.slice(4, 6) - 1, end.slice(6, 8));
    const diffTime = endDate - startDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
