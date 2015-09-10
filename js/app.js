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

    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'tpl/page_signin.html'
        })
        
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'frame.html',
        })

        // Dashboard
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/app_dashboard_v1.html',
                } 
            },
        })

        // Group
        .state('app.group', {
            url: '/group',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/group/index.html',
                }
            },
        })

        .state('app.creategroup', {
            url: '/group/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/group/update.html',
                }
            },
        })
        
        //Role
        .state('app.role', {
            url: '/role',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/role/index.html',
                    controller: 'RoleController',
                }
            },
        })
        .state('app.createrole', {
            url: '/role/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/role/update.html',
                    controller: '',
                }
            },
        })

        //User
        .state('app.user', {
            url: '/user',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/user/index.html',
                    controller: '',
                }
            },
        })
        .state('app.createuser', {
            url: '/user/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/user/update.html',
                    controller: '',
                }
            },
        })

        //Ticket
        .state('app.ticket', {
            url: '/ticket',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/ticket/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createticket', {
            url: '/ticket/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/ticket/update.html',
                    controller: '',
                }
            },
        })

        //Knowledge
        .state('service.knowledge', {
            url: '/knowledge',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/knowledge/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createknowledge', {
            url: '/knowledge/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/knowledge/update.html',
                    controller: '',
                }
            },
        });
});
