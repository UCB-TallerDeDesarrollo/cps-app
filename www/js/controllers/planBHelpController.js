angular.module('starter.controllers')
.controller('planBHelpCtrl', function($scope, AppTools, $stateParams){
  $scope.searchWord = '';
  $scope.step2helps = [
    {
      title:"DEFINE THE PROBLEM STEP | INGREDIENT/GOAL",
      topics: [
        { content:"Enter the concern of the second party (often the adult) into consideration" }
      ]
    },
    {
      title:"WORDS | Initial Inquiry (neutral observation)",
      topics: [
        { content:"The thing is (insert adult concern)… or My concern is (insert adult concern)…" }
      ]
    },
    {
      title:"WHAT YOU'RE THINKING",
      topics: [
        { content:"Have I been clear about my concern? Does the child understand what I have said?" }
      ]
    },
    {
      title:"DON'T",
      topics: [
        { content:"Start talking about solutions yet. Sermonize, judge, lecture, use sarcasm" }
      ]
    },
    {
      title:"Help Topics",
      topics: [
        {
          title: "I’m not sure how to word my concern",
          content: "Most adult concerns fall into one of two categories:\n1. How the problem is affecting the kid.\n2. How the problem is affecting others"
        },
        {
          title: "My child is having difficulty hearing my concerns",
          url: "http://www.blogtalkradio.com/dr-ross-greene/2011/04/12/parenting-challenging-kids-collaborative-problem-solving-at-home"
        }
      ]
    }
  ];

  $scope.searchInit = function(){
    if($stateParams.searchWord){
      $scope.searchWord = $stateParams.searchWord;
    }
  };

  $scope.isContentShown = function(content) {
    return $scope.shownContent === content;
  };

  $scope.toggleContent = function(content) {
    if ($scope.isContentShown(content)) {
      $scope.shownContent = null;
    }
    else {
      $scope.shownContent = content;
    }
  };

  $scope.browserInstance = {};
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'
  });
});
