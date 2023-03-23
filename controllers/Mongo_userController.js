const mongoClient = require('./mongoConnect'); // mongoConnect 파일 연결

// 리팩토링 된 코드
const UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>';
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/register">회원 가입으로 이동</a>';
const SUSSCESS_MSG = '회원가입 성공!<br><a href="/login">로그인으로 이동</a>';

const LOGIN_UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/login">로그인으로 이동</a>';
const LOGIN_NOT_REGISTERED_MSG =
  '해당 id 가 존재하지 않습니다.<br><a href="/register">회원가입으로 이동</a>';
const LOGIN_WRONG_PASSWORD_MSG =
  '비밀번호가 다릅니다.<br><a href="/login">로그인으로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id }); // form이 가지고 있는 req.body.id 를 id 값에 넣어줌
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG); // 400번대는 사용자 잘못

    // 중복된 아이디가 없다면 회원가입 시키기
    await user.insertOne(req.body);
    res.status(200).send(SUSSCESS_MSG);
  } catch (err) {
    console.error(err); // 터미널에 에러 띄우기
    res.status(500).send(UNEXPECTED_MSG); // 500번대는 알 수 없는 에러는
  }
};

const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const findUser = await user.findOne({ id: req.body.id });

    if (!findUser) return res.status(400).send(LOGIN_NOT_REGISTERED_MSG);

    if (findUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONG_PASSWORD_MSG);

    // 로그인 성공 후 세션과 쿠키 만들기
    req.session.login = true; // session 객체의 login이라는 속성을 true로 설정하여 사용자가 로그인했음을 나타냄
    req.session.userId = req.body.id;

    res.cookie('user', req.body.id, {
      // 사용자의 id를 저장하는 user라는 쿠키 생성
      maxAge: 1000 * 30,
      httpOnly: true,
      signed: true,
    });

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(LOGIN_UNEXPECTED_MSG);
  }
};

module.exports = {
  registerUser, // registerUser 만 객체에 담아서 외부로 뺴주기
  loginUser,
};

// 기존 코드
// const userDB = {
//   // 중복 회원 찾기
//   userCheck: async (userId) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userId }); // user 컬렉션에서 써야함
//       return { ID: findUser, PASSWORD: findUser.password }; // 같은 값을 찾으면 찾은 값을 전달
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   // 회원 가입 하기
//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect(); // db 접속
//       const user = client.db('kdt5').collection('user');

//       await user.insertOne(newUser);
//       return true; // 에러가 발생하지 않으면 true 반환
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };
// // 콜백을 쓰는 이유는 데이터를 읽고 나서 데이터를 리턴해주면 콜백에 담아서 전다해줘야 하기 때문에

// module.exports = userDB; // 객체를 통으로 바깥으로 빼줌
