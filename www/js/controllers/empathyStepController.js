angular.module('starter.controllers')
.controller('ChildsConcernsCtrl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $ionicListDelegate, $ionicTabsDelegate, $stateParams, $timeout, UnsolvedProblemFactory, ChildConcernFactory){
  $scope.childsConcern = {
    description: ""
  };

  $scope.unsolvedProblem = {};
  $scope.childsConcerns = [];
  $scope.firstItemAnimationShown = false;
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
      $scope.childsConcerns[i].unsolved_order =i+childConcernOrderModifier;
      ChildConcernFactory.update($scope.childsConcerns[i]);
    }
    $scope.childsConcerns[fromIndex].unsolved_order = toIndex;
    ChildConcernFactory.update($scope.childsConcerns[fromIndex]);
    $scope.childsConcerns.splice(fromIndex, 1);
    $scope.childsConcerns.splice(toIndex, 0, childsConcern);
  };

  $scope.updateChildsConcerns = function(){
    ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
      $scope.childsConcerns = childConcerns;
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
  });
  $scope.openModal = function() {
    $scope.modalCreate.show();
  };
  $scope.closeModal = function() {
    $scope.modalCreate.hide();
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
  });
  $scope.openModalEdit = function() {
    $scope.modalEdit.show();
  };
  $scope.closeModalEdit = function() {
    $scope.modalEdit.hide();
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
  $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $stateParams.unsolvedProblemId);

  $scope.goUnsolvedProblems = function(){
    $state.go('app.newUnsolvedProblem');
  };
  $scope.verifyToGoToStep2 = function() {
    if($scope.adultsConcerns.length === 0){
      var confirmPopup = $ionicPopup.confirm({
        title: "Going to Step 2: Define Adult's Concerns",
        template: "Did you drill enough to get all your child's concerns?",
        cancelText: "No, keep drilling",
        okText: "Yes, I'm sure"
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
  };
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
  $scope.editChildsConcern = function(childsConcern){
    $scope.editableChildsConcern = angular.copy(childsConcern);
    $scope.openModalEdit();
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
      // updateChildsConcern($cordovaSQLite, [$scope.editableChildsConcern.description,$scope.childsConcerntoEdit.id]);
      $scope.modalEdit.hide();
      $scope.childsConcerntoEdit = {};
      ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
        $scope.childsConcerns = childConcerns;
      });
    }
    else {
      $scope.emptyInput = true;
    }
  };
  $scope.deleteChildsConcern = function(childConcern) {
    ChildConcernFactory.delete(childConcern,function(){
      $scope.childsConcerns.splice($scope.childsConcerns.indexOf(childConcern), 1);
    });
 };

 $scope.showConfirmChildsConcern = function(item) {
   var confirmPopup = $ionicPopup.confirm({
     title: "Delete Child's Concern",
     template: "Are you sure you want to delete this child's concern?"
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.deleteChildsConcern(item);
     }
   });
 };
 $scope.unableAnimation = function() {
   $scope.firstItemAnimationShown = true;
 };
 $scope.hideFakeButtons = function() {
   return ( $scope.childsConcerns.length === 0 || $scope.firstItemAnimationShown );
 };
});
