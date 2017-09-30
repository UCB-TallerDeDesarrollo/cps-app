
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.closePopup' ,'starter.controllers', 'starter.services', 'starter.seed', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, DataSeed, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // db = $cordovaSQLite.openDB({ name: "my.db" }); // plaftorm specific
    db = window.openDatabase("CPSdatabase","1.0","Demo",2000);
    DataSeed.seed($cordovaSQLite, db);
    if(typeof analytics !== 'undefined') {
         analytics.startTrackerWithId("UA-105821683-1");
         analytics.trackEvent('App', 'Start')
    } else {
         console.log("Google Analytics Unavailable");
     }
  });

  $rootScope.state = $state;

})

.config(function($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'yes',
    closebuttoncaption: 'Done'
  };
  $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);

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
        templateUrl: 'templates/defaultUtilities/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/defaultUtilities/browse.html'
        }
      }
  })
  .state('app.childs',{
      url: '/childs',
      views:{
        'menuContent':{
          templateUrl:'templates/child/childs.html',
          controller: 'ChildsCtrl'
        }
      }
  })
  .state('app.mainHelp', {
    url: '/mainHelp',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpMain.html',
        controller: 'mainHelpController'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'TourCtrl'
      }
    }
  })

  .state('app.laggingSkills', {
    url: '/laggingSkills',
    views: {
      'menuContent': {
        templateUrl: 'templates/laggingSkills/laggingSkills.html',
        controller: 'LaggingSkillsCtrl'
      }
    }
  })

  .state('app.newUnsolvedProblem', {
      url: '/unsolvedProblems/new/:laggingSkillsId',
      views: {
        'menuContent': {
          templateUrl: 'templates/unsolvedProblems/newUnsolvedProblem.html',
          controller: 'UnsolvedProblemCtrl'
        }
      }
  })

  .state('app.showUnsolvedProblem', {
    url: '/unsolvedProblem/show/:unsolvedProblemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cpsProcess/empathyStep.html',
        controller: 'ChildsConcernsCtrl'
      }
    }
  })

  .state('app.defineTheProblem', {
    url: '/defineTheProblem/:unsolvedProblemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cpsProcess/defineAdultConcern.html',
        controller: 'DefineTheProblemCtrl'
      }
    }
  })

  .state('app.invitation', {
    url: '/invitation/:unsolvedProblemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cpsProcess/invitationStep.html',
        controller: 'InvitationCtrl'
      }
    }
  })

  .state('app.solution', {
    url: '/solutions/:solutionId',
    views: {
      'menuContent': {
        templateUrl: 'templates/solutionComments/showSolution.html'
      }
    }
  })

  .state('app.planBHelp',{
    url: '/planBHelp',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpCPS.html',
      }
    }
  })
  .state('app.helpCategories',{
    url: '/helpCategories',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpCategories.html',
        controller: 'HelpCategoryCtrl'
      }
    }
  })
  .state('app.helpForInvitation',{
    url: '/helpForInvitation',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpInvitation.html',
      }
    }
  })
  .state('app.helpCategoryTopics',{
    url: '/helpCategoryTopics/:id_category',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpCategoryTopics.html',
        controller: 'HelpCategoryTopicsCtrl'
      }
    }
  })

  .state('app.helpTopicContent', {
    url: '/helpTopicContent/:id_category/:id_topic',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpTopicContent.html',
        controller: 'HelpTopicContentCtrl'
      }
    }
  })
  .state('app.faq',{
      url: '/faq',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/FAQ.html',
        }
      }
    })
  .state('app.faqChallengingKids',{
      url: '/faq/challengingKids',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/challengingKids.html',
        }
      }
    })
  .state('app.faqModel',{
      url: '/faq/model',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/model.html',
        }
      }
    })
  .state('app.faqPlans',{
      url: '/faq/plans',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/plans.html',
        }
      }
    })
  .state('app.faqClassroom',{
      url: '/faq/classroom',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/classroom.html',
        }
      }
    })
  .state('app.faqPoliciesAndPractices',{
      url: '/faq/policiesAndPractices',
      views: {
        'menuContent': {
          templateUrl: 'templates/FAQ/policiesAndPractices.html',
        }
      }
    })
  .state('app.unsolvedTour',{
      url: '/unsolvedProblemTour',
      views: {
        'menuContent': {
          templateUrl: 'templates/appTutorials/unsolved_tour.html'
        }
      }
    })
  .state('app.helpTour',{
      url: '/helpAccessTour',
      views: {
        'menuContent': {
          templateUrl: 'templates/appTutorials/help_tour.html'
        }
      }
    })
  .state('app.tours', {
      url: '/tours',
      views: {
        'menuContent': {
          templateUrl: 'templates/appTutorials/tours.html'
        }
      }
    })
  .state('app.tutorial',{
    url: '/tutorial',
    views: {
      'menuContent': {
        templateUrl: 'templates/appTutorials/mainTutorial.html'
      }
    }
  })
  .state('app.helpDefineAdultsConcern',{
      url: '/mainHelp/helpDefineAdultsConcern',
      params: {
        searchWord: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/appHelps/helpDefineAdultsConcern.html',
        }
      }
    })

  .state('app.alsupHelp',{
    url: '/alsupHelp',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/helpAlsup.html'
      }
    }
  })

  .state('app.inTheHeatOfTheMoment',{
    url: '/inTheHeatOfTheMoment',
    views: {
      'menuContent': {
        templateUrl: 'templates/appHelps/inTheHeatOfTheMoment.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/childs');
})

.filter('orderObjectBy', function() {
  return function(items, field) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
  };
});
