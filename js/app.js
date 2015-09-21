var app = angular.module('app', ['ngCookies', 'ui.router']);

app.run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        //if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        //  $location.path('/login');
        //}
    });
})

// configure our routes
app.config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'tpl/app_dashboard_v1.html',
            controller: ''
        })
        .state('master', {
            url: '/master',
            abstract: true,
            templateUrl: 'tpl/master/layout.html',
        })
        .state('master.creategroup', {
            url: '/group/create',
            templateUrl: 'tpl/master/group/update.html',
            parent: 'master',
            controller: '',
        })
        .state('master.group', {
            url: '/group',
            templateUrl: 'tpl/master/group/index.html',
            controller: '',
        })
        .state('master.role', {
            url: '/role',
            templateUrl: 'tpl/master/role/index.html',
            controller: 'RoleController',
        })
        .state('master.createrole', {
            url: '/role/create',
            templateUrl: 'tpl/master/role/update.html',
            controller: '',
        })
        .state('master.user', {
            url: '/user',
            templateUrl: 'tpl/master/user/index.html',
            controller: '',
        })
        .state('master.createuser', {
            url: '/user/create',
            templateUrl: 'tpl/master/user/update.html',
            controller: '',
        })
        .state('service', {
            url: '/service',
            templateUrl: 'tpl/master/layout.html',
            controller: '',
            abstract: true,
        })
        .state('service.ticket', {
            url: '/ticket',
            templateUrl: 'tpl/service/ticket/index.html'
        })
        .state('service.createticket', {
            url: '/ticket/create',
            templateUrl: 'tpl/service/ticket/update.html'
        })
        .state('service.knowledge', {
            url: '/knowledge',
            templateUrl: 'tpl/service/knowledge/index.html'
        })
        .state('service.createknowledge', {
            url: '/knowledge/create',
            templateUrl: 'tpl/service/knowledge/update.html'
        });
});
