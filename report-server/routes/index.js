var express = require('express');
const router = express.Router();
var instructorController = require('../controllers/instructorController');

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

module.exports=router;