angular.module('starter.controllers')
.controller('AdultConcernsCrtl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $stateParams, $ionicListDelegate,$ionicTabsDelegate, $timeout, UnsolvedProblemFactory, ChildConcernFactory, AdultConcernFactory,$ionicSideMenuDelegate,$translate, $http){
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.adultsConcerns = {};
  $scope.adultsConcern = {description:""};
  ChildConcernFactory.all($stateParams.unsolvedProblemId,function(result){
    $scope.childsConcerns = result;
  });
  AdultConcernFactory.all($stateParams.unsolvedProblemId,function(result){
    $scope.adultsConcerns = result;
    $scope.firstItemAnimationShown = false;
  });

  $scope.findUnsolvedProblem = function() {
    UnsolvedProblemFactory.find($stateParams.unsolvedProblemId, function(result){
      $scope.unsolvedProblem = result.rows.item(0);
    });
  };
  $scope.showAdultsConcernHint = function() {
    $translate(['MoveToInvitationStep']).then (function(translations){
      if(localStorage.getItem("showAdultsConcernHint") === null){
          localStorage.setItem("showAdultsConcernHint", true);
          var confirmPopup = $ionicPopup.alert({
            title: translations.MoveToInvitationStep
          });
      }
    });
  };
  $scope.createAdultsConcern = function(){
    if (!inputFieldIsEmpty($scope.adultsConcern.description)) {
      $scope.adultsConcern.unsolvedProblemId = $stateParams.unsolvedProblemId;
      AdultConcernFactory.insert($scope.adultsConcern);
      if(typeof analytics !== 'undefined') {
        analytics.trackEvent('Unsolved problem', 'create')
      } else {
        console.log("Google Analytics Unavailable");
      }
      $scope.modalCreate.hide();
      $state.go('app.defineTheProblem');
      $scope.adultsConcern.description = "";
      AdultConcernFactory.all($stateParams.unsolvedProblemId,function(result){
        $scope.adultsConcerns = result;
      });
    }
  };

  $scope.editAdultsConcern = function(adultsConcern){
    $scope.auxForUpdateAdultsConcernPair=adultsConcern;
    $scope.editableAdultsConcern = angular.copy(adultsConcern);
    $scope.openModalEdit();
  };

  $scope.updateAdultsConcern = function(){

    if (!inputFieldIsEmpty($scope.editableAdultsConcern.description)) {
      AdultConcernFactory.update($scope.editableAdultsConcern);
      $scope.modalEdit.hide();
      $scope.adultsConcerntoEdit = {};
      AdultConcernFactory.all($stateParams.unsolvedProblemId,function(result){
        $scope.adultsConcerns = result;
      });
    }
    else {
      $scope.emptyInput = true;
    }

      AdultConcernFactory.getPair(function(respAux){
        $scope.resp=respAux;
        for(i=0;i<$scope.resp.length;i++) {

          if($scope.resp[i].description2 === $scope.auxForUpdateAdultsConcernPair.description)
          {
                $scope.adultsConcernPair=$scope.resp[i];

                      AdultConcernFactory.updateAdultsConcernPair($scope.editableAdultsConcern.description,$scope.adultsConcernPair);

            }


        }

      });



  };

  $scope.showDeleteConfirmationPopup = function(adultsConcern) {
    $translate(['DeleteAdultConcernTitle','DeleteAdultConcernTemplate','CancelOption','YesMessage']).then (function(translations){
      var confirmPopup = $ionicPopup.confirm({
        title: translations.DeleteAdultConcernTitle,
        template: translations.DeleteAdultConcernTemplate,
        cancelText: translations.CancelOption,
        okText: translations.YesMessage
      });

      confirmPopup.then(function(res) {
        if(res){
          $scope.deleteAdultsConcern(adultsConcern);
        }
      });
    });
  };

  $scope.deleteAdultsConcern = function(adultsConcern) {
    AdultConcernFactory.delete(adultsConcern,function(){
      $scope.adultsConcerns.splice($scope.adultsConcerns.indexOf(adultsConcern), 1);
    });
    AdultConcernFactory.getPair(function(auxPair){
     for(i=0;i<auxPair.length;i++) {
       if(auxPair[i].description2 === adultsConcern.description)
       {
           $scope.adultsConcernPair=auxPair[i];
          AdultConcernFactory.deleteAdultsConcernPair($scope.adultsConcernPair);
       }
     }

   });
  };

  $ionicModal.fromTemplateUrl('templates/adultsConcerns/create-adults-concern-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
    $scope.modalCreate.hide();
  });
  $scope.openModal = function() {
    $scope.modalCreate.show();
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Create adult concern view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };
  $scope.closeModal = function() {
    $scope.modalCreate.hide();
    $ionicListDelegate.closeOptionButtons();
    $scope.adultsConcern = {description:""};
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

  $ionicModal.fromTemplateUrl('templates/adultsConcerns/edit-adults-concern-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalEdit = modal;
    $scope.modalEdit.hide();
  });
  $scope.openModalEdit = function() {
    $scope.modalEdit.show();
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Edit adult concern view');
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

  $scope.selectTabWithIndex = function(index) {
    if(index === 0){
      $ionicTabsDelegate.select(index);
      $state.go('app.showUnsolvedProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
    }
    if(index == 1){
      if($scope.childsConcerns.length === 0){
        var alertPopup = $ionicPopup.alert({
           title: 'Step 2 wasn\'t unlocked.',
           template: 'You have to finish previous steps to continue.'
         });
         alertPopup.then(function(res) {
         });
      }else {
        $ionicTabsDelegate.select(index);
        $state.go('app.defineTheProblem',{ unsolvedProblemId: $scope.unsolvedProblem.id});
      }
    }
    if(index==2){
      if($scope.adultsConcerns.length === 0 || $scope.childsConcerns.length === 0){
        var alertPopupForUnsolved = $ionicPopup.alert({
           title: 'Step 3 wasn\'t unlocked.',
           template: 'You have to finish previous steps to continue.'
         });
         alertPopupForUnsolved.then(function(res) {
         });
      }else {
        $state.go('app.invitation',{ unsolvedProblemId: $scope.unsolvedProblem.id});
        $ionicTabsDelegate.select(index);
      }
    }
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
  $scope.unableAnimation = function(){
    $scope.firstItemAnimationShown = true;
  };

  $scope.hideFakeButtons = function() {
    return ( $scope.adultsConcerns.length === 0 || $scope.firstItemAnimationShown );
  };

  $scope.googleAnalyticsView = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView("Define adult's concerns view");
    }else {
      console.log("Google Analytics Unavailable");
    }
  };

  $scope.verifyToGoToStep3 = function(id) {
    $translate(['goingTo','Step', 'InvitationStep','NoMessage','YesMessage','keepDrilling','step3VerifyBody','imSure']).then (function(translations){
      var confirmPopup = $ionicPopup.confirm({
        title: translations.goingTo +" "+ translations.Step + " 3: " +translations.InvitationStep, //translations.goingTo +" "+ translations.Step + " 1: " +translations.EmpathyStep,
        template: translations.step3VerifyBody,
        cancelText: translations.NoMessage+", " + translations.keepDrilling,
        okText: translations.YesMessage + ", "+ translations.imSure
      });
      confirmPopup.then(function(res) {
      if(res) {
       $state.go('app.invitation',{ unsolvedProblemId:id});
      }
      });
   });
  };


  $scope.sharedAdultConcerns;

    $scope.getSharedAdultConcerns = function(user_id,child_id,unsolved_problem_id) {
        $http.get($link_root +"/users/"+user_id+"/children/"+child_id+"/unsolved_problem/"+unsolved_problem_id+"/sharedAdultConcerns", {
            headers: { Authorization: localStorage.getItem("auth_token") }
          })
          .then(data => {
            $scope.sharedAdultConcerns = data.data;
             console.log($scope.sharedAdultConcerns);
          })
          .catch(error => {
            console.log(error.message);
          });
      };

  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(1,10));});

});
