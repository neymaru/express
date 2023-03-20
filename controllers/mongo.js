const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://admin:test@cluster0.bypsbme.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw err;
    console.log(deleteResult);
    test.insertOne(
      {
        name: 'tetz',
        nickname: 'chicken head',
      },
      (insertErr, insertResult) => {
        console.log(insertResult);
        // findCursor 데이터가 어디 있는지 위치를 알려줌. 빈 객체를 전달함으로써 모든 객체를 찾아주세요
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
