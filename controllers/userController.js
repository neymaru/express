const mongoClient = require('./mongoConnect'); // mongoConnect 파일 연결

const userDB = {
  // 중복 회원 찾기
  userCheck: async (userId) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      const findUser = await user.findOne({ id: userId }); // user 컬렉션에서 써야함
      return findUser; // 같은 값을 찾으면 찾은 값을 전달
    } catch (err) {
      console.error(err);
    }
  },

  // 회원 가입 하기
  registerUser: async (newUser) => {
    try {
      const client = await mongoClient.connect(); // db 접속
      const user = client.db('kdt5').collection('user');

      await user.insertOne(newUser);
      return true; // 에러가 발생하지 않으면 true 반환
    } catch (err) {
      console.log(err);
    }
  },
};
// 콜백을 쓰는 이유는 데이터를 읽고 나서 데이터를 리턴해주면 콜백에 담아서 전다해줘야 하기 때문에

module.exports = userDB;
