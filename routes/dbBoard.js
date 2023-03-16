// DB와 관련된 Board의 모든 기능을 가지는 라우터

const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 게시판 페이지 호출
router.get('/', (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board', { ARTICLE, articleCounts });
  });
});

// ------------- 미들웨어 ---------------

// 글쓰기 페이지 호출
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 데이터베이스에 글쓰기
router.post('/write', (req, res) => {
  // console.log(req.body); // 파라미터가 아닌 form 으로 넘기니 req.body로 받아야 함
  if (req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
      console.log(data);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        // 글쓰기 실패
        const err = new Error('글 쓰기 실패'); // 에러 만들기
        err.statusCode = 500;
        throw err; // 에러 던지기
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/:id', (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] }); // 찾은 값을 selectedAr
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글이 없습니다');
      err.statusCode = 500;
      throw err;
    }
  });
});

// 글 수정하기
router.post('/modify/:id', (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        // 글 하나를 수정하기 때문에 affectedRow 가 1이면 잘 들어간 것
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제하기
router.delete('/delete/:id', (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('글 삭제 성공'); // status 코드 찍어주고 send도 동시에
    } else {
      const err = new Error('글 삭제 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
