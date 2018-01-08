
angular.module('starter.controllers').controller('UnsolvedProblemCtrl', function($scope, UnsolvedProblemFactory, $cordovaSQLite, $state, $ionicActionSheet,$ionicListDelegate, $ionicPopup, $ionicModal, $stateParams, ChildrenFactory, LaggingSkills,$translate, $http) {
  $scope.unsolvedProblem = {};
  $scope.shouldShowReorder = false;
  $scope.unsolvedProblems = {};

  ChildrenFactory.active(function(active_child){
    $scope.activeChild = active_child;
    LaggingSkills.all($scope.activeChild.id, function(res){
      $scope.laggingSkills = res;
    });
  });

  $scope.updateUnsolvedProblems = function(){
    ChildrenFactory.active(function(active_child){
      $scope.activeChild = active_child;
      UnsolvedProblemFactory.all($scope.activeChild.id,function(result){
        $scope.unsolvedProblems = result;
        $scope.firstItemAnimationShown = false;
      });
    });
  };
  $scope.updateUnsolvedProblems();

  $scope.openLink = function(){
    $cordovaInAppBrowser.open('http://google.com', '_self')
    .then(function(event) {
      // success
    })
    .catch(function(event) {
      // error
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
        unsolved_score: $scope.unsolvedProblems[i].id,
        id: $scope.unsolvedProblems[i].id
      });
    }
    UnsolvedProblemFactory.update({
      description: $scope.unsolvedProblems[fromIndex].description,
      unsolved_order: toIndex,
      unsolved_score: $scope.unsolvedProblems[fromIndex].description,
      id: $scope.unsolvedProblems[fromIndex].id
    });

    $scope.unsolvedProblems.splice(fromIndex, 1);
    $scope.unsolvedProblems.splice(toIndex, 0, unsolvedProblem);
    if(typeof analytics !== 'undefined') {
      analytics.trackEvent('Unsolved Problems', 'Change order')
    } else {
      console.log("Google Analytics Unavailable");
    }
  };

  $scope.createUnsolvedProblem = function() {
    if (!inputFieldIsEmpty($scope.unsolvedProblem.description)) {
      $scope.unsolvedProblem.unsolved_order = $scope.unsolvedProblems.length;
      $scope.unsolvedProblem.unsolved_score = 0;
      $scope.unsolvedProblem.child_id = $scope.activeChild.id;
      UnsolvedProblemFactory.insert($scope.unsolvedProblem);
      if($state.params.laggingSkillsId){
        LaggingSkills.check([$state.params.laggingSkillsId]);
      }
      $scope.unsolvedProblem = {};
      $scope.updateUnsolvedProblems();
      $scope.closeModalCreate();
      if(typeof analytics !== 'undefined') {
        analytics.trackEvent('Unsolved Problem event', 'New')
        } else {
            console.log("Google Analytics Unavailable");
          }
      }
  };

  $scope.editUnsolvedProblem = function(unsolvedProblem){
    $scope.unsolvedProblemToEdit = unsolvedProblem;
    $scope.editableUnsolvedProblem = angular.copy(unsolvedProblem);
    $scope.openModalEdit();
    if(typeof analytics !== 'undefined') {
      analytics.trackEvent('Unsolved Problem event edit', 'New')
    }else {
      console.log("Google Analytics Unavailable");
    }
  };

  $scope.saveUnsolvedProblemChanges = function(){
    if (!inputFieldIsEmpty($scope.editableUnsolvedProblem.description)) {
      UnsolvedProblemFactory.update($scope.editableUnsolvedProblem);
      $scope.modalEdit.hide();
      $scope.editableUnsolvedProblem = {};
      $scope.updateUnsolvedProblems();
      if(typeof analytics !== 'undefined') {
        analytics.trackView('Edit unsolved problem view');
      } else {
          console.log("Google Analytics Unavailable");
      }
    }
  };

  $scope.verifyToGoToStep1 = function(id) {
    $translate(['goingTo','Step', 'EmpathyStep','NoMessage','YesMessage','listmoreexples','step1VerifyBody','idid']).then (function(translations){
    if($scope.unsolvedProblems.length > 0){
      var confirmPopup = $ionicPopup.confirm({
        title: translations.goingTo +" "+ translations.Step + " 1: " +translations.EmpathyStep,
        template: translations.step1VerifyBody,
        cancelText: translations.NoMessage+", " + translations.listmoreexples,
        okText: translations.YesMessage + ", "+ translations.idid
      });

      confirmPopup.then(function(res) {
      if(res) {
       $state.go('app.showUnsolvedProblem',{ unsolvedProblemId:id});
      }

      });
    }
    else {
      $state.go('app.newUnsolvedProblem',{ unsolvedProblemId:id});
    }
   });
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

  $scope.goToUnsolvedProblem = function(unsolvedProblem){
    $state.go('app.showUnsolvedProblem',
      );
  };

  $scope.openStep2 = function(unsolvedProblem){
    $state.go('app.defineTheProblem',{ unsolvedProblemId: unsolvedProblem.id});
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
    if(typeof analytics !== 'undefined') {
      analytics.trackView('New Unsolved Problem view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };

  $scope.closeModalCreate = function() {
    $ionicListDelegate.closeOptionButtons();
    $scope.unsolvedProblem = {};
    $scope.modalCreate.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalCreate.remove();
    $scope.modalEdit.remove();
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
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.childsFlag = 0;
  $scope.adultsFlag = 0;
  $scope.showActionsheet = function(unsolvedProblem) {
    $translate(['CancelOption','Step','EmpathyStep','DefineAdultsConcern','InvitationStep','wasntUnlock','haveToFinishSteps']).then (function(translations){
    $scope.adultsConcernsFlag(unsolvedProblem);
    $scope.childsConcernsFlag(unsolvedProblem);
    $ionicActionSheet.show({
      buttons: [
        { text: translations.Step + " 1: " + translations.EmpathyStep },
        { text: translations.Step + " 2: " + translations.DefineAdultsConcern },
        { text: translations.Step + " 3: " + translations.InvitationStep }
      ],
      cancelText: translations.CancelOption,
      cancel: function() {
        $ionicListDelegate.closeOptionButtons();
      },
      buttonClicked: function(index) {

        if(index === 0){
          $scope.goToUnsolvedProblem(unsolvedProblem);
        }
        if(index == 1){
          if($scope.childsFlag === 0){
            var alertPopup = $ionicPopup.alert({
               title: translations.Step + " 2 "+ translations.wasntUnlock,
               template: translations.haveToFinishSteps
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
               title: translations.Step + " 3 "+ translations.wasntUnlock,
               template: translations.haveToFinishSteps
             });
             alertPopupForUnsolved.then(function(res) {
             });
          }else {
            $state.go('app.invitation',{ unsolvedProblemId: unsolvedProblem.id});
          }
        }
        $ionicListDelegate.closeOptionButtons();

        return true;

      }
    });
   });
  };

  $scope.editSolution = function(solution) {
    $state.go('app.editSolution',{ solutionId: solution.id});
  };

  $scope.delete = function(item) {
      UnsolvedProblemFactory.delete(item, function(){
        $scope.unsolvedProblems.splice($scope.unsolvedProblems.indexOf(item), 1);
      });
   };

   $scope.showConfirm = function(item) {
    $translate(['DeleteUnsolvedProblemTitle','DeleteUnsolvedProblemBody', 'CancelOption','YesMessage']).then (function(translations){
     var confirmPopup = $ionicPopup.confirm({
       title: translations.DeleteUnsolvedProblemTitle,
       template: translations.DeleteUnsolvedProblemBody,
       cancelText: translations.CancelOption,
       okText: translations.YesMessage
     });

     confirmPopup.then(function(res) {
      if(res) {
       $scope.delete(item);
      }

      if(typeof analytics !== 'undefined') {
        analytics.trackEvent('Unsolved problem Hint', 'Delete')
      } else {
        console.log("Google Analytics Unavailable");
      }

     });
    });
   };

   $scope.getRatingIcon = function(unsolvedProblem) {
     var rating = unsolvedProblem.unsolved_score;
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
   $scope.unableAnimation = function() {
     $scope.firstItemAnimationShown = true;
   };
   $scope.hideFakeButtons = function() {
     return ( $scope.unsolvedProblems.size === 0 || $scope.firstItemAnimationShown );
   };
   $scope.unsolvedProblemHint = function(){
       $scope.openModalHint();
       if(typeof analytics !== 'undefined') {
           analytics.trackEvent('Unsolved problem Hint', 'Open')
       } else {
           console.log("Google Analytics Unavailable");
       }
     };
   $scope.openModalHint = function() {
       $scope.modalHint.show();
     };
   $ionicModal.fromTemplateUrl('templates/unsolvedProblems/unsolvedProblemsHints.html', {
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
    $scope.googleAnalyticsView = function() {
     if(typeof analytics !== 'undefined') {
       analytics.trackView('Unsolved Problems view');
     } else {
         console.log("Google Analytics Unavailable");
     }
   };


   $scope.sharedUnsolveProblems;

    $scope.getSharedUnsolveProblems = function(child_id) {
      var user_id = localStorage.getItem("user_id");
        $http.get($link_root +"/users/"+user_id+"/children/"+child_id+"/sharedUnsolvedProblems", {
            headers: { Authorization: localStorage.getItem("auth_token") }
          })
          .then(data => {
            $scope.sharedUnsolveProblems = data.data;
             console.log($scope.sharedUnsolveProblems);
          })
          .catch(error => {
            console.log(error.message);
          });
      };

  $scope.goToAlsupHelp = function() {
    $scope.modalHint.hide();
    localStorage.setItem("coming_from_hint","true")
      $state.go("app.alsupHelp");
  }

});
