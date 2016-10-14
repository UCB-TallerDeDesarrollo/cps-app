angular.module('starter.controllers').controller('UnsolvedProblemCtrl', function($scope, UnsolvedProblemFactory, $cordovaSQLite, $state, $ionicActionSheet,$ionicListDelegate, $ionicPopup, $ionicModal, $stateParams) {
  $scope.unsolvedProblem = {};
  $scope.shouldShowReorder = false;

  $scope.updateUnsolvedProblems = function(callback){
    UnsolvedProblemFactory.all(function(result){
      $scope.unsolvedProblems = result;
    });
  };

  $scope.moveItem = function(unsolvedProblem, fromIndex, toIndex) {
    var greaterIndex, lesserIndex, unsolvedProblemOrderModifier;
    $scope.unsolvedProblems[fromIndex].unsolved_order = toIndex;
    if(fromIndex > toIndex){
      greaterIndex = fromIndex;
      lesserIndex = toIndex;
      unsolvedProblemOrderModifier = 1;
    }
    else{
      greaterIndex = toIndex + 1;
      lesserIndex = fromIndex;
      unsolvedProblemOrderModifier = -1;
    }
    for(var i = lesserIndex; i < greaterIndex; i++ ){
      UnsolvedProblemFactory.update({
        description: $scope.unsolvedProblems[i].description,
        unsolved_order: (i + unsolvedProblemOrderModifier),
        id: $scope.unsolvedProblems[i].id
      });
    }
    UnsolvedProblemFactory.update({
      description: $scope.unsolvedProblems[fromIndex].description,
      unsolved_order: toIndex,
      id: $scope.unsolvedProblems[i].id
    });
    $scope.unsolvedProblems.splice(fromIndex, 1);
    $scope.unsolvedProblems.splice(toIndex, 0, unsolvedProblem);
  };

  $scope.createUnsolvedProblem = function() {
    if (!inputFieldIsEmpty($scope.unsolvedProblem.description)) {
      $scope.unsolvedProblem.unsolved_order = $scope.unsolvedProblems.length;
      UnsolvedProblemFactory.insert($scope.unsolvedProblem);
      $scope.unsolvedProblem = {};
      $scope.updateUnsolvedProblems();
      $scope.closeModalCreate();
    }
  };

  $scope.editUnsolvedProblem = function(unsolvedProblem){
    $scope.unsolvedProblemToEdit = unsolvedProblem;
    $scope.editableUnsolvedProblem = angular.copy(unsolvedProblem);
    $scope.openModalEdit();
  };

  $scope.saveUnsolvedProblemChanges = function(){
    if (!inputFieldIsEmpty($scope.editableUnsolvedProblem.description)) {
      UnsolvedProblemFactory.update($scope.editableUnsolvedProblem);
      $scope.modalEdit.hide();
      $scope.editableUnsolvedProblem = {};
      $scope.updateUnsolvedProblems();
    }
  };

  $scope.childsConcernsFlag = function(unsolvedProblem){
      var query ="SELECT COUNT(*) AS childsCount FROM childs_concerns where unsolved_problem_id = ?";
      $cordovaSQLite.execute(db,query,[unsolvedProblem.id])
        .then( function(result) {
          $scope.childsFlag = result.rows.item(0).childsCount;
      });
  };

  $scope.adultsConcernsFlag = function(unsolvedProblem){
    var query ="SELECT COUNT(*) adultsCount FROM adults_concerns where unsolved_problem_id = ?";
    $cordovaSQLite.execute(db,query,[unsolvedProblem.id])
      .then( function(result) {
        $scope.adultsFlag = result.rows.item(0).adultsCount;
    });
  };

  $scope.openUnsolvedProblem = function(unsolvedProblem){
    $state.go('app.showUnsolvedProblem',{ unsolvedProblemId: unsolvedProblem.id});
  };

  $scope.openStep2 = function(unsolvedProblem){
    $state.go('app.defineTheProblem',{ childConcernId: unsolvedProblem.id});
  };

  $ionicModal.fromTemplateUrl('templates/unsolvedProblems/create-unsolved-problem-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
    $scope.closeModalCreate();
  });
  $scope.openModalCreate = function() {
    $scope.modalCreate.show();
  };
  $scope.closeModalCreate = function() {
    $scope.modalCreate.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalCreate.remove();
  });

  $ionicModal.fromTemplateUrl('templates/unsolvedProblems/edit-unsolved-problem-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalEdit = modal;
    $scope.closeModalEdit();
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

  $scope.childsFlag = 0;
  $scope.adultsFlag = 0;
  $scope.showActionsheet = function(unsolvedProblem) {
    $scope.adultsConcernsFlag(unsolvedProblem);
    $scope.childsConcernsFlag(unsolvedProblem);
    $ionicActionSheet.show({
      buttons: [
        { text: 'Step 1: Empathy Step' },
        { text: 'Step 2: Define the problem' },
        { text: 'Step 3: Invitation step' }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        $ionicListDelegate.closeOptionButtons();
      },
      buttonClicked: function(index) {

        if(index === 0){
          $scope.openUnsolvedProblem(unsolvedProblem);
        }
        if(index == 1){
          if($scope.childsFlag === 0){
            var alertPopup = $ionicPopup.alert({
               title: 'Step 2 wasn\'t unlocked.',
               template: 'You have to finish previous steps to continue.'
             });
             alertPopup.then(function(res) {
             });
          }else {
            $scope.openStep2(unsolvedProblem);
          }
        }
        if(index==2){
          if($scope.childsFlag === 0 || $scope.adultsFlag === 0){
            var alertPopupForUnsolved = $ionicPopup.alert({
               title: 'Step 3 wasn\'t unlocked.',
               template: 'You have to finish previous steps to continue.'
             });
             alertPopupForUnsolved.then(function(res) {
             });
          }else {
          }
        }
        $ionicListDelegate.closeOptionButtons();

        return true;

      },
      destructiveButtonClicked: function() {
        $scope.showConfirm(unsolvedProblem);
        $ionicListDelegate.closeOptionButtons();

        return true;
      }
    });
  };

  $scope.editSolution = function(solution) {
    $state.go('app.editSolution',{ solutionId: solution.id});
  };

  $scope.delete = function(item) {
      var query = "DELETE FROM unsolved_problems where id = ?";
      $cordovaSQLite.execute(db, query, [item.id]).then(function(res) {
          $scope.unsolvedProblems.splice($scope.unsolvedProblems.indexOf(item), 1);
      }, function (err) {
          console.error(err);
      });
   };

   $scope.showConfirm = function(item) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Unsolved Problem',
       template: 'Are you sure you want to delete this unsolved problem?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.delete(item);
       }
     });
   };
});
