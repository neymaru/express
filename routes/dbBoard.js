// DB와 관련된 Board의 모든 기능을 가지는 라우터

const express = require('express');

const multer = require('multer');
const fs = require('fs');

const {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} = require('../controllers/boardController');

const router = express.Router();

// 파일 업로드 설정
const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 어느 폴더에 파일을 지정할 것인가
    cb(null, dir); // 코드 안정화를 위해 null 넣어줌
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()); // 파일명에 언더바 하고 시간
  },
});
const limits = {
  fileSize: 1024 * 1024 * 2, // 2Mb
};

const upload = multer({ storage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir); // dir 없으면 만들어라
// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    // 암호화된 정보는 req.signedCookies 로 접근 (쿠키가 없으면 undefined)
    next();
  } else {
    res.status(400);
    res.send(
      '로그인 필요한 서비스 입니다!<br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

// ------------- 미들웨어 ---------------
// 게시판 페이지 호출
router.get('/', isLogin, getAllArticles);

// 글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 글쓰기
router.post('/write', isLogin, upload.single('img'), writeArticle); // 주소에 들어오면, 로그인 확인, 파일업로드, writeArticle 실행

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, getArticle);

// 글 수정
router.post('/modify/:id', isLogin, upload.single('img'), modifyArticle);

// 글 삭제
router.delete('/delete/:id', isLogin, deleteArticle);

// ---------------------- 기존 코드
// // 게시판 페이지 호출
// router.get('/', isLogin, (req, res) => {
//   // 가운데 끼어있는 미들웨어를 실행하고, 걔가 next를 반환하면 콜백까지 이어지는 구조
//   // isLogin 은 req.session 로그인인지 체크, 있으면 next (콜백 함수 실행), 없으면 자기가 로그인 해달라는 send 때림

//   boardDB.getAllArticles((data) => {
//     const ARTICLE = data;
//     const articleCounts = ARTICLE.length;
//     const { userId } = req.session;
//     res.render('db_board', { ARTICLE, articleCounts, userId });
//   });
// });

// // 글쓰기 페이지 호출
// router.get('/write', isLogin, (req, res) => {
//   res.render('db_board_write');
// });

// // 데이터베이스에 글쓰기
// router.post('/write', isLogin, (req, res) => {
//   // USERID --> req.session.userId
//   // console.log(req.body); // 파라미터가 아닌 form 으로 넘기니 req.body로 받아야 함
//   if (req.body.title && req.body.content) {
//     const newArticle = {
//       userId: req.session.userId,
//       title: req.body.title,
//       content: req.body.content,
//     };
//     boardDB.writeArticle(newArticle, (data) => {
//       // req.body 가 아니라 new Article을 보낸다
//       console.log(data);
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         // 글쓰기 실패
//         const err = new Error('글 쓰기 실패'); // 에러 만들기
//         err.statusCode = 500;
//         throw err; // 에러 던지기
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 글 수정 모드로 이동
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticle(req.params.id, (data) => {
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] }); // 찾은 값을 selectedAr
//     } else {
//       const err = new Error('해당 ID 값을 가지는 게시글이 없습니다');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// // 글 수정하기
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       if (data.affectedRows >= 1) {
//         // 글 하나를 수정하기 때문에 affectedRow 가 1이면 잘 들어간 것
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 수정 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 글 삭제하기
// router.delete('/delete/:id', isLogin, (req, res) => {
//   boardDB.deleteArticle(req.params.id, (data) => {
//     if (data.affectedRows >= 1) {
//       res.status(200).send('글 삭제 성공'); // status 코드 찍어주고 send도 동시에
//     } else {
//       const err = new Error('글 삭제 실패');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// router.get('/getAll', (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
