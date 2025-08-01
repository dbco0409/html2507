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

async function getWeatherApiParamsFromAI(addr, startDateStr, endDateStr) {
    const prompt = `
사용자가 여행지로 '${addr}'를 선택했고, 여행 기간은 ${startDateStr}부터 ${endDateStr}까지입니다.

이 정보를 바탕으로 국내/해외 여부를 판단하고, 아래 기준에 따라 API 요청을 위한 파라미터를 JSON 형식으로 작성해 주세요:

[1] 국내일 경우 (기상청 API):
- isDomestic: true
- apiType: "KMA"
- stnIds: 기상청 지점 번호 (예: 서울 108, 부산 159 등)
- startDt: 여행 시작일 (예: 20250804)
- endDt: 여행 종료일 (예: 20250806)

[2] 해외일 경우 (OpenWeatherMap API):
- isDomestic: false
- apiType: "OWM"
- city: 도시명 (예: Paris)
- countryCode: 국가 코드 (예: FR)
- lat: 위도
- lon: 경도

JSON만 출력해주세요.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "당신은 사용자 입력을 바탕으로 날씨 API 요청 파라미터를 구성하는 도우미입니다."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    try {
        return JSON.parse(content);
    } catch {
        console.error("AI 응답 JSON 파싱 실패:", content);
        return null;
    }
}

async function fetchWeatherByParams(params) {
    if (params.apiType === "KMA") {
        // 기상청 API 호출
        const url = `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?` +
            `serviceKey=b6QUXFo4NJdzDjrwkgiDQAoVJIhjHLU9NplomktTDExQr8f5t153FdoHN%2FhWgBpgNcbIWhNsL%2FfJSnFqNZGdvg%3D%3D` +
            `&numOfRows=10&pageNo=1&stnIds=${params.stnIds}&startDt=${params.startDt}&endDt=${params.endDt}&dateCd=DAY&dataCd=ASOS&dataType=JSON`;

        return fetch(url).then(res => res.json());

    } else if (params.apiType === "OWM") {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=f55eebcd96763c43993ce3c1665d7680&units=metric&lang=kr`;
        return fetch(url).then(res => res.json());
    }

    throw new Error("지원하지 않는 API 유형입니다.");
}

async function getWeatherSummaryFromAI(addr, startDateStr, endDateStr, weatherJson) {
    const prompt = `
여행지는 '${addr}'이며, 여행 기간은 ${startDateStr}부터 ${endDateStr}까지입니다.
아래는 날씨 API에서 받은 JSON입니다:

${JSON.stringify(weatherJson)}

이 정보를 보기 좋게 요약해 주세요. 날짜별로 구분해서 요약하고, 우산 필요 여부나 기온에 대한 간단한 팁도 있으면 포함해 주세요.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: "당신은 여행자에게 날씨 정보를 보기 쉽게 요약해주는 도우미입니다." },
                { role: "user", content: prompt }
            ]
        })
    });

    const json = await res.json();
    return json.choices?.[0]?.message?.content || "날씨 요약을 불러오지 못했습니다.";
}

async function getWeatherAndRedirect() {
    const addr = document.getElementById('addr').value;
    const dateRange = document.getElementById('date').value.replace(/\s/g, '');
    const [startDateStr, endDateStr] = dateRange.split('-');

    const params = await getWeatherApiParamsFromAI(addr, startDateStr, endDateStr);
    if (!params) {
        alert("날씨 요청 정보를 구성할 수 없습니다.");
        return;
    }

    const weatherJson = await fetchWeatherByParams(params);
    const summary = await getWeatherSummaryFromAI(addr, startDateStr, endDateStr, weatherJson);

    document.getElementById("weather_summary").innerText = summary;
}


