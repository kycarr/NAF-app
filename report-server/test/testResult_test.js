var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


chai.request('http://localhost:8080')
  .get('/')
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .post('/report/createTestResult')
  .send({
    'className': 'Class 3',
    'testName': 'FC - Module 06',
  })
  .then(responses => {
    console.log(responses.text);
  });
chai.request('http://localhost:8080')
  .get('/report/fetchTestResult')
  .query({id: "5b19a97fd22ed345ed0e68fd"})
  .then(responses => {
    console.log(responses.text);
  });