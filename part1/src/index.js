// const,letの変数宣言

// var val1 = "var変数";
// console.log(val1);

// val1 = "var変数を上書き";
// console.log(val1);

// var val1 = "var変数を際宣言";
// console.log(val1);

// let val2 = "let変数";
// console.log(val2);

// val2 = "let変数を上書き";
// console.log(val2);

// const val3 = "const変数";
// console.log(val3);

// const val4 = {
//     name: "じゃけえ",
//     age: 31,
// };

// console.log(val4);

// val4.name = "伊野瀬";
// val4.age = 23;
// console.log(val4);

// const val5 = ["dog", "cat"];
// val5[0] = "bird";
// val5.push("monkey");
// console.log(val5);

// テンプレート文字列

// const name = 'i-inose';
// const age = 23;

// const message2 = `私の名前は${name}です。年齢は${age}歳です。`;
// console.log(message2);

// アロー関数
// const func2 = (str) => {
//     return str;
// };

// console.log(func2('func2です'));

// const func2 = str => {
//     return str;
// };

// console.log(func2('func2です、アローです'))

// const func3 = (num1, num2) => {
//   return num1 + num2;
// };

// console.log(func3(1, 3));

// 分割代入
// const myProfile = {
//   name: "i-inose",
//   age: 23,
// };

// const { name, age } = myProfile;

// const message2 = `名前は${name}です。年齢は${age}際です。これは分割代入。`;
// console.log(message2);

// const myProfile = ["i-inose", 31];

// const message3 = `名前は${myProfile[0]}です。年齢は${myProfile[1]}です。`;
// console.log(message3);

// const [name, age] = myProfile;
// const message4 = `名前は${name}です。年齢は${age}歳です。これは分割代入。（配列）`;
// console.log(message4);

//　デフォルト値
// const sayhello = (name = 'i-inose') => console.log(`こんにちは！${name}さん！`);
// sayhello();

// const myProfile = {
//   age: 23,
// };

// const { age, name = 'ゲスト' } = myProfile;
// console.log(age);
// console.log(name);

// オブジェクト省略記法

// // const name = "izuru";
// // const age = 31;

// // const myProfile = { name, age };

// console.log(myProfile);

// スプレッド構文
// const arr1 = [1, 2];
// // console.log(arr1);
// // console.log(...arr1);

// const sumFunc = (num1, num2) => console.log(num1 + num2);
// // sumFunc(arr1[0], arr1[1]);
// sumFunc(...arr1);

// まとめる
// const arr2 = [1, 2, 3, 4, 5];
// const [num1, num2, ...arr3] = arr2;
// console.log(num1);
// console.log(num2);
// console.log(arr3);

// 配列のコピー、結合
// const arr4 = [10, 20];
// const arr5 = [30, 40];

// const arr6 = [...arr4];
// arr6[0] = 100;
// console.log(arr6);
// console.log(arr4);

// const arr7 = [...arr4, ...arr5];
// console.log(arr7);

// const nameArr = ["田中", "山田", "Izuru Inose"];

// const nameArr2 = nameArr.map((name) => {
//   return name;
// });
// console.log(nameArr2);

// const numArr = [1, 2, 3, 4, 5];
// const newNumArr = numArr.filter((num) => {
//   return num % 2 == 1;
// });

// console.log(newNumArr);

// nameArr.map((name, index) => console.log(`${index + 1}番目は${name}です`));

// const newNameArr = nameArr.map((name) => {
//   if (name === "Izuru Inose") {
//     return name;
//   } else {
//     return `${name}さん`;
//   }
// });
// console.log(newNameArr);