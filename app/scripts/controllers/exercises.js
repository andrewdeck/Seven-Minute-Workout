'use strict';

angular.module('HICTApp')
  .controller('ExercisesCtrl', function ($scope, $http, $interval, $log) {
    $http.get('/api/exercises').success(function(exercises) {
      $scope.exercises = exercises;
      $scope.currentExercise = exercises[0];

      // lets preload the images
      var images = [];
      for(var i=0,len = exercises.length; i<len; i++){
        images[i] = new Image();
        images[i].src = exercises[i].imageUrl;
      }
    });

    var workoutBeggining, stepBegging, alternateAlertPlayed;
    var workoutLength = 0; // total length of workout in ms
    var index = 0;
    var speed = 1000; // for testing 100 is faster, 1000 is realtime

    var ding = new Audio('images/ding.wav');

    $scope.currentExercise = null;

    $scope.overallProgress = 0;

    $scope.currentExerciseProgress = 0;

    $scope.startWorkout = function() {
      if(!angular.isDefined($scope.timer)) {
        workoutBeggining = new Date();
        $scope.timer = $interval($scope.tick, 100);
        stepBegging = workoutBeggining;
        $scope.currentExercise = $scope.exercises[0];

        workoutLength = 0;
        for (var i=0,len = $scope.exercises.length; i<len; i++) {
          workoutLength += ($scope.exercises[i].length * speed);
        }
        // ding.currentTime = 0;
        ding.load();
        alternateAlertPlayed = false;
      }
    };

    $scope.endWorkout = function() {
      if (angular.isDefined($scope.timer)) {
        $interval.cancel($scope.timer);
        $scope.timer = undefined;
        workoutBeggining = undefined;
        stepBegging = undefined;
        index = 0;
        $scope.currentExerciseProgress = 0;
        $scope.overallProgress = 0;
        $scope.currentExercise = $scope.exercises[0];
      }
    };

    $scope.tick = function() {
      var now = new Date();
      var elapsed = now.getTime() - workoutBeggining.getTime();
      var stepElapsed = now.getTime() - stepBegging.getTime();
      $scope.overallProgress = elapsed * 100/ workoutLength;
      if ( stepElapsed > ($scope.currentExercise.length * speed) ) {
        ding.currentTime = 0;
        ding.play();
        $scope.currentExerciseProgress = 0;
        if ( index < $scope.exercises.length - 1 ) {
          index += 1;
          $scope.currentExercise = $scope.exercises[index];
          stepBegging = now;
        } else {
          $scope.endWorkout();
        }
      } else {
        $scope.currentExerciseProgress = stepElapsed * 100/ ($scope.currentExercise.length * speed);
        if($scope.currentExercise.alternateSides && $scope.currentExerciseProgress >= 50 && !alternateAlertPlayed){
          ding.currentTime = 0;
          ding.play();
          alternateAlertPlayed = true;
        }
      }
    };

    $scope.toggleSpeed = function() {
      if (speed === 100 ) { speed = 1000; }
      else { speed = 100; }
    };
  });
