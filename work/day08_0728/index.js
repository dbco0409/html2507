var result = 0;
let num1 = 5;
var r=document.getElementById('result');

// 할당 연산자 --------------------------
// 대입 연산자
result = num1;
console.log(`결과: ${result}`);
r.innerText = `[대입 연산자=] ${result}`;


// 누적 대입 연산자 -------------------
result += num1;
console.log(`결과: ${result}`);
r.innerText += `\n[대입 연산자+=] ${result}`;

result -= num1;
console.log(`결과: ${result}`);
r.innerText += `\n[대입 연산자-=] ${result}`;
r.innerText += '\n결과보기: 문자연결연산자 사용-----'+result;

result *= num1;
console.log(`결과: ${result}`);
r.innerText += `\n[대입 연산자*=] ${result}`;

result /= num1;
result = Math.round(result * 100) / 100;
console.log(`결과: ${result}`);
r.innerText += `\n[대입 연산자/=] ${result}`;

result %= num1;
console.log(`결과: ${result}`);
r.innerText += `\n[대입 연산자%=] ${result}`;
