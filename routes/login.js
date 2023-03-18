const express = require('express');
const userDB = require('../controllers/userController');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    console.log('들어옴');
    if (data.length > 0) {
      if (data[0].PASSWORD === req.body.PASSWORD) {
        req.session.login = true;
        req.session.userId = req.body.id;
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        res.status(400);
        res.send(
          '비밀번호가 다릅니다.<br><a href="/login">로그인 페이지로 이동</a>',
        );
      }
    } else {
      res.status(400);
      res.send(
        '해당 id 가 존재하지 않습니다.<br><a href="/register">회원가입 페이지로 이동</a>',
      );
    }
  });
});

module.exports = router;
