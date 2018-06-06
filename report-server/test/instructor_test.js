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
  .send({ 'firstName': 'Fred', 'lastName': 'Wong', 'class_id': [1, 2]})
  .end(function(err, res) {
    console.log(err);
    console.log(res);
    done();
  });
// chai.request('http://localhost:8080')
//   .get('/report/getInstructorInfo')
//   .query({id: "5b170649cd4324181ecdbf57"})
//   .then(responses => {
//     console.log(responses.text);
//     console.log(responses.body);
//   });


