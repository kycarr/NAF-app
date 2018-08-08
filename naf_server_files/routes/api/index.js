import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
const test_controller = require('../../controllers/test_controller');
const fetch_answers_controller = require('../../controllers/fetch_answers_controller');
const instructor_controller = require('../../controllers/instructor_controller');
import {update_test} from '../../controllers/test_controller';
const User = require('../../models/User');
const Answer = require('../../models/Answer');
const Session = require('../../models/Session');
const Module = require('../../models/Module');
const Test = require('../../models/Test');
const Section = require('../../models/Section');
const Item = require('../../models/Item');
const Topic = require('../../models/Topic');
const Assignment = require('../../models/Assignment');
const Instructor = require('../../models/Instructor');
const Class = require('../../models/Class');
const TestResult = require('../../models/TestResult');
//data for seeding database
const qArray1 = require('../../questions');
const qArray2 = require('../../newQuestions');
const topicsArray1 = require('../../topics');
const topicsArray2 = require('../../newTopics');
const usersArray = require('../../users');
const StudentReport = require('../../models/StudentReport');

/*
async function generateInstructorReport(testName){
   const results = StudentReport.aggregate([
        {
            $match: {
                testName: testName
            }
        },
        {
            $group: {
                _id: "$_id",
                average: {$avg: "$testScorePercentage"}
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}
*/






const populateDB = async (test, qArray, topicsArray) => {
 
  for(let i=0; i<topicsArray.length; i++)
  {
    const newTopic = new Topic(topicsArray[i]);
    console.log(newTopic.name);
    //if the topic exists, dont again put it
    //const findTopic = await Topic.findOne({name: newTopic.name});
    
    
    await newTopic.save();
    
  }

  for(let i=0; i<qArray.length; i++)
  {
    const currentSectionItems = qArray[i];
    const section = new Section({
      test: test,
      sectionId: i
    });
   await section.save();
   for(let j=0; j<currentSectionItems.length; j++)
    {
      const currentItem = currentSectionItems[j];
      currentItem.sectionId=i;
      currentItem.test = test._id;
      const item = new Item(currentItem);
      await item.save();
      section.items.push(item);
      await section.save();
      item.section = section;
      await item.save();
    }
    
    test.sections.push(section);
  }

  await test.save();


  console.log('Database seeded successfully with dummy test data for test: ', test.testName);
}

const createDB = async () => {

    for(let i=0; i<usersArray.length; i++) {
      const currentUser = usersArray[i];
      const user = await User.findOne({username: currentUser.username, password: currentUser.password});
      if(!user) {
        console.log(`user ${currentUser.name} does not exist`);
        const newUser = new User(currentUser);
        await newUser.save();
      } else {
        console.log(`user ${currentUser.name} exists`);
      }
    }


    //check if the test already exists
    Test.findOne({testName: 'Test One'})
    .then(test => {
      if(test){
      console.log('Test One already exists');
      }
      else{
        console.log('Test One does not exist');
        //seed the database with the test
        const newTest = new Test({
          testName: 'Test One',
          module: 'FC-Module 01'
        });
        newTest.save()
        .then(newtest => populateDB(newTest, qArray1, topicsArray1))
        .catch(err => console.log('New Test One could not be created. Error: ' + err));        
      }
    })
    .catch(err => {
      console.log('Error finding test one: ' + err);
    })

    Test.findOne({testName: 'Test Two'})
      .then(test => {
        if(test) {
          console.log('Test Two already exists');
        }
        else {
          console.log('Test Two does not exist');
          const newTest2 = new Test({
            testName: 'Test Two',
            module: 'FC-Module 01'
          });
          newTest2.save()
            .then(newTest => populateDB(newTest, qArray2, topicsArray2))
            .catch(err => console.log('New Test Two could not be created. Error: ' + err));
        }
      })
      .catch(err => console.log('Error finding test two: ' + err));

    let users = await User.find({}, '_id');
    Instructor.findOne({name: 'Matthew Trimmer'})
    .then(instructor => {
      if(instructor) {
        console.log("instructor exists");
      }
      else {
        const instructor = new Instructor({
          name: 'Matthew Trimmer'
        });
        instructor.save()
        .then(ins => {
            const classes = new Class({
              instructor: ins._id,
              className: 'Class One',
              user: users
            });
            classes.save();
        })
        .catch(err => console.log('Error: ' + err));
        
      }
    })
    .catch(err => console.log('Error finding instructor: ' + err));

    update_test();

}

//seed the database
createDB();

//declare routes for controllers
router.get("/", test_controller.index);

router.post('/api/login', test_controller.login);

router.post('/api/questions', test_controller.get_questions_for_test);

router.post('/api/questionAnswerStore', test_controller.post_options_answers);

router.post('/api/questionResponseStore', test_controller.post_essay_answers); 

router.post('/api/submitSection', test_controller.submit_section);

router.post('/api/finishTest', test_controller.finish_test); 

router.get('/student/fetchStudentAnswers', fetch_answers_controller.fetchStudentAnswers);
// router.get('/api/getAllAnswerResponse', test_controller.get_all_answer_response);

router.get('/student/fetchStudentSessions', fetch_answers_controller.fetchStudentSessions);

router.get('/instructor/fetchInstructorData', instructor_controller.fetchInstructorData);



//export router
module.exports=router;