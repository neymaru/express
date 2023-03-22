const express = require('express');
const { loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('login');
});

// 로그인
router.post('/', loginUser);

module.exports = router;

// 로그아웃

// router.get('/logout', async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.clearCookie('user'); // 쿠키 지우기 (쿠키의 key 명은 user)
//     res.redirect('/');
//   });
// });
