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
                    controller: '',
                } 
            },
        })

        /* master URL ------------------------------------------------*/

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

        //Driver
        .state('app.driver', {
            url: '/driver',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/driver/index.html'
                }
            }
        })
        .state('app.createdriver', {
            url: '/driver',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/driver/update.html'
                }
            }
        })

        //Customer
        .state('app.customer', {
            url: '/customer',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/customer/index.html'
                }
            }
        })
        .state('app.createcustomer', {
            url: '/customer/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/customer/update.html'
                }
            }
        })

        //Truck
        .state('app.truck', {
            url: '/truck',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/truck/index.html'
                }
            }
        })
        .state('app.createtruck', {
            url: '/truck/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/truck/update.html'
                }
            }
        })

        //Claim Category
        .state('app.claimcategory', {
            url: '/claimcategory',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/claimcategory/index.html'
                }
            }
        })
        .state('app.createclaimcategory', {
            url: '/claimcategory/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/master/claimcategory/update.html'
                }
            }
        })



        /* service URL ---------------------------------------------*/
        
        //Claim
        .state('app.claim', {
            url: '/claim',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/claim/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createclaim', {
            url: '/claim/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/claim/update.html',
                    controller: '',
                }
            },
        })

        //Fuel
        .state('app.fuel', {
            url: '/fuel',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/fuel/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createfuel', {
            url: '/fuel/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/fuel/update.html',
                    controller: '',
                }
            },
        })

        //Shipment
        .state('app.shipment', {
            url: '/shipment',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/shipment/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createshipment', {
            url: '/shipment/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/shipment/update.html',
                    controller: '',
                }
            },
        })

        //Shipment
        .state('app.trip', {
            url: '/trip',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/trip/index.html',
                    controller: '',
                }
            },
        })
        .state('service.createtrip', {
            url: '/trip/create',
            views: {
                'menuContent': {
                    templateUrl: 'tpl/service/trip/update.html',
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
