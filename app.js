// ----------------- 패키지 -----------------
const express = require('express');
const cors = require('cors'); // HTTP 요청에 대해 CORS(Cross-Origin Resource Sharing)를 활성화하는 미들웨어
const cookieParser = require('cookie-parser'); // 들어오는 HTTP 요청에서 쿠키를 구문 분석하기 위한 미들웨어
const session = require('express-session'); // Express 애플리케이션에서 사용자 세션을 처리하기 위한 미들웨어
require('dotenv').config(); // 바로 불러서 실행시키는 방식. 이 서버한테 env 방식을 적용 시키겠다

// --------------- 중요 정보 -----------------
const app = express(); // express 서버를 실행해서 app 변수에 넣어주기
const { PORT } = process.env; // 포트 번호 설정. 3000번 대 이상 수 중 아무 숫자나 포트 번호로 설정 (3000번은 안쓰는 게 좋음)

// --------------- 서버 설정 ---------------
app.use(cors()); // cors 패키지를 써라
app.set('view engine', 'ejs'); // 뷰엔진으로 ejs 를 쓸거다(ejs 가 설치되어 있어야 됨)
app.use(express.static('public')); // app.use 를 사용하여 static 폴더 사용을 서버에 알려주기 (괄호 안은 지정할 폴더명)
app.use('/uploads', express.static('uploads'));

// bodyparser 를 위한 코드 2줄
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('tetz')); // 나 이제 cookie-parser 쓴다. 문자열 값 아무거나 넣어주면 된다.
app.use(
  session({
    secret: 'tetz', // 세션을 발급할 때 사용되는 키 값
    resave: false, // 모든 request 마다 기존에 있던 session에 아무런 변경사항이 없어도 session 을 다시 저장하는 옵션
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  }),
);

// --------------- 라우터 ---------------
const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter); // '/' 이 주소로 요청이 들어오면 app.js 가 다루지 않고 mainRouter에게 하청을 맡김
app.use('/users', userRouter); // 서버야 /users 라는 url로 요청이 들어오면 userRouter 에게 담당시켜 라고 담당자 지정
app.use('/board', boardRouter);
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// --------------- 미들웨어 ---------------

// 기본 주소에 들어왔을 시 처리 할 미들웨어
app.get('/', (req, res) => {
  res.send('어서와 Express는 처음이지?');
});

// --------------- 사용자 지정 오류 처리 미들웨어 ---------------
// 인자 4개를 입력해야만 err 를 받을 수 있다
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다!`); // 서버를 최초 실행시켜주는 메소드  인자(어느 포트에서 , 서버가 제대로 실행되었을 때 실행시킬 콜백함수)
});
