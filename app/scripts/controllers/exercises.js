'use strict';

angular.module('HICTApp')
  .controller('ExercisesCtrl', function ($scope, $http, $interval, $modal, $log) {
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

    $scope.repetitions = 0;

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
      var db = openDatabase('hict', '1.0', 'tracking workouts over time', 2 * 1024 * 1024);
      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS workouts (date integer)');
        var now = new Date();
        tx.executeSql('INSERT INTO workouts (date) VALUES (?)', [now.getTime()]);
      });
      $scope.showDecision();
    };

    $scope.tick = function() {
      var now = new Date();
      var elapsed = now.getTime() - workoutBeggining.getTime();
      var stepElapsed = now.getTime() - stepBegging.getTime();
      $scope.overallProgress = elapsed * 100/ workoutLength * 1000 / speed;
      if ( stepElapsed > ($scope.currentExercise.length * speed) ) {
        ding.currentTime = 0;
        ding.play();
        $scope.currentExerciseProgress = 0;
        if ( index < $scope.exercises.length - 1 ) {
          index += 1;
          $scope.currentExercise = $scope.exercises[index];
          stepBegging = now;
        } else {
          $scope.repetitions += 1;
          $scope.endWorkout();
        }
      } else {
        $scope.currentExerciseProgress = stepElapsed * 100 / ($scope.currentExercise.length * speed);
        if($scope.currentExercise.alternateSides && $scope.currentExerciseProgress >= 50 && !alternateAlertPlayed){
          ding.currentTime = 0;
          ding.play();
          alternateAlertPlayed = true;
        }
      }
    };

    $scope.showDecision = function() {
      var modal = $modal.open({
        templateUrl: 'partials/decision.html',
        backdrop: 'static',
        controller: 'ModalCtrl'
      });

      modal.result.then(function(){
        //close
      }, function() {
        //dismiss
        $scope.startWorkout();
      });
    };
  });

angular.module('HICTApp')
  .controller('ModalCtrl', function ($scope, $modalInstance) {
    $scope.done = function() {
      $scope.calendar = true;
      $scope.calculateWeeklyReps();
    };

    $scope.again = function() {
      $modalInstance.dismiss('repeat');
    };

    $scope.close = function() {
      $modalInstance.close('finished');
    };

    $scope.calculateWeeklyReps = function () {
      var date, now, begginingOfWeek, tempDate, aMonthAgo;
      var db = openDatabase('hict', '1.0', 'tracking workouts over time', 2 * 1024 * 1024);
      db.transaction(function(tx) {
        // tx.executeSql('DROP TABLE workouts');
        tx.executeSql('CREATE TABLE IF NOT EXISTS workouts (date integer)');
        now = new Date();
        tempDate = now;
        tempDate.setHours(0);
        tempDate.setMinutes(0);
        tempDate.setSeconds(0);
        tempDate.setMilliseconds(0);
        begginingOfWeek = tempDate - (24 * 60 * 60 * 1000 * now.getDay() ); // rewind date to midnight of sunday
        tx.executeSql('SELECT * FROM workouts WHERE date > ?', [begginingOfWeek], function(tx, results) {
          for(var i=0, len = results.rows.length; i<len; i++){
            date = new Date(results.rows.item(i).date);
            $scope.days[date.getDay()].reps += 1;
          }
          $scope.$apply();
        });
        aMonthAgo = now - (24 * 60 * 60 * 1000 * 31);
        tx.executeSql('DELETE FROM workouts WHERE date < ?', [aMonthAgo], function(tx, results) {
          // no-op
        });
      });
    };

    $scope.days = [
      { name: 'Sun', reps: 0 },
      { name: 'Mon', reps: 0 },
      { name: 'Tues', reps: 0 },
      { name: 'Wed', reps: 0 },
      { name: 'Thur', reps: 0 },
      { name: 'Fri', reps: 0 },
      { name: 'Sat', reps: 0 }
    ];
  });
