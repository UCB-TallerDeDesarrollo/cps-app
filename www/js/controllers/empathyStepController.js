angular.module('starter.controllers')
.controller('ChildsConcernsCtrl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $ionicListDelegate, $ionicTabsDelegate, $stateParams, $timeout, UnsolvedProblemFactory, ChildConcernFactory,AdultConcernFactory,$ionicSideMenuDelegate, $translate, $http){
  $ionicSideMenuDelegate.canDragContent(false);
    $scope.childsConcern = {
    description: ""
  };

  $scope.unsolvedProblem = {};
  $scope.childsConcerns = {};
  $scope.shouldShowReorder = false;
  $scope.moveItem = function(childsConcern, fromIndex, toIndex) {
    var greaterIndex, lesserIndex, childConcernOrderModifier;
    $scope.childsConcerns[fromIndex].unsolved_order = toIndex;
    if(fromIndex > toIndex){
      greaterIndex = fromIndex;
      lesserIndex = toIndex;
      childConcernOrderModifier = 1;
    }
    else{
      greaterIndex = toIndex + 1;
      lesserIndex = fromIndex;
      childConcernOrderModifier = -1;
    }
    for(var i = lesserIndex; i < greaterIndex; i++ ){
      ChildConcernFactory.update({
        description: $scope.childsConcerns[i].description,
        unsolved_order: (i + childConcernOrderModifier),
        id: $scope.childsConcerns[i].id
      });
    }
    ChildConcernFactory.update({
      description: $scope.childsConcerns[fromIndex].description,
      unsolved_order: toIndex,
      id: $scope.childsConcerns[fromIndex].id
    });
    $scope.childsConcerns.splice(fromIndex, 1);
    $scope.childsConcerns.splice(toIndex, 0, childsConcern);
  };

  AdultConcernFactory.all($stateParams.unsolvedProblemId,function(adultConcerns){
    $scope.adultsConcerns = adultConcerns;
  });

  $scope.updateInformation = function(){
    ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
      $scope.childsConcerns = childConcerns;
      $scope.firstItemAnimationShown = false;
      AdultConcernFactory.all($stateParams.unsolvedProblemId,function(adultConcerns){
        $scope.adultsConcerns = adultConcerns;
      });
    });
  };

  $scope.findUnsolvedProblem = function() {
    UnsolvedProblemFactory.find($stateParams.unsolvedProblemId, function(result){
      $scope.unsolvedProblem = result.rows.item(0);
    });
  };

  $ionicModal.fromTemplateUrl('templates/childsConcerns/create-child-concern-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
    $scope.modalCreate.hide();
  });
  $scope.openModal = function() {
    $scope.modalCreate.show();

    if(typeof analytics !== 'undefined') {
      analytics.trackView('Create childs concern view');
    } else {
        console.log("Google Analytics Unavailable");
    }


  };
  $scope.closeModal = function() {
    $scope.modalCreate.hide();
    $ionicListDelegate.closeOptionButtons();
    $scope.childsConcern = {
      description: ""
    };
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalCreate.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $ionicModal.fromTemplateUrl('templates/childsConcerns/edit-child-concern-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalEdit = modal;
    $scope.modalEdit.hide();
  });
  $scope.openModalEdit = function() {
    $scope.modalEdit.show();
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Edit child concern view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };
  $scope.closeModalEdit = function() {
    $scope.modalEdit.hide();
    $ionicListDelegate.closeOptionButtons();

  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalEdit.remove();
  });
  // Execute action on hide modal
  $scope.$on('modalEdit.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modalEdit.removed', function() {
    // Execute action
  });

  $scope.goUnsolvedProblems = function(){
    $state.go('app.newUnsolvedProblem');
  };
  $scope.goUnsolvedProblemsShared = function() {
    $state.go("app.sharedUnsolvedProblem");
  };
  $scope.verifyToGoToStep2 = function() {
    $translate(['goingTo','Step', 'DefineAdultsConcern','NoMessage','YesMessage','keepDrilling','step2VerifyBody','iHave']).then (function(translations){
    if($scope.adultsConcerns.length === 0){
      var confirmPopup = $ionicPopup.confirm({
        title: translations.goingTo + " "+ translations.Step + " 2: " + translations.DefineAdultsConcern,
        template: translations.step2VerifyBody,
        cancelText: translations.NoMessage+", " + translations.keepDrilling,
        okText: translations.YesMessage + ", "+ translations.iHave
      });

      confirmPopup.then(function(res) {
        if(res) {
          $state.go('app.defineTheProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
        }
      });
    }
    else {
      $state.go('app.defineTheProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
    }
  });
  };
  $scope.selectTabWithIndex = function(index) {
    $translate(['CancelOption','Step','EmpathyStep','DefineAdultsConcern','InvitationStep','wasntUnlock','haveToFinishSteps']).then (function(translations){
    if(index === 0){
      $ionicTabsDelegate.select(index);
      $state.go('app.showUnsolvedProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
    }
    if(index == 1){
      if($scope.childsConcerns.length === 0){
        var alertPopup = $ionicPopup.alert({
          title: translations.Step + " 2 "+ translations.wasntUnlock,
          template: translations.haveToFinishSteps
         });
         alertPopup.then(function(res) {
         });
      }else {
        // $ionicTabsDelegate.select(index);
        $scope.verifyToGoToStep2();
        // $state.go('app.defineTheProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
      }
    }
    if(index==2){
      if($scope.adultsConcerns.length === 0 || $scope.childsConcerns.length === 0){
        var alertPopupForUnsolved = $ionicPopup.alert({
          title: translations.Step + " 3 "+ translations.wasntUnlock,
          template: translations.haveToFinishSteps
         });
         alertPopupForUnsolved.then(function(res) {
         });
      }else {
        $state.go('app.invitation',{ unsolvedProblemId: $scope.unsolvedProblem.id});
        $ionicTabsDelegate.select(index);
      }
    }
  });
  };

  $scope.selectTabWithIndexShared = function(index) {
        if (index === 0) {
          $ionicTabsDelegate.select(index);
          $state.go("app.sharedShowUnsolvedProblem", {
            unsolvedProblemId: $scope.unsolvedProblem.id
          });
        }
        if (index == 1) {
          $ionicTabsDelegate.select(index);
          $state.go("app.sharedDefineTheProblem", {
            unsolvedProblemId: $scope.unsolvedProblem.id
          });
        }
        if (index == 2) {
          $state.go("app.sharedInvitation", {
            unsolvedProblemId: $scope.unsolvedProblem.id
          });
          $ionicTabsDelegate.select(index);
        }
  };
  $scope.editChildsConcern = function(childsConcern){
    $scope.auxForUpdateChildConcernPair=childsConcern;
    $scope.editableChildsConcern = angular.copy(childsConcern);
    $scope.openModalEdit();
    if(typeof analytics !== 'undefined') {
      analytics.trackEvent('Child Concern', 'Edit')
    } else {
      console.log("Google Analytics Unavailable");
    }


  };

  $scope.createChildsConcern = function(){
    if (!inputFieldIsEmpty($scope.childsConcern.description))
    {
      $scope.childsConcern.unsolvedProblemId = $stateParams.unsolvedProblemId;
      $scope.childsConcern.unsolvedOrder = $scope.childsConcerns.length;
      ChildConcernFactory.insert($scope.childsConcern);
      $scope.modalCreate.hide();
      $state.go('app.showUnsolvedProblem',{ unsolvedProblemId: $stateParams.unsolvedProblemId});
      $scope.childsConcern.description = "";
      ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
        $scope.childsConcerns = childConcerns;
      });
    }
  };
  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(0,10));});

  $scope.updateChildsConcern = function(){



    if (!inputFieldIsEmpty($scope.editableChildsConcern.description)) {
      ChildConcernFactory.update($scope.editableChildsConcern);
      $scope.modalEdit.hide();
      $scope.childsConcerntoEdit = {};
      ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
        $scope.childsConcerns = childConcerns;
      });
    }
    else {
      $scope.emptyInput = true;
    }


      ChildConcernFactory.getPair(function(respAux){
      $scope.resp=respAux;
        for(i=0;i<$scope.resp.length;i++) {
          if($scope.resp[i].description === $scope.auxForUpdateChildConcernPair.description)
          {
              $scope.childConcernPair=$scope.resp[i];
             ChildConcernFactory.updateChildsConcernPair($scope.editableChildsConcern.description,$scope.childConcernPair);
          }
        }

      });
  };


  $scope.deleteChildsConcern = function(childConcern) {
    ChildConcernFactory.delete(childConcern,function(){
      $scope.childsConcerns.splice($scope.childsConcerns.indexOf(childConcern), 1);
    });
    ChildConcernFactory.getPair(function(auxPair){
      for(i=0;i<auxPair.length;i++) {
        if(auxPair[i].description === childConcern.description)
        {
            $scope.childConcernPair=auxPair[i];
           ChildConcernFactory.deleteChildsConcernPair($scope.childConcernPair);
        }
      }

    });
 };

 $scope.showConfirmChildsConcern = function(item) {
  $translate(['DeleteChildsConcernTitle','DeleteChildsConcernBody', 'CancelOption','YesMessage']).then (function(translations){
   var confirmPopup = $ionicPopup.confirm({
    title: translations.DeleteChildsConcernTitle,
     template: translations.DeleteChildsConcernBody,
     cancelText: translations.CancelOption,
     okText: translations.YesMessage
   });

   confirmPopup.then(function(res) {
     if(res) {
        $scope.deleteChildsConcern(item);
        if(typeof analytics !== 'undefined') {
          analytics.trackEvent('Child Concern', 'Delete')
        } else {
          console.log("Google Analytics Unavailable");
        }
     }
   });
  });
 };
 $scope.unableAnimation = function() {
   $scope.firstItemAnimationShown = true;
 };
 $scope.hideFakeButtons = function() {
   return ( $scope.childsConcerns.length === 0 || $scope.firstItemAnimationShown );
 };
 $scope.showHint = function() {
  $translate(['ChildsConcernHint', 'CancelOption','OKMessage']).then (function(translations){
   if(localStorage.getItem("showHint") === null){
       localStorage.setItem("showHint", true);
       var confirmPopup = $ionicPopup.alert({
         title: translations.ChildsConcernHint,
         okText: translations.OKMessage
       });
     }
    });
   };
  $scope.googleAnalyticsView = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Empathy step view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };

  $scope.sharedChildConcerns;

    $scope.getSharedChildConcerns = function(user_id,child_id,unsolved_problem_id) {
        $http.get($link_root +"/users/"+user_id+"/children/"+child_id+"/unsolved_problem/"+unsolved_problem_id+"/sharedChildConcerns", {
            headers: { Authorization: localStorage.getItem("auth_token") }
          })
          .then(data => {
            $scope.sharedChildConcerns = data.data;
             console.log($scope.sharedChildConcerns);
          })
          .catch(error => {
            console.log(error.message);
          });
      };

      $scope.empathyStepHint = function(){
        $scope.openModalHint();
        if(typeof analytics !== 'undefined') {
            analytics.trackEvent('Empathy Step Hint', 'Open')
        } else {
            console.log("Google Analytics Unavailable");
        }
      };

      $scope.openModalHint = function() {
        $scope.modalHint.show();
      };

    $ionicModal.fromTemplateUrl('templates/cpsProcess/empathyStepHints.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modalHint = modal;
          $scope.closeModalEdit();
      });
    $scope.closeModalHint = function() {
        $scope.modalHint.hide();
        $ionicListDelegate.closeOptionButtons();
      };

      $scope.goToAlsupHelp = function() {
        $scope.modalHint.hide();
        localStorage.setItem("coming_from_hint","true")
          $state.go("app.helpCategories");
      }
});
