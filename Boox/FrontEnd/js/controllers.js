angular.module('controllers',[])

.controller('HomeController',
    ['$scope', 'HomeService',
    function ($scope, HomeService) {
        HomeService.GetSecureData(function (response) {
            $scope.secureData = response.secureData;
        });
    }])

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }])

.controller('PostController', function ($scope, $routeParams, Posts, Notification) {
    $scope.posts = {};
    $scope.notification = {};

    //var ref = new Firebase("https://amber-inferno-7387.firebaseio.com/notification");
    //ref.orderByChild("flag").equalTo("false").on("value", function (snapshot) {
    //    console.log("masuk sini");
    //    $scope.notification.display = true;
    //    $scope.notification.content = snapshot.val();
    //});

    Notification.Unread(function (data) {
        var notif = Object.keys(data).length;
        if (notif > 0) {
            $scope.notification.display = true;
            $scope.notification.content = Object.keys(data).length;
        }
        $scope.$apply();
    });


    if ($routeParams.id == null) {
        //multiple post
        Posts.GetAll(function (response) {
            $scope.posts = response;
        });
    } else {
        //single post
        Posts.Get($routeParams.id, function (response) {
            var buffer = [];
            buffer[0] = response;
            $scope.posts = buffer;
        });
    }
})

.controller('EditController', function ($scope, SendPost) {

    $scope.sendData = function () {
        var input = '\'{ "post_content" : "' + $scope.content + '"}\'';
        SendPost(input);
    };
})