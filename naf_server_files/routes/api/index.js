import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
const test_controller = require('../../controllers/test_controller');
const fetch_answers_controller = require('../../controllers/fetch_answers_controller');
const instructor_controller = require('../../controllers/instructor_controller');

const User = require('../../models/User');
const Answer = require('../../models/Answer');
const Session = require('../../models/Session');
const Module = require('../../models/Module');
const Test = require('../../models/Test');
const Section = require('../../models/Section');
const Item = require('../../models/Item');
const Topic = require('../../models/Topic');


//data for seeding database
const qArray = require('../../questions');
const topicsArray = require('../../topics');


const populateDB = async (test) => {
 
  for(let i=0; i<topicsArray.length; i++)
  {
    const newTopic = new Topic(topicsArray[i]);
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
  console.log('Database seeded successfully with dummy test data');
}

const createDB = async () => {

    const user = await User.findOne({username: 'testuser', password: '123456'});
    if(!user) {
      console.log('user does not exist');
      const newUser = new User({
        username: 'testuser',
        password: '123456',
        name: 'Test User'
      });
      await newUser.save();
    } else {
      console.log('user already exists');
    }
    //check if the test already exists
    Test.findOne({testName: 'Test One'})
    .then(test => {
      if(test){
      console.log('Test already exists');
      }
      else{
        console.log('test does not exist');
        //seed the database with the test
        const newTest = new Test({
          testName: 'Test One',
          module: 'FC-Module 01'
        });
        newTest.save()
        .then(newtest => {populateDB(newTest)})
        .catch(err => {console.log('New test could not be created. Error: ' + err)});
      }
    })
    .catch(err => {
      console.log('Error finding test: ' + err);
    })
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

router.get('/api/instructor/fetchInstructorData', instructor_controller.fetchInstructorData);

//export router
module.exports=router;