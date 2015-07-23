angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicUser, $state, $ionicPopup) {
    $scope.loginData = {};

    $scope.doLogin = function () {
        new Firebase("https://amber-inferno-7387.firebaseio.com/account")
          .orderByChild("username")
          .equalTo($scope.loginData.username)
          .once("value", function (snap) {
              user = snap.val();
              if (user != null) {
                  //user found
                  for (var first in user) {
                      if (user[first].password == CryptoJS.SHA1($scope.loginData.password)) {
                          $ionicUser.identify({
                              user_id: first,
                              user_name: user[first].name,
                              user_role: user[first].role
                          });
                          $state.go("app.room");
                      }
                  }
              } else {
                  //user not found
                  var alertPopup = $ionicPopup.alert({
                      title: 'User not found',
                      template: 'Make sure username and password typed correctly'
                  });
              } //end if user not found
          }) // end firebase ref once
    }; // end do login
}) // end LoginCtrl

.controller('RoomCtrl', ["$scope", "$ionicPopup", "getRooms", "$ionicUser",
    function ($scope, $ionicPopup, getRooms, $ionicUser) {
        $scope.data = {};
        $scope.rooms = getRooms;

        $scope.addRoom = function () {
            $ionicPopup.show({
                template: '<input type="text" ng-model="data.roomName">',
                title: 'Create room',
                subTitle: 'Please write new room name',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  {
                      text: '<b>Create</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                          if (!$scope.data.roomName) {
                              // null exception
                              e.preventDefault();
                          } else {
                              // create new room
                              $scope.rooms.$add({
                                  room_name: $scope.data.roomName
                              });
                              $scope.data.roomName = "";
                          }
                      }
                  }
                ]
            });
        }
    }
])

.controller('ChatCtrl', ["$scope", "chatMessages", "$ionicUser", "$ionicScrollDelegate", "$stateParams", "getRoom",
  function ($scope, chatMessages, $ionicUser, $ionicScrollDelegate, $stateParams, getRoom) {
      $scope.newMessage = "";
      
      $scope.titleBar = getRoom($stateParams.room_id).$value;
      $scope.messages = chatMessages("asdf");
      

      $scope.submitAddMessage = function () {
          $scope.messages.$add({
              user_name: $ionicUser.get().user_name,
              created_at: Firebase.ServerValue.TIMESTAMP,
              content: $scope.newMessage,
          });
          $scope.newMessage = "";
          $ionicScrollDelegate.scrollBottom(true);
      };
  }
])

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});