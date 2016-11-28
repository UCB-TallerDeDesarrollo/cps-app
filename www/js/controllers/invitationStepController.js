angular.module('starter.controllers').controller('InvitationCtrl', function($scope, $cordovaSQLite, $state, $stateParams, $ionicModal, $ionicPopup, $ionicActionSheet, $ionicTabsDelegate, $timeout, IonicClosePopupService,$ionicListDelegate, ChildConcernFactory, AdultConcernFactory, PossibleSolutionFactory, UnsolvedProblemFactory){
  $scope.solution = { unsolvedProblemId: $stateParams.unsolvedProblemId };
  $scope.solutions = [];
  UnsolvedProblemFactory.find($stateParams.unsolvedProblemId,function(result){
    $scope.unsolvedProblem = result.rows.item(0);
    ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
      $scope.childsConcerns = childConcerns;
    });
    AdultConcernFactory.all($stateParams.unsolvedProblemId,function(result){
      $scope.adultsConcerns = result;
    });
    PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
      $scope.solutions = res;
      $scope.firstItemAnimationShown = false;
    });
  });

  $scope.showChilds=false;
  $scope.showAdults=false;
  $scope.shouldShowReorder = false;

  $scope.toggleChilds= function(){
    if($scope.showChilds===true){
      $scope.showChilds=false;
    }
    else{
      $scope.showChilds=true;
    }
  };
  $scope.toggleAdults= function(){
    if($scope.showAdults===true){
      $scope.showAdults=false;
    }
    else{
      $scope.showAdults=true;
    }
  };
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
    findChildsConcerns();
  };

  $scope.createSolution = function() {
    if (!inputFieldIsEmpty($scope.solution.description)) {
      $scope.solution.rating=0;
      PossibleSolutionFactory.insert($scope.solution);
      $scope.solution.description = "";
      $scope.closeModal();
      PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
        $scope.solutions = res;
      });
    }
  };

  $scope.showDeletionConfirm = function(solution) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Solution',
      template: 'Are you sure you want to delete this solution?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.deleteSolution(solution);
      }
    });
  };
  $scope.deleteSolution = function (solution) {
    PossibleSolutionFactory.delete(solution.id, function(){
      $scope.solutions.splice($scope.solutions.indexOf(solution), 1);
    });
  };
  $scope.editSolution = function(solution){
    $scope.solutionEdit = solution;
    $scope.editableSolution = {
      description: solution.description,
      id: solution.id
    };
    $scope.openModalEdit();
  };
  $scope.updateSolution = function(){
    if (!inputFieldIsEmpty($scope.editableSolution.description)) {
      PossibleSolutionFactory.update($scope.editableSolution);
      $scope.modalEdit.hide();
      $scope.solutionEdit = {};
      PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
        $scope.solutions = res;
      });
    }
    else {
      $scope.emptyInput = true;
    }
  };
  $ionicModal.fromTemplateUrl('create-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCreate = modal;
    $scope.modalCreate.hide();
  });
  $scope.openModal = function() {
    $scope.modalCreate.show();
  };
  $scope.closeModal = function() {
    $scope.modalCreate.hide();
    $ionicListDelegate.closeOptionButtons();

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
  $ionicModal.fromTemplateUrl('edit-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalEdit = modal;
    $scope.modalEdit.hide();
  });
  $scope.openModalEdit = function() {
    $scope.modalEdit.show();
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
  function findUnsolvedProblem() {
    // var query ="SELECT u.id, u.description FROM unsolved_problems AS u, childs_concerns AS c, adults_concerns AS a WHERE u.id = c.unsolved_problem_id AND c.id = a.child_concern_id AND a.id = ?";
    var query ="SELECT * FROM unsolved_problems WHERE id = ?";
    $cordovaSQLite.execute(db,query,[$stateParams.unsolvedProblemId])
      .then( function(result) {
        $scope.unsolvedProblem = result.rows.item(0);
    },function(error){console.log(error);});
  }

  //function here
  $scope.showRatingPopup = function(solution,unsolvedProblem) {
    var myPopup = $ionicPopup.show({
    title: 'Rate the Solution',
    subTitle: 'You can rate it by clicking one of the buttons below',
    buttons: [
      { type: 'button-assertive ion-sad-outline ',
        onTap: function(e) {
          $scope.showConfirmWorstRate(solution,1,unsolvedProblem);
        }
      },
      { type: 'button-energized ion-heart-broken' ,
        onTap: function(e) {
          $scope.RateSolution(solution,2);
          $scope.BestRate(unsolvedProblem);
        }
      },
      { type: 'button-balanced ion-heart' ,
        onTap: function(e) {
          $scope.RateSolution(solution,3);
          $scope.BestRate(unsolvedProblem);
        }
      },
      { type: 'button-calm ion-happy-outline',
        onTap: function(e) {
          $scope.showConfirmBestRate(solution,4,unsolvedProblem);
        }
      }
    ]
  });
  IonicClosePopupService.register(myPopup);

  $scope.showConfirmBestRate = function(solution,rate,unsolvedProblem) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Best Rate for this solution',
      template: 'Are you sure that this solution solved the unsolved problem?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,rate);
        $scope.BestRate(unsolvedProblem);
      }
    });
  };

  $scope.showConfirmWorstRate = function(solution,rate,unsolvedProblem) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Worst Rate for this solution',
      template: 'Are you sure that this solution dont help to solve the unsolved problem?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,rate);
        $scope.BestRate(unsolvedProblem);
      }
    });
  };

  };

  $scope.RateSolution = function(solution, rate){
    var query = "UPDATE solutions SET rating = ? Where id = ?";
    $cordovaSQLite.execute(db, query, [rate, solution.id]);
    PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
      $scope.solutions = res;
    });
    $state.go('app.invitation');
  };

  $scope.BestRate = function(unsolvedProblem){
    var query = "SELECT MAX(rating) AS 'Rating' FROM solutions Where unsolved_problem_id = ?";
    var query2 = "UPDATE unsolved_problems SET unsolved_score = ? Where id = ?";
    $cordovaSQLite.execute(db, query, [unsolvedProblem.id])
    .then( function(result) {
      var maxRating= result.rows.item(0);
      $cordovaSQLite.execute(db, query2, [maxRating.Rating,unsolvedProblem.id]);
    },function(error){
    console.log(error);
    });

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

  $scope.getRatingIcon = function(solution) {
    var rating = solution.rating;
    if (rating === 0) {
      return 'ion-android-radio-button-off';
    } else if (rating === 1) {
      return 'ion-sad';
    } else if (rating === 2) {
      return 'ion-heart-broken';
    } else if (rating === 3) {
      return 'ion-heart';
    } else  {
      return 'ion-happy';
    }
  };
  $scope.unableAnimation = function(){
    $scope.firstItemAnimationShown = true;
  };
  $scope.hideFakeButtons = function() {
    return ( $scope.solutions.length === 0 || $scope.firstItemAnimationShown );
  };

  $scope.goToSolution = function(solution){
    $state.go('app.solution', {solutionId:solution.id});
  };

  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(2,10));});
});
