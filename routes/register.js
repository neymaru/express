// ------------ MongoDB 버전 회원 가입 ------------

const express = require('express');

const { registerUser } = require('../controllers/userController');

const router = express.Router();

// 회원가입 페이지로 이동
router.get('/', (req, res) => {
  res.render('register');
});

// 회원가입
router.post('/', registerUser);

module.exports = router;

// // 기존 회원가입 라우터 코드
// router.post('/', async (req, res) => {
//   const duplicatedUser = await userDB.userCheck(req.body.id);
//   if (!duplicatedUser) {
//     // 중복된 아이디가 없으면
//     const registerResult = await userDB.registerUser(req.body); // reqbody 를 통으로 전달
//     if (registerResult) {
//       res.status(200);
//       res.send('회원 가입 성공!<br><a href="/login">로그인으로 이동</a>');
//     } else {
//       res.status(500);
//       res.send(
//         '회원 가입 실패! 알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>',
//       );
//     }
//   } else {
//     res.status(500);
//     res.send(
//       '동일한 ID가 존재합니다.<br><a href="/register">회원가입으로 이동</a>',
//     );
//   }
// });

// module.exports = router;
