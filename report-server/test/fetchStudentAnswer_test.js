var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


chai.request('http://localhost:8888')
  .get('/')
  .then(responses => {
    console.log(responses.text);
  });

  chai.request('http://localhost:8888')
  .get('/student/fetchStudentAnswers')
  .query({user_id: "5b1efaad2c8243159b67c80c"})
  .then(responses => {
    console.log(responses.text);
  });