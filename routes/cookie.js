const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  res.clearCookie('cookie'); // 쿠기 지우기
  res.status(200).json('쿠키 굽기 성공!'); // status 코드는 200이고 보낼 메시지는 '쿠키 굽기 성공!' 이다
});

module.exports = router;
