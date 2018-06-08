var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


// chai.request('http://localhost:8080')
//   .get('/')
//   .then(responses => {
//     console.log(responses.text);
//   });

chai.request('http://localhost:8080')
  .post('/report/createTestResult')
  .send({
    'className': 'Class 7',
    'testName': 'FC - Module 06',
    'numPassPercent': 0.7,
    'topics': [
        {
          name: 'Topic 1',
          pass: 12,
          fail: 0
        },
        {
          name: 'Topic 2',
          pass: 10,
          fail: 12
        },
        {
          name: 'Topic 3',
          pass: 3,
          fail: 13
        }
    ]
  })
  .then(responses => {
    console.log(responses.text);
  });
  
chai.request('http://localhost:8080')
  .get('/report/fetchTestResult')
  .query({id: "5b1af9d62c47bc689e89eb74"})
  .then(responses => {
    console.log(responses.text);
  });