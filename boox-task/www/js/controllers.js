angular.module('starter.controllers', [])

.controller('EditTaskCtrl', ["$scope", "$stateParams", "GetTask", "$state",
  function($scope, $stateParams, GetTask, $state) {
    $scope.input = {};
    var status = false;
    var ref;
    
    if ($stateParams.taskId == 0) {
      ref = new Firebase("https://radiant-simple-chat.firebaseio.com/task");
      $scope.action = "Create New";
    } else {
      $scope.input = GetTask($stateParams.taskId);
      $scope.action = "Edit";
    }
    
    $scope.editTask = function() {
      if ($stateParams.taskId == 0) {
        ref.push({
          subject: $scope.input.subject,
          description: $scope.input.description,
          location: $scope.input.location,
          time: $scope.input.time,
          status: status
        });
      } else {
        $scope.input.$save();
      }

      $state.go("tab.task");
    }
  }
])

.controller('TaskCtrl', ['$scope',"GetTasks",
  function($scope, GetTasks) {
    
    $scope.tasks = GetTasks(false);

    $scope.remove = function(task) {
      $scope.tasks.$remove(task);
    }
  }
])

.controller('DoneCtrl', ['$scope',"GetTasks",
  function($scope, GetTasks) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    
    $scope.tasks = GetTasks(true);

    $scope.remove = function(task) {
      $scope.tasks.$remove(task);
    }
  }
])

.controller('DetailCtrl', ["$scope","$stateParams", "GetTask",
  function($scope, $stateParams, GetTask) {
    $scope.task = GetTask($stateParams.taskId);
  }
])
