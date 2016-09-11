// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.seed', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, DataSeed) {
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
    db = window.openDatabase("CPSdatabase","1.0","Demo",2000);
    DataSeed.seed($cordovaSQLite, db);
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

  .state('app.editUnsolvedProblem', {
    url: '/unsolvedProblems/edit/:itemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/editUnsolvedProblem.html',
        controller: 'EditUnsolvedProblemCtrl'
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
  })

  .state('app.helpCategories',{
    url: '/helpCategories',
    views: {
      'menuContent': {
        templateUrl: 'templates/helpCategories.html',
        controller: 'HelpCategoryCtrl'
      }
    }
  })

  .state('app.helpCategoryTopics',{
    url: '/helpCategoryTopics/:id_category',
    views: {
      'menuContent': {
        templateUrl: 'templates/helpCategoryTopics.html',
        controller: 'HelpCategoryTopicsCtrl'
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/laggingSkills');
  $urlRouterProvider.otherwise('/app/helpCategories');
});
