// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // db = $cordovaSQLite.openDB({ name: "my.db" }); // plaftorm specific
    db = window.openDatabase("sqlite","1.0","./db/CPSdatabase",2000);
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.laggingSkills', {
    url: '/laggingSkills',
    views: {
      'menuContent': {
        templateUrl: 'templates/laggingSkills.html',
        controller: 'LaggingSkillsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/selectUnsolvedProblems/:laggingSkillId',
    views: {
      'menuContent': {
        templateUrl: 'templates/selectUnsolvedProblems.html',
        controller: 'LaggingSkillCtrl'
      }
    }
  })

  .state('app.newUnsolvedProblem', {
      url: '/unsolvedProblems/new',
      views: {
        'menuContent': {
          templateUrl: 'templates/newUnsolvedProblem.html',
          controller: 'UnsolvedProblemCtrl'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/laggingSkills');
});
