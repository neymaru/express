const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('alert', true, {
    expires: new Date(Date.now() + 1000 * 60), // 60초 뒤에 만료되는 쿠키 만들기
    httpOnly: true,
  });
  console.log(req.cookies);
  res.render('index');
});

module.exports = router;
