const express = require('express');

const router = express.Router(); //   express 라우터를 실행시켜서 router 변수에 넣어주기

// '/' 이 주소로 요청받으면 코드를 실행시켜줘
// localhost:/4000
// 루트 경로('/')에 대한 GET 요청에 대한 경로 핸들러를 정의
router.get('/', (req, res) => {
  res.render('index', { msg: '이 데이터는 백엔드가 보냈어요!' }); // render는 그리는 것, 이 주소로 요청이 들어오면 index.ejs 파일을 보여줌
  // 첫번째 인수는 렌더링 할 뷰의 이름, 두번쨰 인수는 뷰에 전달할 데이터를 포함하는 개체
});

module.exports = router; //  molude.exports 로 모듈로서 빼주어서 외부에서 사용 가능하게 해주기. app.js 에서 라우터 연결 하기 위해
