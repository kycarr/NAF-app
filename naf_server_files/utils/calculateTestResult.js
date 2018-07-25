const calculateTestResult = rawData => {

  console.log('Calculating Test Result');
    let correctness = [];
    let topicsScore = [];
    let topicsScoreP = [];
    let topicValue = [];
    let topicsIndex=0;
    let totalPass=0;
    let topicLabel = [];


    if(Object.keys(rawData['questionResponses']).length > 0) {
      for(let key in rawData['questionResponses']) {

          if(rawData['questionResponses'][key].pass === true) {
            correctness[key] = true;
            totalPass++;
          }else {
            correctness[key] = false;
          }

          if(topicValue[rawData['questionResponses'][key].topicName] === undefined){
            topicValue[rawData['questionResponses'][key].topicName] = 1;
          } else {
            topicValue[rawData['questionResponses'][key].topicName] +=1;
          }

          if(correctness[key] === true) {
            if(topicsScoreP[rawData['questionResponses'][key].topicName] === undefined) {
              topicsScoreP[rawData['questionResponses'][key].topicName]=1;
            }else {
              topicsScoreP[rawData['questionResponses'][key].topicName] +=1;
            }
          }
      }
    }

    for(let key in topicValue) {
      if(!(key in topicsScoreP)){
        topicsScoreP[key]=0;   //this is for topics that might have zero score
      }
    }

    for(let key in topicsScoreP) {
      topicValue.push(100*(topicsScoreP[key]/topicValue[key]));
      topicLabel.push(key);
    }

    let totalScore = correctness.length>1 ? Math.round(100*totalPass/correctness.length,1):0;

    let requirementsNotMetObject = {
      'Major' : [],
      'Minor' : [],
      'Critical' : []
    };

    for(let i=0; i<topicValue.length; i++) {
        if(topicValue[i] <= 30) {
          requirementsNotMetObject['Major'].push(' ' + topicLabel[i]);
        } else if(topicValue[i] >30 && topicValue[i] <=60) {
          requirementsNotMetObject['Minor'].push(' ' + topicLabel[i]);
        }
    }

    let testScore = `${totalPass}/${correctness.length}`;
    let testScorePercentage = `${totalScore} %`;
    let testResult = totalScore>60?'PASS':'FAIL';
 

    const reportingData = {
      'testName':rawData.testName,
      'testScore': testScore,
      'testScorePercentage': testScorePercentage,
      'testResult': testResult,
      'requirementsNotMetObject': requirementsNotMetObject,
      'topicValue': topicValue,
      'topicLabel': topicLabel
    };

    
    return reportingData;

}

module.exports = calculateTestResult;