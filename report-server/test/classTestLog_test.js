var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


chai.request('http://localhost:8080')
  .get('/')
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .post('/report/createClassTestLog')
  .send({
    'testName': 'FC - Module 06',
    'className': 'Class 3',
    'trainee_id': '5b19a97fd22ed345ed0e78fd'
  })
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .post('/report/createClassTestLog')
  .send({
    'testName': 'FC - Module 06',
    'className': 'Class 3',
    'trainee_id': '5b19a97fd22ed345ed0e79fd'
  })
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .post('/report/createClassTestLog')
  .send({
    'testName': 'FC - Module 06',
    'className': 'Class 3',
    'trainee_id': '5b1af9d62c47bc689e89eb74'
  })
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .get('/report/fetchClassTestLog')
  .query({id: "5b1ab4ad90e86e5334c2bdf2"})
  .then(responses => {
    console.log(responses.text);
  });


chai.request('http://localhost:8080')
  .get('/report/fetchClassTestLog')
  .query({className: "Class 3", testName: "FC - Module 06"})
  .then(responses => {
    console.log(responses.text);
  });
