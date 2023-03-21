const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require('mongodb');

const uri =
  'mongodb+srv://admin:test@cluster0.bypsbme.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client; // 이 파일을 불러오면 어디서나 사용할 수 있다.
