var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


chai.request('http://localhost:8080')
  .get('/')
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .post('/report/createInstructor')
  .send({
    'firstName': 'Fred',
    'lastName': 'Wong',
    'classNames': ["Class A", "Class B"]
  })
  .then(responses => {
    console.log(responses.text);
  });

chai.request('http://localhost:8080')
  .get('/report/getInstructorInfo')
  .query({id: "5b198a2a4618fd3fc7d9ee37"})
  .then(responses => {
    console.log(responses.text);
  });

