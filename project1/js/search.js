document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".quick_tab .btn");
    const tabs = document.querySelectorAll(".quick_form .tab");

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // 모든 버튼에서 active 제거
            tabButtons.forEach(btn => btn.classList.remove("active"));

            // 클릭한 버튼에 active 추가
            this.classList.add("active");

            // 모든 탭 콘텐츠에서 active 제거
            tabs.forEach(tab => tab.classList.remove("active"));

            // 클릭한 버튼 인덱스와 같은 탭 콘텐츠에 active 추가
            tabs[index].classList.add("active");
        });
    });

    const input = document.querySelector('input[name="foodName"]');
    const keywordBox = document.querySelector('.keyword_best');
    const keywordItems = keywordBox.querySelectorAll('li');

    input.addEventListener('input', function () {
        const query = this.value.trim();

        if (query === '') {
            keywordBox.style.display = 'none';
            return;
        }

        let hasMatch = false;

        keywordItems.forEach(item => {
            if (item.textContent.includes(query)) {
                item.style.display = 'list-item';
                hasMatch = true;
            } else {
                item.style.display = 'none';
            }
        });

        keywordBox.style.display = hasMatch ? 'block' : 'none';
    });

    // 항목 클릭 시 input에 자동 입력
    keywordItems.forEach(item => {
        item.addEventListener('click', function () {
            input.value = this.textContent;
            keywordBox.style.display = 'none';
        });
    });
});

document.addEventListener('click', function (event) {
    const input = document.querySelector('input[name="foodName"]');
    const keywordBox = document.querySelector('.keyword_best');

    const isClickInsideInput = input.contains(event.target);
    const isClickInsideKeywordBox = keywordBox.contains(event.target);

    // input이나 keyword 박스가 아닌 다른 영역 클릭 시 추천어 숨김
    if (!isClickInsideInput && !isClickInsideKeywordBox) {
        keywordBox.style.display = 'none';
    }
});

document.addEventListener('keydown', function (event) {
    const keywordBox = document.querySelector('.keyword_best');

    // Esc(27) 또는 Enter(13)
    if (event.key === 'Escape' || event.key === 'Enter') {
        keywordBox.style.display = 'none';
    }
});

async function getCalories() {
    const foodName = document.getElementById("foodName").value.trim();
    if (!foodName) {
        alert("음식명을 입력하세요.");
        return;
    }

    // 1. 화면 전환: 로딩 보여주고 나머지 숨기기
    document.getElementById("solution").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.querySelector(".quick_loading").style.display = "block";

    const apiKey = 'b6QUXFo4NJdzDjrwkgiDQAoVJIhjHLU9NplomktTDExQr8f5t153FdoHN%2FhWgBpgNcbIWhNsL%2FfJSnFqNZGdvg%3D%3D';
    const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=${apiKey}&pageNo=1&numOfRows=1&type=xml&FOOD_NM_KR=${encodeURIComponent(foodName)}`;

    try {
        const response = await fetch(url);
        const xmlText = await response.text();

        // XML 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // 2. 결과 추출
        const amtNum1 = xmlDoc.querySelector("AMT_NUM1");
        const kcal = amtNum1 ? amtNum1.textContent : null;

        // 3. 결과 보여주기
        document.querySelector(".quick_loading").style.display = "none";
        document.getElementById("solution").style.display = "block";
        document.getElementById("search_result").style.display = "block";

        if (kcal) {
            document.getElementById("resultArea").innerHTML =
                `<strong class="foodNm">${foodName}</strong>의 칼로리는 <strong class="cal">${kcal} kcal</strong> 입니다.`;
        } else {
            document.getElementById("resultArea").innerHTML =
                `❌ <strong>${foodName}</strong>의 칼로리 정보를 찾을 수 없습니다.`;
        }

    } catch (error) {
        console.error("API 호출 오류:", error);
        document.querySelector(".quick_loading").style.display = "none";
        document.getElementById("search_result").style.display = "block";
        document.getElementById("resultArea").innerHTML = `⚠️ 오류가 발생했습니다. 다시 시도해주세요.`;
    }
}

// 다시 시도 버튼
function getTab1() {
    document.getElementById("search").style.display = "block";
    document.querySelector(".quick_loading").style.display = "none";
    document.getElementById("search_result").style.display = "none";
    document.getElementById("foodName").value = "";
}