angular.module('starter.controllers')
.controller('AdultConcernsCrtl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $stateParams, $ionicListDelegate,$ionicTabsDelegate, $timeout, UnsolvedProblemFactory, ChildConcernFactory, AdultConcernFactory,$ionicSideMenuDelegate){
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
    if(localStorage.getItem("showAdultsConcernHint") === null){
        localStorage.setItem("showAdultsConcernHint", true);
        var confirmPopup = $ionicPopup.alert({
          title: "After you've listed all of your concerns, click the arrow to move on to the invitation step"
        });
     }
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
  };

  $scope.showDeleteConfirmationPopup = function(adultsConcern) {
    var confirmPopup = $ionicPopup.confirm({
      title: "Delete Adult's Concern",
      template: "Are you sure you want to delete this adult's concern?"
    });

    confirmPopup.then(function(res) {
      if(res){
        $scope.deleteAdultsConcern(adultsConcern);
      }
    });
  };

  $scope.deleteAdultsConcern = function(adultsConcern) {
    AdultConcernFactory.delete(adultsConcern,function(){
      $scope.adultsConcerns.splice($scope.adultsConcerns.indexOf(adultsConcern), 1);
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

  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(1,10));});

});
