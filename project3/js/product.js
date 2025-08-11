function redirectToProduct() {
    const target = document.getElementById('target').value;
    const style = document.getElementById('style').value;

    // 목표에 따른 solution 번호 매핑
    const goalMap = {
        "체중 감량": 5,
        "체지방 감소": 5,
        "근육 증가": 2,
        "체형 유지 / 건강한 식사 습관": 4,
        "특정 질환 관리 (ex. 당뇨, 고혈압 등)": 7,
        "피부 개선 / 컨디션 개선": 3
    };

    // 식습관에 따른 habit 번호 매핑
    const habitMap = {
        "탄수화물 위주 식사": 4,
        "단백질/고기 위주 식사": null,
        "채소 중심 건강식": null,
        "배달, 패스트푸드, 편의점 음식 위주": 5
    };

    const solution = goalMap[target];
    const habit = habitMap[style];

    let url = 'product.php';

    if (solution && habit) {
        url += `?solution=${solution}&habit=${habit}`;
    } else if (solution) {
        url += `?solution=${solution}`;
    } else if (habit) {
        url += `?habit=${habit}`;
    }

    // 페이지 이동
    window.location.href = url;
}