//덧셈 연산자
var r= document.getElementById('result');

let x= 5;
let y = 2;
let z = x+y;
console.log(z);
r.innerText = `[덧셈+] ${z}`;


//곱셈 연산자
z= x * y;
console.log(z);
r.innerText += `\n[곱셈*] ${z}`;

// 산술 연산자
let a=3;
x=(100+50) * a;
console.log(x);
r.innerText += `\n[산술 연산자] ${x}`;

//할당 연산자
x = 10;
x += 5;
console.log(x);
r.innerText += `\n[할당 연산자=] ${x}`;

//문자열 비교
let text1 = "A";
let text2 = "B";
let result = text1 < text2;
console.log(result); // true, "A"는 "B"보다 작음
r.innerText += `\n[문자열 비교] ${result}`;

text1 = "20";
text2 = "5";
result = text1 < text2;
console.log(result); // false, "20"는 "5"보다 크므로 문자열 비교에서는 "20"이 더 큼
r.innerText += `\n[문자열 비교] ${result}`;

text1="John";
text2="Doe";
result = text1 + " "+ text2;
console.log(result); // "John Doe"
r.innerText += `\n[문자열 연결] ${result}`;


//할당 연산자
text1 = "What a very ";
text1 += "nice day";
console.log(text1); // "What a very nice day"
r.innerText += `\n[문자열 연결] ${text1}`;

x = 5+5;
y = "5" + 5;
z = "Hello" + 5;
console.log(x); // 10
console.log(y); // "55"
console.log(z); // "Hello5"
r.innerText += `\n[문자열 연결] ${x}, ${y}, ${z}`;

