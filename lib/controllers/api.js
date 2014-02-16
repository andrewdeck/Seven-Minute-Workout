'use strict';

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};

exports.exercises = function(req, res) {
  res.json([
    {
      name: 'Jumping Jacks',
      affectedArea: 'Total Body',
      imageUrl: 'images/JumpingJacks.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Wall Sit',
      affectedArea: 'Lower Body',
      imageUrl: 'images/WallSit.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Push Ups',
      affectedArea: 'Total Body',
      imageUrl: 'images/PushUp.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Crunches',
      affectedArea: 'Core',
      imageUrl: 'images/Crunch.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Chair Step-up',
      affectedArea: 'Total Body',
      imageUrl: 'images/ChairStepUp.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Squats',
      affectedArea: 'Lower Body',
      imageUrl: 'images/Squat.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Tricep Dip on Chair',
      affectedArea: 'Upper Body',
      imageUrl: 'images/TricepDip.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Plank',
      affectedArea: 'Core',
      imageUrl: 'images/Plank.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'High Knees',
      affectedArea: 'Total Body',
      imageUrl: 'images/HighKnees.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Lunges',
      affectedArea: 'Lower Body',
      imageUrl: 'images/Lunge.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Push-ups with Rotation',
      affectedArea: 'Upper Body',
      imageUrl: 'images/PushUpWithRotation.jpeg',
      alternateSides: false,
      length: 30
    },
    {
      name: 'Rest',
      affectedArea: 'Total Body',
      imageUrl: 'images/Rest.jpg',
      alternateSides: false,
      length: 10
    },
    {
      name: 'Side Plank',
      affectedArea: 'Total Body',
      imageUrl: 'images/SidePlank.jpeg',
      alternateSides: true,
      length: 30
    }

  ]);
};