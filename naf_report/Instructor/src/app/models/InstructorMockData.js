export const InstructorMockData = {


  results: {
    className: 'Class 1',
    testName: 'Test One',
    dateCompleted: '07/11/2018',
    finished: 10,
    inComplete: 4,
    notStart: 1,
    average: '50%',
    pass: '33%',
    topics: [
      {
        label: 'Math Knowledge',
        pass: 10,
        fail: 5
      },
      {
        label: 'English Knowledge',
        pass: 5,
        fail: 10
      },
      {
        label: 'Electronics Knowledge',
        pass: 12,
        fail: 3
      },
      {
        label: 'Arithmetic Reasoning',
        pass: 4,
        fail: 9
      }
    ]
  },


  trainees: [
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
  ],

  byTopics: [
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
  ],

  byTrainee: [
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
  ]



};
