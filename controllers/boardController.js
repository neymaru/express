// 패키지에서 갖고오는 모듈
const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>';

// 모든 게시글 가져오기
const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const getAllArticleCursor = board.find({}); // 빈 객체를 넣어서 전체 객체를 가지고 오겠다 / 시간이 안걸려서 await 필요 없음
    const ARTICLE = await getAllArticleCursor.toArray();

    res.render('db_board', {
      // 객체 안에 담아서 보내줌
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId, // 세션에서 userId 가져옴
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG); // 어떤 에러일 지 예측 어렵기 때문에 에러 메시지 띄우고 메인으로 보내기
  }
};

// 게시글 추가하기
const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    await board.insertOne(newArticle); // 문제 없이 작동하면 await 풀리면서 다음 줄 작동
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 게시글 수정모드 이동
const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { selectedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 게시글 수정하기
const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { TITLE: req.body.title, CONTENT: req.body.content } },
    );
    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

// 게시글 삭제하기
const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제 성공'); // delete 메소드 쓰면 redirect 시 페이지 요청 불가. 그래서 프론트(ejs) 에서 reload
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};

// -------------------------- 기존 코드 ------------------------------------
// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticles: (cb) => {
//     // 데이터를 갖기 위한 콜백 함수를 갖고 있음
//     connection.query('SELECT * from mydb1.board', (err, data) => {
//       // 데이터베이스 커넥션으로부터 쿼리 전달
//       if (err) throw err; // 에러 있으면 던지기
//       // console.log(data); // 데이터 잘 들어왔는지 찍어보기
//       cb(data); // 콜백함수의 인자로써 받아온 데이터를 날려줌
//     });
//   },
//   // 게시글 추가하기
//   writeArticle: (newArticle, cb) => {
//     // 서버에 접속한 다음에 쿼리 날려주기
//     connection.query(
//       `INSERT INTO mydb1.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}', '${newArticle.title}', '${newArticle.content}');`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   getArticle: (id, cb) => {
//     // ID_PK 가 동일할 때 데이터를 담아서 콜백으로 던져주기
//     connection.query(
//       `SELECT * FROM mydb1.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
//   // 특정 ID를 가지는 게시글을 수정하는 컨트롤러
// modifyArticle: (id, modifyArticle, cb) => {
//   connection.query(
//     `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//     (err, data) => {
//       if (err) throw err;
//       cb(data);
//     },
//   );
// },

//   // 특정 ID를 가지는 게시글 삭제하기
//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb1.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;
