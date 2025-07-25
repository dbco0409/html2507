// 선언부
let r = document.getElementById('result');
let num1 = 8;
let num2 = 3;
let result = 0;

// 구현부
result = num1 + num2;

// 출력부
console.log(`결과: ${result}`);
r.innerText = `[더하기+] ${result}`;

// 초기화
result = 0;

// 재사용
result = num1 - num2;

console.log(`결과: ${result}`);
r.innerText += `\n[빼기-] ${result}`;

// 재사용
result = num1 * num2;
console.log(`결과: ${result}`);
r.innerText += `\n[곱하기*] ${result}`;

// 재사용
result = num1 / num2;
result = Math.round(result * 100) / 100; 
console.log(`결과: ${result}`);
r.innerText += `\n[나누기/] ${result}`;

// 재사용
result = num1 % num2;
console.log(`결과: ${result}`);
r.innerText += `\n[나머지%] ${result}`;

// 재사용
result = num1 ++;
console.log(`결과: ${result}`);
r.innerText += `\n[피연산자 값 증가] ${result}`;

// 재사용
result = ++num1;
console.log(`결과: ${result}`);
r.innerText += `\n[피연산자 값 증가] ${result}`;

// 재사용
result = num1 --;
console.log(`결과: ${result}`);
r.innerText += `\n[피연산자 값 감소] ${result}`;

// 재사용
result = -- num1;
console.log(`결과: ${result}`);
r.innerText += `\n[피연산자 값 감소] ${result}\n\n`;

let r_arr = new Array(9);
let r_txt_arr = new Array(9);
r_arr[0] = num1 + num2;
r_arr[1] = num1 - num2;
r_arr[2] = num1 * num2;
r_arr[3] = num1 / num2;
r_arr[3] = Math.round(r_arr[3] * 100) / 100;
r_arr[4] = num1 % num2;
r_arr[5] = num1++;
r_arr[6] = num1--;
r_arr[7] = ++num1;
r_arr[8] = --num1;
r_txt_arr[0] = '[더하기+]';
r_txt_arr[1] = '[빼기-]';
r_txt_arr[2] = '[곱하기*]';
r_txt_arr[3] = '[나누기/]';
r_txt_arr[4] = '[나머지%]';
r_txt_arr[5] = '[피연산자 값 증가]';
r_txt_arr[6] = '[피연산자 값 감소]';
r_txt_arr[7] = '[피연산자 값 증가]';
r_txt_arr[8] = '[피연산자 값 감소]';

// 배열 출력
for (let i = 0; i < r_arr.length; i++) {
    console.log(`${r_txt_arr[i]} ${r_arr[i]}`);
    r.innerText += `\n배열 ${r_txt_arr[i]} ${r_arr[i]}`;
}   
// 배열 출력