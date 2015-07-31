// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 'starter.controllers', 
  'starter.services', 'firebase',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.position("top");
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
  })

  // Each tab has its own nav history stack:

  .state('edit-task', {
    url: '/edit-task/:taskId',
    templateUrl: 'templates/edit-task.html',
    controller: 'EditTaskCtrl'
  })

  .state('tab.task', {
    url: '/task',
    views: {
      'tab-task': {
        templateUrl: 'templates/tab-task.html',
        controller: 'TaskCtrl'
      }
    }
  })

  .state('tab.task-detail', {
      url: '/task/:taskId',
      views: {
        'tab-task': {
          templateUrl: 'templates/detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

  .state('tab.done', {
      url: '/done',
      views: {
        'tab-done': {
          templateUrl: 'templates/tab-done.html',
          controller: 'DoneCtrl'
        }
      }
    })

    .state('tab.done-detail', {
      url: '/done/:taskId',
      views: {
        'tab-done': {
          templateUrl: 'templates/detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/task');

});
