angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LaggingSkillsCtrl', function($scope, LaggingSkills, $cordovaSQLite, $state, $ionicListDelegate) {
  //$scope.laggingSkills = getLaggingSkills($cordovaSQLite);
  $scope.laggingSkills = LaggingSkills.all();
  $scope.checkLaggingSkill = function(laggingskillId){
    //updateLaggingSkill($cordovaSQLite, [laggingskillId]);
    LaggingSkills.check(laggingskillId);
    $state.go('app.laggingSkills');
    $ionicListDelegate.closeOptionButtons();
  };
  $scope.uncheckLaggingSkill = function(laggingskillId){
    //updateLaggingSkill($cordovaSQLite, [laggingskillId]);
    LaggingSkills.uncheck(laggingskillId);
    $state.go('app.laggingSkills');
    $ionicListDelegate.closeOptionButtons();
  };
})

.controller('HelpCategoryCtrl', function($scope, $stateParams) {
  $scope.params = $stateParams;
})

.controller('HelpCategoryTopicsCtrl', function($scope, HelpCategoriesStep1, $stateParams){
  $scope.category = HelpCategoriesStep1.get($stateParams.id_category);
})

.controller('HelpCategoryCtrl', function($scope, HelpCategoriesStep1) {
  $scope.helpCategories = HelpCategoriesStep1.all();
})

.controller('HelpTopicContentCtrl', function($scope, HelpCategoriesStep1, $stateParams) {
  $scope.topic = HelpCategoriesStep1.getContent($stateParams.id_category, $stateParams.id_topic);
})

.controller('DefineTheProblemCtrl', function($scope, $stateParams) {
  $scope.unsolvedProblem = {
      description: "",
      id:$stateParams.id_unsolved
  };
})

.controller('DeleteUnsolvedProblemCtrl', function($scope, $cordovaSQLite, $ionicPopup){

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
})

.controller('AdultConcernsCrtl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $stateParams, $ionicTabsDelegate, $timeout){

  $scope.adultsConcern = { description: ""};
  $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $stateParams.unsolvedProblemId);
  $scope.childsConcerns = getChildsConcern($cordovaSQLite, $stateParams.unsolvedProblemId);

  $scope.updateAdultsConcerns = function(){
    $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $stateParams.unsolvedProblemId);
  };

  $scope.findUnsolvedProblem = function() {
    var query =" SELECT * FROM unsolved_problems where id = ? ";
    $cordovaSQLite.execute(db,query,[$stateParams.unsolvedProblemId])
      .then( function(result) {
        $scope.unsolvedProblem = result.rows.item(0);
    },function(error){
      console.log(error);
    });
  };
  $scope.createAdultsConcern = function(){
    if (!inputFieldIsEmpty($scope.adultsConcern.description)) {
      saveAdultsConcern($cordovaSQLite,$scope.adultsConcern.description, $stateParams.unsolvedProblemId);
      $scope.modalCreate.hide();
      $state.go('app.defineTheProblem');
      $scope.adultsConcern.description = "";
      $scope.adultsConcerns= getAdultConcerns($cordovaSQLite,$stateParams.unsolvedProblemId);
    }
  };



  $scope.editAdultsConcern = function(adultsConcern){
    $scope.adultsConcerntoEdit = adultsConcern;
    $scope.editableAdultsConcern = {
      description: adultsConcern.description
    };
    $scope.openModalEdit();
  };


  $scope.updateAdultsConcern = function(){
    if (!inputFieldIsEmpty($scope.editableAdultsConcern.description)) {
      updateAdultsConcern($cordovaSQLite, [$scope.editableAdultsConcern.description,$scope.adultsConcerntoEdit.id]);
      $scope.modalEdit.hide();
      $scope.adultsConcerntoEdit = {};
      $scope.adultsConcerns= getAdultConcerns($cordovaSQLite,$stateParams.unsolvedProblemId);
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
    var query = "DELETE FROM adults_concerns where id = ?";
    $cordovaSQLite.execute(db, query, [adultsConcern.id]).then(function(res) {
        $scope.adultsConcerns.splice($scope.adultsConcerns.indexOf(adultsConcern), 1);
    }, function (err) {
        console.error(err);
    });
 };

  $ionicModal.fromTemplateUrl('templates/adultsConcerns/create-adults-concern-modal.html', {
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



  $ionicModal.fromTemplateUrl('templates/adultsConcerns/create-adults-concern-modal.html', {
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

  $ionicModal.fromTemplateUrl('templates/adultsConcerns/edit-adults-concern-modal.html', {
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
  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(1,10));});

})

.controller('ChildsConcernsCtrl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $ionicListDelegate, $ionicTabsDelegate, $stateParams, $timeout){
  $scope.childsConcern = {
    description: ""
  };

  // $scope.childsConcerns = getChildsConcern($cordovaSQLite, $scope.unsolvedProblem.id);
  $scope.unsolvedProblem = {
    description: '',
    id: $stateParams.unsolvedProblemId
  };
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
      updateChildsConcernOrder($cordovaSQLite, [i+childConcernOrderModifier, $scope.childsConcerns[i].id]);
    }
    updateChildsConcernOrder($cordovaSQLite, [toIndex, $scope.childsConcerns[fromIndex].id]);
    $scope.childsConcerns.splice(fromIndex, 1);
    $scope.childsConcerns.splice(toIndex, 0, childsConcern);
  };

  $scope.updateChildsConcerns = function(){
    $scope.childsConcerns = getChildsConcern($cordovaSQLite, $stateParams.unsolvedProblemId);
  };

  $scope.findUnsolvedProblem = function(unsolvedProblem) {
    var query ="SELECT * FROM unsolved_problems where id = ?;";
    $cordovaSQLite.execute(db,query,[unsolvedProblem.id]).then(function(result){
      $scope.itemf = result.rows.item(0);
      $scope.unsolvedProblem.description = $scope.itemf.description;
    });
    $scope.unsolvedProblem = {};
    $scope.unsolvedProblem.id = $stateParams.unsolvedProblemId;
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

  $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $scope.unsolvedProblem.id);

  $scope.verifyToGoToStep2 = function() {
    if($scope.adultsConcerns.length === 0){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Going to Step 2: Define Adults Concerns',
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
    $scope.childsConcerntoEdit = childsConcern;
    $scope.editableChildsConcern = {
      description: childsConcern.description
    };
    $scope.openModalEdit();
  };

  $scope.createChildsConcern = function(){
    if (!inputFieldIsEmpty($scope.childsConcern.description))
    {
      saveChildsConcern($cordovaSQLite,$scope.childsConcern.description, $stateParams.unsolvedProblemId, $scope.childsConcerns.length);
      $scope.modalCreate.hide();
      $state.go('app.showUnsolvedProblem',{ unsolvedProblemId: $stateParams.unsolvedProblemId});
      $scope.childsConcern.description = "";
      $scope.childsConcerns= getChildsConcern($cordovaSQLite,$stateParams.unsolvedProblemId);
    }
  };
  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(0,10));});

  $scope.updateChildsConcern = function(){
    if (!inputFieldIsEmpty($scope.editableChildsConcern.description)) {
      updateChildsConcern($cordovaSQLite, [$scope.editableChildsConcern.description,$scope.childsConcerntoEdit.id]);
      $scope.modalEdit.hide();
      $scope.childsConcerntoEdit = {};
      $scope.childsConcerns= getChildsConcern($cordovaSQLite,$stateParams.unsolvedProblemId);
    }
    else {
      $scope.emptyInput = true;
    }
  };
  $scope.deleteChildsConcern = function(item) {
    var query = "DELETE FROM childs_concerns where id = ?";
    $cordovaSQLite.execute(db, query, [item.id]).then(function(res) {
        $scope.childsConcerns.splice($scope.childsConcerns.indexOf(item), 1);
    }, function (err) {
        console.error(err);
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

})

.controller('InvitationCtrl',function($scope, $cordovaSQLite, $state, $stateParams, $ionicModal, $ionicPopup, $ionicActionSheet, $ionicTabsDelegate, $timeout){
  $scope.solution = { unsolvedProblemId:$stateParams.unsolvedProblemId };
  $scope.solutions = getSolutions($cordovaSQLite, $stateParams.unsolvedProblemId);
  $scope.initialSetUp = function(){
    findUnsolvedProblem();
    findChildsConcerns();
    findAdultsConcerns();
  };
  $scope.showChilds=false;
  $scope.showAdults=false;
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
  $scope.createSolution = function() {
    if (!inputFieldIsEmpty($scope.solution.description)) {
      $scope.solution.rating=0;
      saveSolution($cordovaSQLite,$scope.solution);
      $scope.solution.description = "";
      $scope.closeModal();
      $scope.solutions = getSolutions($cordovaSQLite, $stateParams.unsolvedProblemId);
    }
  };
  $scope.more = function(solution) {
    var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Edit Solution' },
       ],
       destructiveText: 'Delete Solution',
       titleText: 'Modify your album',
       cancelText: 'Cancel',
       cancel: function() {
            console.log("cancel");
        },
       buttonClicked: function(index) {
         if(index === 0){
           $scope.editSolution(solution);
         }
        return true;
       },
       destructiveButtonClicked: function() {

         $scope.showDeletionConfirm(solution);
        //  $ionicListDelegate.closeOptionButtons();

         return true;
       }
     });
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
    var query = "DELETE FROM solutions where id = ?";
    $cordovaSQLite.execute(db, query, [solution.id]).then(function(res) {
        $scope.solutions.splice($scope.solutions.indexOf(solution), 1);
    }, function (err) {
        console.error(err);
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
      updateSolution($cordovaSQLite,$scope.editableSolution);
      $scope.modalEdit.hide();
      $scope.solutionEdit = {};
      $scope.solutions = getSolutions($cordovaSQLite,$stateParams.unsolvedProblemId);
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
  $ionicModal.fromTemplateUrl('edit-modal.html', {
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
  function findUnsolvedProblem() {
    // var query ="SELECT u.id, u.description FROM unsolved_problems AS u, childs_concerns AS c, adults_concerns AS a WHERE u.id = c.unsolved_problem_id AND c.id = a.child_concern_id AND a.id = ?";
    var query ="SELECT * FROM unsolved_problems WHERE id = ?";
    $cordovaSQLite.execute(db,query,[$stateParams.unsolvedProblemId])
      .then( function(result) {
        $scope.unsolvedProblem = result.rows.item(0);
    },function(error){console.log(error);});
  }
  function findChildsConcerns() {
    $scope.childsConcerns = getChildsConcern($cordovaSQLite,$stateParams.unsolvedProblemId);
  }
  function findAdultsConcerns() {
    $scope.adultsConcerns = getAdultConcerns($cordovaSQLite,$stateParams.unsolvedProblemId);
  }
  //function here
  $scope.showScore = function(solution,unsolvedProblem) {
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

  $scope.showConfirmBestRate = function(solution,score,unsolvedProblem) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Best Rate for this solution',
      template: 'Are you sure that this solution solved the unsolved problem?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,score);
        $scope.BestRate(unsolvedProblem);
      }
    });
  };

  $scope.showConfirmWorstRate = function(solution,score,unsolvedProblem) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Worst Rate for this solution',
      template: 'Are you sure that this solution dont help to solve the unsolved problem?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.RateSolution(solution,score);
        $scope.BestRate(unsolvedProblem);
      }
    });
  };

  };


  $scope.RateSolution = function(solution, Score){
    var query = "UPDATE solutions SET rating = ? Where id = ?";
    $cordovaSQLite.execute(db, query, [Score, solution.id]);
$scope.solutions = getSolutions($cordovaSQLite, $stateParams.unsolvedProblemId);
    $state.go('app.invitation');
  };

  $scope.BestRate = function(unsolvedProblem){
    var query = "SELECT MAX(rating) AS 'Rating' FROM solutions Where unsolved_problem_id = ?";
    var query2 = "UPDATE unsolved_problems SET unsolved_score = ? Where id = ?";
    $cordovaSQLite.execute(db, query, [unsolvedProblem.id])
    .then( function(result) {
      var maxscore= result.rows.item(0);
      $cordovaSQLite.execute(db, query2, [maxscore.Rating,unsolvedProblem.id]);
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
  $timeout( function() {$ionicTabsDelegate.$getByHandle('myTabs').select( parseInt(2,10));});

});

// OTHER FUNCTIONS


function getLaggingSkills(cordovaSQLite){
  var lagging_skills = [];
  var query ="SELECT * FROM lagging_skills ORDER BY id";
  cordovaSQLite.execute(db,query).then(function(result) {
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        lagging_skills.push(rows.item(i));
      }
    }
    },function(err){
      console.log(err.message);
    });
  return lagging_skills;
}

function getSolutions(cordovaSQLite,unsolvedProblemId) {
  var solutions = [];
  var query ="SELECT * FROM solutions WHERE unsolved_problem_id = ?";
  cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        solutions.push(rows.item(i));
      }
    }
  },function(err){console.log(err.message);});
  return solutions;
}

function inputFieldIsEmpty(description) {
    return description.length === 0;
}

// Funcion no utilizada en ninguna parte (segun mi buscador de atom :P)
function getAdultConcernById($cordovaSQLite, adultConcernId){
  var query ="SELECT * FROM adults_concerns where id = ?";
  $cordovaSQLite.execute(db,query,[adultConcernId])
    .then( function(result,callback) {
      callback(result.rows.item(0));
  });
}

function saveChildsConcern(cordovaSQLite,childsConcern,unsolvedProblemId,orderId){
  var query ="INSERT INTO childs_concerns(description,unsolved_problem_id,unsolved_order) VALUES (?,?,?)";
  cordovaSQLite.execute(db,query,[childsConcern,unsolvedProblemId,orderId]);
}

function saveAdultsConcern(cordovaSQLite,adultsConcern,childConcernId){
  var query ="INSERT INTO adults_concerns(description,unsolved_problem_id) VALUES (?,?)";
  cordovaSQLite.execute(db,query,[adultsConcern,childConcernId]);
}

function saveSolution(cordovaSQLite,solution){
  var query ="INSERT INTO solutions(description,unsolved_problem_id,rating) VALUES (?,?,?)";
  cordovaSQLite.execute(db,query,[solution.description,solution.unsolvedProblemId,solution.rating]);
}

function getChildsConcern(cordovaSQLite,unsolvedProblemId){
  var childs_concerns = [];
  var query ="SELECT * FROM childs_concerns WHERE unsolved_problem_id = ? ORDER BY unsolved_order";
  // var query ="SELECT * FROM childs_concerns WHERE unsolved_problem_id = ? ";
  cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        childs_concerns.push(rows.item(i));
      }
    }
    },function(err){
      console.log(err.message);
    });
  return childs_concerns;
}

function getAdultConcerns(cordovaSQLite,unsolvedProblemId){
  var adults_concerns = [];
  var query ="SELECT * FROM adults_concerns WHERE unsolved_problem_id = ?";
  cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        adults_concerns.push(rows.item(i));
      }
    }
    },function(err){
      console.log(err.message);
    });
  return adults_concerns;
}

function updateSolution($cordovaSQLite, solution){
  var query = "UPDATE solutions SET description = ? where id = ?";
  $cordovaSQLite.execute(db, query, [solution.description, solution.id]);
}

function updateChildsConcernOrder($cordovaSQLite,params){
  var query = "";
  query = "UPDATE childs_concerns SET unsolved_order = ? where id = ?";
  $cordovaSQLite.execute(db, query, params);
}
function updateChildsConcern($cordovaSQLite, params){
  var query = "";
  query = "UPDATE childs_concerns SET description = ? where id = ?";
  return $cordovaSQLite.execute(db, query, params);
}

function updateAdultsConcern($cordovaSQLite, params){
  var query = "";
  query = "UPDATE adults_concerns SET description = ? where id = ?";
  return $cordovaSQLite.execute(db, query, params);
}

function updateLaggingSkill($cordovaSQLite, params){
  var query = "UPDATE lagging_skills SET checked = 1 where id = ?";
  $cordovaSQLite.execute(db,query,params);
}
