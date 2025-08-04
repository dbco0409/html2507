<?php
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 1. API 키 설정
$api_key = "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";

// 2. 입력값 파싱
$data = json_decode(file_get_contents("php://input"), true);
$addr = $data['addr'] ?? '';
$date = $data['date'] ?? '';

if (!$addr || !$date) {
    echo json_encode(['error' => '입력값 누락']);
    exit;
}

list($country, $location) = array_map('trim', explode('/', $addr));
list($start_date, $end_date) = array_map('trim', explode('-', str_replace('.', '-', $date)));

// 3. 프롬프트 생성
$prompt = "
너는 여행 날씨를 분석하는 AI야.
다음은 여행 정보야:
- 지역: {$location}
- 날짜: {$start_date} ~ {$end_date}

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
";

// 4. ChatGPT 호출
$ch = curl_init("https://api.openai.com/v1/chat/completions");

$post_fields = [
    "model" => "gpt-4",
    "messages" => [
        ["role" => "user", "content" => $prompt]
    ],
    "temperature" => 0.3
];

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer {$api_key}"
    ],
    CURLOPT_POSTFIELDS => json_encode($post_fields)
]);

$response = curl_exec($ch);
error_log("OpenAI raw response: " . print_r($response, true));

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}
if (!$response) {
    echo json_encode(['error' => 'OpenAI 요청 실패', 'details' => curl_error($ch)]);
    curl_close($ch);
    exit;
}



// 5. 응답 파싱
$result = json_decode($response, true);
$content = $result['choices'][0]['message']['content'] ?? '';

if (!$content) {
    echo json_encode(['error' => 'GPT 응답 누락', 'response' => $result]);
    exit;
}

preg_match('/when:\s*(\d)/', $content, $when_match);
preg_match('/where:\s*(\d)/', $content, $where_match);

$when = isset($when_match[1]) ? intval($when_match[1]) : null;
$where = isset($where_match[1]) ? intval($where_match[1]) : null;

if ($when !== null && $where !== null) {
    echo json_encode(['when' => $when, 'where' => $where]);
} else {
    echo json_encode([
        'error' => 'ChatGPT 응답 파싱 실패',
        'raw' => $content,
        'openai_response' => $result
    ]);
}


?>