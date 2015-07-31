angular.module('BasicHttpAuthExample', [
    'controllers',
    'services',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'templates/login.html'
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'templates/home.html'
        })

        .when('/post', {
            controller: 'PostController',
            templateUrl: 'templates/post.html'
        })

        .when('/post/:id', {
            controller: 'PostController',
            templateUrl: 'templates/post.html'
        })

        .when('/edit', {
            controller: 'EditController',
            templateUrl: 'templates/edit.html'
        })

        .otherwise({ redirectTo: '/login' });

        //$locationProvider.html5Mode(true);
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        /*
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/#/login');
            }
        });
        */
    }]);