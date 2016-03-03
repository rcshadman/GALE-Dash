// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var host = 'http://192.168.22.164:8000/'; // server API url

var app = angular.module('starter', ['nvd3','ionic','starter.controllers','starter.services'])
.run(function($ionicPlatform,webService) {
  webService.setHost(host);
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  
  $ionicConfigProvider.platform.android.tabs.position('bottom').style('standard')
  // Ionic uses AngularUI Router, which uses the concept of states.
  // Learn more here: https://github.com/angular-ui/ui-router.
  // Set up the various states in which the app can be.
  // Each state's controller can be found in controllers.js.
  $stateProvider


  // Set up an abstract state for the tabs directive:
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'tabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dashboard', {
    url: '/dashboard/:projectId',
    views: {
      'tab-dashboard': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl',
        // resolve: {
        //         projectData: function($stateParams,webService) {
        //         return webService.getProjectById($stateParams.projectId)
        //             }
        //         }
              }
        }
  })

  .state('tab.initialize', {
      url: '/initialize',
      views: {
        'tab-initialize': {
          templateUrl: 'templates/initialize.html',
          controller: 'initializeCtrl'
        }
      }
    })
  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('tab/initialize');

})

.constant('SERVER', {
  // Local server
  // url: 'http://192.168.22.189:8000'

  // Public Heroku server
  // url: 'https://test.ion.com'
})