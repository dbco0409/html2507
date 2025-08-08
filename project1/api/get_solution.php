<?php
header('Content-Type: application/json');

// POST 데이터 받기
$input = json_decode(file_get_contents('php://input'), true);
$goal = $input['goal'] ?? '';
$habit = $input['habit'] ?? '';

// OpenAI API 설정
$apiKey = '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';
$url = 'https://api.openai.com/v1/chat/completions';

$data = [
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        [
            'role' => 'user',
            'content' => "사용자의 다이어트 목표는 \"{$goal}\"이고, 식습관은 \"{$habit}\"입니다. 이에 맞는 1) 식단/생활 습관 솔루션 2) 관련 추천 식품/제품을 제안해주세요.  

아래 규칙에 따라 버튼 링크를 포함하세요:  

- 솔루션 추천 버튼: 'solution' 파라미터 번호는 다음과 같습니다.  
  1. 식사 대체용  
  2. 단백질 보충  
  3. 건강한 간식  
  4. 클린 식단  
  5. 체지방 커팅  
  6. 외식 대체용  
  7. 채식 위주  

- 식습관 개선 고유 번호: 'habit' 파라미터 번호는 다음과 같습니다.  
  1. 아침 대용  
  2. 건강한 야식  
  3. 무설탕 간식  
  4. 저탄수 식품  
  5. 지방 분해 제품  

- 사용자 목표(goal)에 대한 고유 번호 (goal 파라미터):
1. 체중 감량  
2. 체지방 감소  
3. 근육 증가  
4. 체형 유지 / 건강한 식사 습관  
5. 특정 질환 관리 (ex. 당뇨, 고혈압 등)  
6. 피부 개선 / 컨디션 개선  

예를 들어, 목표가 \"체중 감량\"이면 solution 파라미터는 5번, 식습관 개선이 필요하고 저탄수 식품으로 개선이 필요하면 habit 파라미터는 4번, 사용자 목표가 체중 감량이면 goal 파라미터는 1번 입니다. 
식습관 개선에 대한 파라미터(habit)는 필수가 아니에요. 재량껏 추가 혹은 생략을 해주세요.

아래와 같은 형식으로 HTML 결과를 만들어주세요:

<h3>핏업이 제안하는<br/><span>다이어트 솔루션!</span></h3>
<ul>
<h5>식단/생활 습관</h5>
<li>여기에 솔루션 내용을 작성해주세요.</li>
</ul>
<div id='pro_btns'>
<button type='button' class='btn btn-product' onclick=\"location.href='./product.html?solution=숫자&goal=숫자&habit=숫자'\">추천 식품 바로가기</button>
</div>

"
        ]
    ],
    'temperature' => 0.7
];

$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
];

// cURL로 요청 보내기
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    $result = json_decode($response, true);
    $content = $result['choices'][0]['message']['content'] ?? '결과 없음';
    echo json_encode(['result' => $content]);
}

curl_close($ch);
?>
