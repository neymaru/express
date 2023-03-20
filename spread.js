const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr); // [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(...arr); // 1 2 3 4 5 6 7

const obj = {
  name: '이효석',
  status: '취함',
};

console.log(obj);
console.log({ ...obj });

const tetzData = {
  name: '이효석',
  age: 39,
};

const tetzInfo = {
  nickName: 'chicken head',
  status: '숙취',
};

// const tetz = {
//   //객체 안에 객체가 들어있는 이중 구조
//   tetzData,
//   tetzInfo,
// };

const tetz = {
  // 해당 구조를 분해한 다음 값을 뿌려줌
  ...tetzData,
  ...tetzInfo,
};

console.log(tetz);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const merge = [...arr1, ...arr2];
console.log(merge); // [ 1, 2, 3, '4', '5', '6' ]

const str = 'test';
console.log([...str]); // [ 't', 'e', 's', 't' ]

const tetz2 = {
  name: '이효석',
  gender: 'M',
  nickName: 'chicken head',
  email: 'xeno@gmail.com',
};

const { name, ...restInfo } = tetz2;
console.log(name, restInfo); // 이효석 { gender: 'M', nickName: 'chicken head', email: 'xeno@gmail.com' }

const arr3 = [1, 2, 3, 4, 5, 6, 7];

const [first, ...rest] = arr3;
console.log(first, rest); // 1 [ 2, 3, 4, 5, 6, 7 ]

function spread(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}
spread(1, 2, 3, 4, 5, 6, 7, 8);
// 1
// 2
// [ 3, 4, 5, 6, 7, 8 ]
