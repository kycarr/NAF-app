
import express from 'express';
const router = express.Router();
const test_controller = require('../../controllers/test_controller');
const fetch_answers_controller = require('../../controllers/fetch_answers_controller');

const User = require('../../models/User');
const Answer = require('../../models/Answer');
const Session = require('../../models/Session');
const Module = require('../../models/Module');
const Test = require('../../models/Test');
const Section = require('../../models/Section');
const Item = require('../../models/Item');



const qArray = require('../../questions');

const populateDB = async (test) => {

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
}

const createDB = async () => {


    const user = await User.findOne({username: 'anirudhm', password: '123456'});

    if(!user) {

      console.log('user does not exist');

      const newUser = new User({
        username: 'anirudhm',
        password: '123456',
        name: 'Anirudh Mittal'
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
          testName: 'Test One'
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



router.get("/", test_controller.index);

router.post('/api/login', test_controller.login);

router.post('/api/questions', test_controller.get_questions_for_test);

router.get('/api/questionAnswerStore', test_controller.post_options_answers);

router.post('/api/questionResponseStore', test_controller.post_essay_answers); 

router.post('/api/submitSection', test_controller.submit_section);

router.post('/api/finishTest', test_controller.finish_test); 

router.get('/student/fetchStudentAnswers', fetch_answers_controller.fetchStudentAnswers);
// router.get('/api/getAllAnswerResponse', test_controller.get_all_answer_response);

module.exports=router;