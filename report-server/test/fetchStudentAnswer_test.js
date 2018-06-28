var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);



  chai.request('http://localhost:8080')
  .get('/student/fetchStudentAnswers')
  .query({sessionId: "5b2838313144f7bf72d7add2"})
  .then(responses => {
    console.log(responses);
  });