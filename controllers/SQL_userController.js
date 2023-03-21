// Mysql 과 접속할 수 있는 모듈 만들기
const connection = require('./dbConnect');

const userDB = {
  // 중복회원 찾기
  userCheck: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb1.user WHERE USERID = '${userId}';`, // 따옴표로 감싸줘야 함
      (err, data) => {
        if (err) throw err;
        cb(data); // 에러 없으면 콜백함수에 받아온 데이터 넘겨주기
      },
    );
  },
  // 회원 가입 하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb1.user (USERID, PASSWORD) VALUES ('${newUser.id}','${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};
// 콜백을 쓰는 이유는 데이터를 읽고 나서 데이터를 리턴해주면 콜백에 담아서 전다해줘야 하기 때문에

module.exports = userDB;
