const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://admin:test@cluster0.bypsbme.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insertOne 쿼리
client.connect((err) => {
  const test = client.db('kdt5').collection('test');

  test.deleteMany({}, (deleteErr, deleteResult) => {
    // 빈 객체는 전부 지워준다.
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertOne(
      {
        name: 'pororo',
        age: 5,
      },
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
      },
    );
  });
});

// insertMany 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       },
//     );
//   });
// });

// deleteOne 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
//           // 조건은 객체 안에 담아서
//           if (deleteOneErr) throw deleteOneErr;
//           console.log(deleteOneResult);
//         });

//         // client.close(); // client.close();는 콜백에 제일 안쪽에서 실행되더야 한다. (지금은 일단 주석)
//       },
//     );
//   });
// });

// // deleteMany 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     // 빈 객체는 전부 지워준다.
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.deleteMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//         test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
//           // 조건은 객체 안에 담아서
//           if (deleteOneErr) throw deleteOneErr;
//           console.log(deleteOneResult);
//         });

//         // client.close(); // client.close();는 콜백에 제일 안쪽에서 실행되더야 한다. (지금은 일단 주석)
//       },
//     );
//   });
// });

// -- deleteOne --
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
//         console.log(deleteOneResult); // acknowledged: true => 실행 성공
//       });
//     },
//   );
// });

// -- deleteMany --
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.insertMany(
//     [
//       { name: 'pororo', age: 5 },
//       { name: 'loopy', age: 6 },
//       { name: 'crong', age: 4 },
//     ],
//     (insertErr, insertResult) => {
//       if (insertErr) throw insertErr;
//       console.log(insertResult);

//       // $ : mongoDB에 특정 명령을 내림 => $gte :  greater than equal (~이상일때)
//       test.deleteMany(
//         { age: { $gte: 5 } },
//         (deleteManyErr, deleteManyResult) => {
//           console.log(deleteManyResult);
//         },
//       );
//     },
//   );
// });

// -- updateOne --
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         test.updateOne(
//           { name: 'loopy' },
//           { $set: { name: '루피' } },
//           (updateErr, updateResult) => {
//             if (updateErr) throw updateErr;
//             console.log(updateResult);
//           },
//         );
//       },
//     );
//   });
// });

// -- updateOne 쿼리 --
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         test.updateMany(
//           { age: { $gte: 5 } },
//           { $set: { name: '5살 이상인 친구들' } },
//           (updateErr, updateResult) => {
//             if (updateErr) throw updateErr;
//             console.log(updateResult);
//           },
//         );
//       },
//     );
//   });
// });

// findOne 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         test.findOne({ name: 'loopy' }, (findErr, findData) => {
//           if (findErr) throw findErr;
//           console.log(findData);
//         });
//       },
//     );
//   });
// });

// find 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         const findCursor = test.find({}); // find는 콜백을 없애고 변수에 담아주면 된다.
//         console.log(findCursor);
//         findCursor.toArray((toArrErr, toArrayData) => {
//           if (toArrErr) throw toArrErr;
//           console.log(toArrayData);
//         });
//       },
//     );
//   });
// });

// client.close(); 여기 있으면 에러 난다. JS 비동기적 특성 떄문에 접속하자 마자 끊는다.
