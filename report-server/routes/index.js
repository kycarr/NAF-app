var express = require('express');
const router = express.Router();
var instructorController = require('../controllers/instructorController');
var testResultController = require('../controllers/testResultController');
var classTestLogController = require('../controllers/classTestLogController');

const PORT = process.env.PORT || 8080;

router.get("/",(req,res)=>{
    res.send(`Server started on port ${PORT}`);
});

router.post('/api/login', (req,res)=>{
});

router.post('/api/questions', (req,res)=>{
    
    let userId = req.query.userId;
    //will need to fetch questions based on user Id
    res.json(qArray);
});

router.get('/report/getInstructorInfo', instructorController.instructor_info);

router.post('/report/createInstructor', instructorController.create_instructor);

router.get('/report/fetchTestResult', testResultController.fetchTestResult);

router.post('/report/createTestResult', testResultController.createTestResult);

router.get('/report/fetchClassTestLog', classTestLogController.fetchClassTestLog);

router.post('/report/createClassTestLog', classTestLogController.createClassTestLog);

module.exports=router;