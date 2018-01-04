angular.module('starter.controllers').controller('InvitationCtrl', function($scope, $cordovaSQLite, $state, $stateParams, $ionicModal, $ionicPopup, $ionicActionSheet, $ionicTabsDelegate, $timeout, IonicClosePopupService,$ionicListDelegate, ChildConcernFactory, AdultConcernFactory, PossibleSolutionFactory, UnsolvedProblemFactory, $ionicSideMenuDelegate, $translate, $http){
  $scope.pairExist = false;
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.solution = { unsolvedProblemId: $stateParams.unsolvedProblemId };
  $scope.solutions = [];


      $scope.pair = { solutionId:$stateParams.unsolvedProblemId  };
      $scope.pair.description = "";

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
    ChildConcernFactory.all($stateParams.unsolvedProblemId,function(childConcerns){
      $scope.childsConcerns = childConcerns;
    });
  };

  $scope.createSolution = function() {
    if (!inputFieldIsEmpty($scope.solution.description)) {
      $scope.solution.rating=0;
      PossibleSolutionFactory.insert($scope.solution);

      PossibleSolutionFactory.getLast($scope.solution.unsolvedProblemId,function(idLast){
        $scope.idSolutionAlfin = idLast;
         $scope.createPair($scope.idSolutionAlfin.id);

      });

      $scope.solution.description = "";
      $scope.closeModal();

      if(typeof analytics !== 'undefined') {
           analytics.trackEvent('Child solution', 'New')
      } else {
           console.log("Google Analytics Unavailable");
         }
      PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
        $scope.solutions = res;
      });
    }
  };

  $scope.createPair = function(idSolutionAlfin){
    if (!inputFieldIsEmpty($scope.pair.description)) {
        PossibleSolutionFactory.insertPair($scope.pair,idSolutionAlfin);
         $scope.pair.description = "";
     }
  };

  $scope.showDeletionConfirm = function(solution) {
    $translate(['DeleteSolutionTitle','DeleteSolutionBody', 'CancelOption','YesMessage']).then (function(translations){
    var confirmPopup = $ionicPopup.confirm({
      title: translations.DeleteSolutionTitle,
      template: translations.DeleteSolutionBody,
      cancelText: translations.CancelOption,
      okText: translations.YesMessage
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.deleteSolution(solution);
      }
    });
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

$scope.editablePair=[];


  $scope.editPair = function(editableSolution) {
    PossibleSolutionFactory.findPair(editableSolution.id,function(pairsEdit){
    $scope.editablePair = pairsEdit;
    if($scope.editablePair!=null){
          $scope.openModaEditToChooseAdultConcernToChildConcern();
    }
    if($scope.editablePair===null){
        $scope.openModalToChooseAdultConcernToChildConcernAfterCreatingSolution(editableSolution.id);
    }
    });

  };
  $scope.existPair=false;
  $scope.solutionId2=0;
  $scope.openModaEditToChooseAdultConcernToChildConcern = function() {
      $scope.existPair=true;
        $scope.modalEditToChooseAdultConcernToChildConcern.show();

  };

  $ionicModal.fromTemplateUrl('choose-AdultConcern-To-ChildConcern-After-creating-solution-without-pairs.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalToChooseAdultConcernToChildConcernAfterCreatingSolution = modal;
    $scope.modalToChooseAdultConcernToChildConcernAfterCreatingSolution.hide();
  });

  $scope.openModalToChooseAdultConcernToChildConcernAfterCreatingSolution = function(editableSolutionId) {
    $scope.existPair=false;
  $scope.solutionId2=editableSolutionId;
    $scope.modalToChooseAdultConcernToChildConcernAfterCreatingSolution.show();
    $scope.showHint();
  };
  $scope.closeModalToChooseAdultConcernToChildConcernAfterCreatingSolution = function() {
    $scope.modalToChooseAdultConcernToChildConcernAfterCreatingSolution.hide();
    $ionicListDelegate.closeOptionButtons();
    $scope.solution = { unsolvedProblemId: $stateParams.unsolvedProblemId };
  };
  $scope.updatePair = function(){
   if($scope.existPair!=false){
       if (!inputFieldIsEmpty($scope.editablePair.description)) {
             console.log($scope.editablePair);
         PossibleSolutionFactory.updatePair($scope.editablePair);
         $scope.modalEditToChooseAdultConcernToChildConcern.hide();
        }
       else {
         $scope.emptyInput = true;
       }
    }
    else{
    $scope.createPair($scope.solutionId2);
    $scope.closeModalToChooseAdultConcernToChildConcernAfterCreatingSolution();


    }
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
  $ionicModal.fromTemplateUrl('choose-AdultConcern-To-ChildConcern.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalToChooseAdultConcernToChildConcern = modal;
    $scope.modalToChooseAdultConcernToChildConcern.hide();
  });
  $scope.openModalToChooseAdultConcernToChildConcern = function() {
    $scope.modalToChooseAdultConcernToChildConcern.show();
    $scope.showHint();
  };
  $scope.closeModalToChooseAdultConcernToChildConcern = function() {
    $scope.modalToChooseAdultConcernToChildConcern.hide();
    $ionicListDelegate.closeOptionButtons();
  };

  $ionicModal.fromTemplateUrl('edit-AdultConcern-To-ChildConcern.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalEditToChooseAdultConcernToChildConcern = modal;
      $scope.modalEditToChooseAdultConcernToChildConcern.hide();
    });




    $scope.closeModalEditToChooseAdultConcernToChildConcern = function() {
      $scope.modalEditToChooseAdultConcernToChildConcern.hide();
      $ionicListDelegate.closeOptionButtons();
      $scope.solution = { unsolvedProblemId: $stateParams.unsolvedProblemId };
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
    $scope.solution = { unsolvedProblemId: $stateParams.unsolvedProblemId };
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
    $translate(['SubtitleRating','TitleRating']).then (function(translations){
    var myPopup = $ionicPopup.show({
    title: translations.TitleRating,
    subTitle: translations.SubtitleRating,
    buttons: [
      { type: 'button-assertive ion-sad-outline ',
        onTap: function(e) {
          $scope.showConfirmWorstRate(solution,1,unsolvedProblem);
          if(typeof analytics !== 'undefined') {
            analytics.trackEvent('Child solution rate', 'Worst')
          } else {
            console.log("Google Analytics Unavailable");
          }
        }
      },
      { type: 'button-energized ion-android-sad' ,
        onTap: function(e) {
          $scope.showConfirmBestRate2(solution,2,unsolvedProblem);
          if(typeof analytics !== 'undefined') {
            analytics.trackEvent('Child solution rate', 'Android Sad')
          } else {
            console.log("Google Analytics Unavailable");
          }
        }
      },

      { type: 'button-balanced ion-happy-outline',
        onTap: function(e) {
          $scope.showConfirmBestRate(solution,4,unsolvedProblem);
          if(typeof analytics !== 'undefined') {
            analytics.trackEvent('Child solution rate', 'Happy')
          } else {
            console.log("Google Analytics Unavailable");
          }
        }
      }
    ]
  });

  IonicClosePopupService.register(myPopup);
});
  $scope.showConfirmBestRate = function(solution,rate,unsolvedProblem) {
    $translate(['BestRatingTitle','BestRatingBody', 'CancelOption','YesMessage']).then (function(translations){
    var confirmPopup = $ionicPopup.confirm({
      title: translations.BestRatingTitle,
      template: translations.BestRatingBody,
      cancelText: translations.CancelOption,
      okText: translations.YesMessage
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,rate);
        $scope.BestRate(unsolvedProblem);
        $scope.goToUnsolvedProblems();
      }
    });
  });
  };
  $scope.showConfirmBestRate2 = function(solution,rate,unsolvedProblem) {
    $translate(['MediumRatingTitle', 'CancelOption','YesMessage']).then (function(translations){
    var confirmPopup = $ionicPopup.confirm({
      title: translations.MediumRatingTitle,
      template: "Sometimes the solution needs time to work - we are giving it a try.",
      cancelText: translations.CancelOption,
      okText: translations.YesMessage
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,rate);
        $scope.BestRate(unsolvedProblem);
      }
    });
  });
  };

  $scope.goToUnsolvedProblems = function() {
      $state.go("app.newUnsolvedProblem");
  }

  $scope.showConfirmWorstRate = function(solution,rate,unsolvedProblem) {
    $translate(['WorstRatingTitle','WorstRatingBody', 'CancelOption','YesMessage']).then (function(translations){
    var confirmPopup = $ionicPopup.confirm({
      title: translations.WorstRatingTitle,
      template: translations.WorstRatingBody,
      cancelText: translations.CancelOption,
      okText: translations.YesMessage
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,rate);
        $scope.BestRate(unsolvedProblem);
      }
    });
  });
  };

  };

  $scope.RateSolution = function(solution, rate){
    var query = "UPDATE solutions SET rating = ? Where id = ?";
    $cordovaSQLite.execute(db, query, [rate, solution.id]);
    PossibleSolutionFactory.all($stateParams.unsolvedProblemId, function(res){
      $scope.solutions = res;
    });
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Rating a solution view');
    } else {
        console.log("Google Analytics Unavailable");
    }
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

  $scope.selectTabWithIndexShared = function(index) {
    if (index === 0) {
      $ionicTabsDelegate.select(index);
      $state.go("app.sharedShowUnsolvedProblem", {unsolvedProblemId: $scope.unsolvedProblemFromShared.id});
    }
    if (index == 1) {
      $ionicTabsDelegate.select(index);
      $state.go("app.sharedDefineTheProblem", {unsolvedProblemId: $scope.unsolvedProblemFromShared.id });
    }
    if (index == 2) {
      $state.go("app.sharedInvitation", {unsolvedProblemId: $scope.unsolvedProblemFromShared.id});
      $ionicTabsDelegate.select(index);
    }
  };

  $scope.getRatingIcon = function(solution) {
    var rating = solution.rating;
    if (rating === 0) {
      return 'ion-android-radio-button-off';
    } else if (rating === 1) {
      return 'ion-sad';
    } else if (rating === 2) {
      return 'ion-android-sad';
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

  $scope.showHint = function() {
    $translate(['InvitationStepHint', 'YesMessage']).then (function(translations){
    if(localStorage.getItem("showInfo") === null){
        localStorage.setItem("showInfo", true);
        var confirmPopup = $ionicPopup.alert({
          title: translations.InvitationStepHint,
          okText: translations.YesMessage
        });
      }
    });
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

      $scope.sharedPosibleSolutions;

    $scope.getSharedPosibleSolutions = function(user_id,child_id,unsolved_problem_id_app,unsolved_problem_id) {
        $http.get($link_root +"/users/"+user_id+"/children/"+child_id+"/unsolved_problem/"+unsolved_problem_id+"/sharedPosibleSolutions", {
            headers: { Authorization: localStorage.getItem("auth_token") }
          })
          .then(data => {
            $scope.sharedPosibleSolutions = data.data;
            $scope.getSharedChildConcerns(user_id, child_id, unsolved_problem_id_app);
            $scope.getSharedAdultConcerns(user_id, child_id, unsolved_problem_id_app);
          })
          .catch(error => {
            console.log(error.message);
          });
      };

  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(2,10));});
});
