angular.module('starter.controllers')
.controller('mainHelpController', function($scope, $state, HelpInformationFactory){
  $scope.searchWord = '';
  $scope.searchResults = {
      step1: [],
      step2: [],
      step3: [],
      faq: [],
  };
  var step1Help = [];
  var step2Help = [];
  var step3Help = [];
  var faq = [];

  $scope.getHelpInfo = function(){
    HelpInformationFactory.getStep1Help(function(helpInfo){
      step1Help = helpInfo;
    });

    HelpInformationFactory.getStep2Help(function(helpInfo){
      step2Help = helpInfo;
    });

    HelpInformationFactory.getStep3Help(function(helpInfo){
      step3Help = helpInfo;
    });

    HelpInformationFactory.getFAQs(function(helpInfo){
      faq = helpInfo;
    });
  };
  $scope.googleAnalyticsForMainHelp = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Main Help view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };

  $scope.getHelpInfo();

  $scope.goToHelpStep2 = function(searchWord){
    $state.go('app.helpDefineAdultsConcern', {searchWord: searchWord});
  };

  $scope.search = function(){
    $scope.searchResults = {
        step1: [],
        step2: [],
        step3: [],
        faq: [],
    };
    if($scope.searchWord === '') return;
    var re = new RegExp($scope.searchWord.toLowerCase());
    for(var i = 0; i < step2Help.length; i++){
      if(step2Help[i].title.toLowerCase().match(re) || step2Help[i].content.toLowerCase().match(re)){
        $scope.searchResults.step2.push(step2Help[i]);
      }
    }

    for(i = 0; i < faq.length; i++){
      if(faq[i].question.toLowerCase().match(re) || faq[i].answer.toLowerCase().match(re)){
        $scope.searchResults.faq.push(faq[i]);
      }
    }

    for (i = 0; i < step1Help.length; i++) {
      for (j = 0; j < step1Help[i].topics.length; j++) {
        if(step1Help[i].topics[j].contents){
          for (var k = 0; k < step1Help[i].topics[j].contents.length; k++) {
            if(step1Help[i].topics[j].contents[k].description.toLowerCase().match(re)){
              $scope.searchResults.step1.push({
                description: step1Help[i].topics[j].contents[k].description,
                topicId: step1Help[i].topics[j].id,
                categoryId: step1Help[i].id,
                link: step1Help[i].topics[j].contents[k].link || ''
              });
            }
          }
        }
      }
    }

    for (i = 0; i < step3Help.length; i++) {
      for (j = 0; j < step3Help[i].topics.length; j++) {
        if(step3Help[i].topics[j].description.toLowerCase().match(re)){
          $scope.searchResults.step3.push(step3Help[i].topics[j].description);
        }
      }
    }
  };
  $scope.$watch('searchWord', function(){
    $scope.search();
  });
});
