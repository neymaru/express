const express = require('express');
const userDB = require('../controllers/userController');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    // req.body.id 를 받고 콜백으로 data 받기
    if (data.length === 1) {
      // db에서 아이디를 unique 로 줬기 때문에 0 또는 1 밖에 나올 수 없다
      if (data[0].PASSWORD === req.body.password) {
        // 컬럼명은 대문자
        // 백엔드 세션 생성
        req.session.login = true; // '이 세션은 로그인이 되었어요' 라는 키 값을 만들어서 true를 넣어줌. 이 사람이 뭘 하려고 할 때마다 login이 true인 지 체크하면서 login 을 한 서비스에 접근할 수 있도록
        req.session.userId = req.body.id; // 회원 아이디도 세션에 저장

        // 로그인 쿠키 발생
        res.cookie('user', req.body.id, {
          maxAge: 1000 * 10,
          httpOnly: true,
          signed: true,
        });

        res.status(200);
        res.redirect('/dbBoard');
      } else {
        // 비번 틀린 상황

        res.status(400); // 400번 대는 사용자 잘못
        res.send(
          '비밀번호가 다릅니다.<br><a href="/login">로그인 페이지로 이동</a>',
        );
      }
    } else {
      // 아이디를 잘 못 입력한 상황
      res.status(400);
      res.send(
        '해당 id 가 존재하지 않습니다.<br><a href="/register">회원가입 페이지로 이동</a>',
      );
    }
  });
});

// 로그아웃
router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user'); // 쿠키 지우기 (쿠키의 key 명은 user)
    res.redirect('/');
  });
});

module.exports = router;
