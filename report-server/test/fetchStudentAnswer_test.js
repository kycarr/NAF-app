var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);



  chai.request('http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080')
  .get('/student/fetchStudentAnswers')
  .query({user_id: "5b2001254e342d20e3dcb3c7"})
  .then(responses => {
    console.log(responses.text);
  });