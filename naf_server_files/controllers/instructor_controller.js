const mongoose = require ('mongoose');
const PORT = process.env.PORT || 8080;

//loading Models
const User = require('../models/User');
const Answer = require('../models/Answer');
const Module = require('../models/Module');
const Test = require('../models/Test');
const Section = require('../models/Section');
const Item = require('../models/Item');
const Session = require('../models/Session');
const Task = require('../models/Task');
const Topic = require('../models/Topic');
const StudentReport = require('../models/StudentReport');
const TestResult = require('../models/TestResult');
const Class = require('../models/Class');
const TraineeResult = require('../models/TraineeResult');
const RequirementsNotMet = require('../models/RequirementsNotMet');
/*
const trainees = [
    {
      traineeName: 'Bob Smith',
      timeStarted: '10:00 - 10/10/2014',
      timeCompleted: '11:00 - 10/10/2014',
      attempts: 4,
      totalScore: 10,
      result: 'Fail',
      topics: [
         {
            label: 'Topic one',
            score: 5,
            total: 10
         },
         {
            label: 'Topic two',
            score: 2,
            total: 3
         },
         {
            label: 'Topic three',
            score: 3,
            total: 4
         }
      ]

    },
    {
      traineeName: 'Bob Smith',
      timeStarted: '10:00 - 10/10/2014',
      timeCompleted: '11:00 - 10/10/2014',
      attempts: 4,
      totalScore: 10,
      result: 'Fail',
      topics: [
         {
            label: 'Topic one',
            score: 5,
            total: 10
         },
         {
            label: 'Topic two',
            score: 2,
            total: 3
         },
         {
            label: 'Topic three',
            score: 3,
            total: 4
         }
      ]

    }
  ];
*/
const byTopics = [
    {
      name: 'Overview',
      major: [
        'Bob Smith',
        'James Mason',
        'Henry McFarlene',
        'Janet jonson',
        'David Silinger',
        'Jim Hicks'
      ],
      minor: [
        'Samuel Johson',
        'Timmothy Alberton'
      ],
      critical:[
        'Daniel Yoon'
      ]
    },
    {
      name: 'Topic 2',
      major: [
        'Bob Smith',
        'James Mason',
        'Henry McFarlene',
        'Janet jonson',
        'David Silinger',
        'Jim Hicks'
      ],
      minor: [
        'Samuel Johson',
        'Timmothy Alberton'
      ],
      critical:[
        'Daniel Yoon'
      ]
    }
  ];

  const byTrainee = [
    {
      name: 'Sailor A',
      major: [
        'Math',
        'Science',
        'Security'
      ],
      minor: [
        'Finance',
      ],
      critical:[
        {
          topic: 'Computer Network',
          questions: [
            'Question 1',
            'Question 4',
            'Question 2'
          ]
        },
        {
          topic: 'Computer Security',
          questions: [
            'Question 2',
            'Question 13'
          ]
        }
      ]
    },
    {
      name: 'Sailor B',
      major: [
        'Math',
        'Science'
      ],
      minor: [
        'Finance',
        'Security'
      ],
      critical:[
        {
          topic: 'Computer Network',
          questions: [
            'Question 1',
            'Question 2'
          ]
        },
        {
          topic: 'Computer Security',
          questions: [
            'Question 2',
            'Question 13'
          ]
        }
      ]
    }
  ];

async function fetchInstructorReport(testName, className) {
    const report = await TestResult.findOne({testName: testName, className: className});
    if(report === null) {
        return generateInstructorReport(testName, className);
    }
    else {
        return report;
    }

}

async function fetchTraineeReport(testName, className) {
    const report = await TraineeResult.findOne({testName: testName, className: className});
    console.log(report);
    if(report === null) {
        return generateTraineeReport(testName, className);
    }
    else {
        return report.traineeResult;
    }

}


async function fetchRequirementsReport(testName, className) {
    const report = await TraineeResult.findOne({testName: testName, className: className});
    console.log(report);
    if(report === null) {
        return generateTraineeReport(testName, className);
    }
    else {
        return report.traineeResult;
    }

}


export async function generateRequirementsReport(testName, className) {
    const students = await Class.findOne({className: className});
    const reports = await StudentReport.find({testName: testName}, 'user byTopic testDate').sort({testDate: 'descending'});
    
    let byTopic = [];
    let byTrainee = [];

    reports[0].byTopic.forEach(topic => {
        byTopic.push({name: topic.topic, major: [], minor: [], critical: ['Daniel Yoon']});
    });
    byTopic.sort(function (a, b) {
        if(a.name < b.name) return -1;
        else return 1;
    });
//https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    let visited = [];
    for(let j = 0; j < reports.length; j++) {
        //sort first
        let element = reports[j];
        
        let index = visited.findIndex(ele => {
          return ele.user === element.user;
        });
        //if there exist a record then any pass is a pass
        if(index !== -1) {
          continue;
        }

        element.byTopic.sort(function (a, b) {
            if(a.topic < b.topic) return -1;
            else return 1;
        });

        for(let i = 0; i < element.byTopic.length; i++) {
            let topic = element.byTopic[i];
            // console.log(topic);
            if(topic.percentage < 30) {
                byTopic[i].major.push(element.user);
            }
            else if(topic.percentage < 60) {
                byTopic[i].minor.push(element.user);
            }
        }

        visited.push(element);
    }

    for(let j = 0; j < reports.length; j++) {
        let element = reports[j];
        let found = byTrainee.find(ele => {

          return ele.name === element.user;
        });
        if(found)
            continue;

        let major = [];
        let minor = [];
        let critical = [];
        for(let i = 0; i < element.byTopic.length; i++) {
            let topic = element.byTopic[i];
            // console.log(topic);
            if(topic.percentage < 30) {
                major.push(topic.topic);
            }
            else if(topic.percentage < 60) {
                minor.push(topic.topic);
            }
        }
        byTrainee.push({name: element.user, major: major, minor: minor, critical: critical});

    }   

    byTrainee.sort(function (a, b) {
        if(a.name < b.name) return -1;
        else return 1;
    });

    byTopic.forEach(result => {
        result.major.sort(function (a, b) {
            if(a < b) return -1;
            else return 1;
        });
        result.minor.sort(function (a, b) {
            if(a < b) return -1;
            else return 1;
        });
        result.critical.sort(function (a, b) {
            if(a < b) return -1;
            else return 1;
        });
    });

    //Trainee:

    let result = {
        testName: testName,
        className: className,
        byTopic: byTopic,
        byTrainee: byTrainee
    }
    console.log(result);
    let requirements = RequirementsNotMet(result);
    await requirements.save();
    return result;
}

export async function generateTraineeReport(testName, className) {
    const students = await Class.findOne({className: className});
    const reports = await StudentReport.find({testName: testName}).sort({testDate: 'descending'});
    const users = await User.find({
        '_id': { $in: students.user}
    });
    let trainees = [];
    let labels = reports[0].topicLabel;
    var myMap = new Map();
    let noTopic = [];
    let topicFlag = true;
    for(let i = 0; i < users.length; i++) {
        myMap.set(users[i].name, {});
    }
    for(let i = 0; i < reports.length; i++) {
        let user = reports[i].user;
        let ele = myMap.get(user);

        if(Object.keys(ele).length === 0) {
            let topics = [];
            // let topicValue = reports[i].topicValue;
            let byTopic = reports[i].byTopic;
            for(let j = 0; j < labels.length; j++) {

                let topicObject = byTopic.find(element => {
                    if(labels[j] == element.topic) {
                        return element;
                    }
                    else {
                        return null;
                    }
                });
                if(topicFlag) {
                    noTopic.push({label: labels[j], score: 0, total: topicObject.correct + topicObject.incorrect});
                }
                topics.push({label: labels[j], score: topicObject.correct, total: topicObject.correct + topicObject.incorrect});
                topics.sort(function (a, b) {
                    if(a.label < b.label) return -1;
                    else return 1;
                });
            }
            myMap.set(user, {
                timeStarted: reports[i].testDate.toString(), 
                timeCompleted: reports[i].testDate.toString(),
                result: reports[i].testResult,
                topics: topics,
                attempts: 1,
                totalScore: reports[i].testScorePercentage
            });
        }
        else {
            if(Date.parse(ele.dateCompleted) < Date.parse(reports[i].testDate)) {
                ele.timeStarted = reports[i].testDate;
                ele.timeCompleted = reports[i].testDate;
            }
            ele.attempts++;
            myMap.set(user, ele);
        }
        topicFlag = false;
        noTopic.sort(function (a, b) {
            if(a.label < b.label) return -1;
            else return 1;
        });
    }
    myMap.forEach((value, key) => {
        if(value.result === undefined) {
            trainees.push({

                traineeName: key,
                timeStarted: 'NOT COMPLETE',
                timeCompleted: 'NOT COMPLETE',
                result: 'FAIL',
                topics: noTopic,
                attempts: 0,
                totalScore: '0%'
            });
        }
        else {
            trainees.push({

                traineeName: key,
                timeStarted: value.timeStarted,
                timeCompleted: value.timeCompleted,
                result: value.result,
                topics: value.topics,
                attempts: value.attempts,
                totalScore: value.totalScore
            });
        }

    }); 
    let result = {
        testName: testName,
        className: className,
        traineeResult: trainees
    }
    let traineeResult = TraineeResult(result);
    await traineeResult.save();
    return trainees;
}


async function generateInstructorReport(testName, className) {
    // await generateTraineeReport(testName, className);
    let results = {};
    const reports = await StudentReport.find({testName: testName}).sort({testDate: 'descending'});
    const students = await Class.findOne({className: className});
    let total = students.user.length;
    let sum = 0;
    let testMap = [];
    let topicValue = [];
    let pass = 0;
    let labels = reports[0].topicLabel;
    let dateCompleted = reports[0].testDate;
    for(let i = 0; i < reports.length; i++) {
        if(!testMap.includes(reports[i].user)) {
            testMap.push(String(reports[i].user));
            topicValue.push(reports[i].topicValue);
            sum += parseInt(reports[i].testScorePercentage);
            if(reports[i].testResult === "PASS") {
                pass++;
            }
        }
    }

    results.average = Math.round(sum / testMap.length) + "%";
    results.dateCompleted = dateCompleted;
    results.inComplete = total - testMap.length;
    results.testName = testName;
    results.className = className;
    results.pass =  Math.round(pass * 100 / total) + "%";
    results.notStart = 0;
    results.finished = testMap.length;

    let topic = [];
    for(let i = 0; i < labels.length; i++) {
        topic.push({label: labels[i], pass: 0, fail: 0});
    }
    for(let i = 0; i < topicValue.length; i++) {
        for(let j = 0; j < topic.length; j++) {
            if(topicValue[i][j] > 20) {
                topic[j].pass++; 
            }
            else {
                topic[j].fail++;
            }
        }
    }
    results.topics = topic;
    const testLog = new TestResult(results);
    await testLog.save();
    return results;
}

exports.fetchInstructorData = async(req, res) => {
	const resultsObject = await fetchInstructorReport('Test One', 'Class One');
    const traineesObject = await fetchTraineeReport('Test One', 'Class One');
	const responseJSON = {};
	responseJSON['results'] = resultsObject;
	responseJSON['trainees'] = traineesObject;
	responseJSON['byTrainee'] = byTrainee;
	responseJSON['byTopics'] = byTopics;
	
	res.json(responseJSON);

}
