angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSQLite,$ionicPopup, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.getActiveChild = function(){
    $scope.activeChild = getActiveChild($cordovaSQLite, function(result){
        $scope.activeChild=[];
        if(result.rows.length > 0){
        $scope.activeChild[0]=result.rows.item(0);
        }
    });
  };

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
  $scope.checkActiveToContinue = function(route) {
    if($scope.activeChild.length === 0){
      var alertForNoActiveChild = $ionicPopup.alert({
         title: 'No child registered',
         template: 'You need to register a child to continue.'
       });
       alertForNoActiveChild.then(function(res) {
       });
    }else {
      $state.go(route);
    }
  };

})

.controller('LaggingSkillsCtrl', function($scope, LaggingSkills, $cordovaSQLite, $state, $ionicListDelegate) {
  //$scope.laggingSkills = getLaggingSkills($cordovaSQLite);
  $scope.activeChild = getActiveChild($cordovaSQLite, function(result){
    $scope.activeChild=[];
    $scope.activeChild[0]=result.rows.item(0);
    $scope.laggingSkills = getLaggingSkills($cordovaSQLite, $scope.activeChild[0].id);
  });
  $scope.checkLaggingSkill = function(laggingskillId){
    checkLaggingSkill($cordovaSQLite, [laggingskillId]);
    $state.go('app.laggingSkills');
    $ionicListDelegate.closeOptionButtons();
    $scope.laggingSkills = getLaggingSkills($cordovaSQLite, $scope.activeChild[0].id);
  };
  $scope.uncheckLaggingSkill = function(laggingskillId){
    uncheckLaggingSkill($cordovaSQLite, [laggingskillId]);
    $state.go('app.laggingSkills');
    $ionicListDelegate.closeOptionButtons();
    $scope.laggingSkills = getLaggingSkills($cordovaSQLite, $scope.activeChild[0].id);
  };
})

.controller('HelpCategoryCtrl', function($scope, $stateParams) {
  $scope.params = $stateParams;
})

.controller('HelpCategoryTopicsCtrl', function($scope, HelpCategoriesStep1, $stateParams, AppTools){
  $scope.category = HelpCategoriesStep1.get($stateParams.id_category);
  $scope.browserInstance = {};
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'
  });
})

.controller('HelpCategoryCtrl', function($scope, HelpCategoriesStep1) {
  $scope.helpCategories = HelpCategoriesStep1.all();
})

.controller('HelpCategoryInvitationCtrl', function($scope) {
  $scope.toggleHelp= function(topic){
    if($scope.isTopicShown(topic)){
      $scope.shownTopic=null;
    }
    else{
      $scope.shownTopic=topic;
    }
  };
  $scope.isTopicShown=function(topic){
    return $scope.shownTopic === topic;
  };

  $scope.helpCategoriesInvitation =[
  { description : "Invitation Step | Ingredient/Goal",
    topics:[{ description: "Generate solutions that are realistic (meaning both parties can do what they are agreeing to) and mutually satisfactory (meaning the solution truly addresses the concerns of both parties)"}]},
  {description : "Words ",
    topics:[{ description: "Restate the concerns that were identified in the first two steps, usually beginning with “I wonder if there is a way…"}]},
  { description : "What you're thinking",
    topics:[{ description: "Have I summarized both concerns accurately? Have we truly considered whether both parties can do what they’ve agreed to? Does the solution truly address the concerns of both parties? What’s my estimate of the odds of this solution working?"}]},
  { description : "Don't",
    topics:[{ description: "Rush through this step either"},
            { description: "Enter this step with preordained solutions"},
            { description: "Sign off on solutions that both parties can’t actually perform"},
            { description: "Sign off on solutions that don’t truly address the concerns of both parties"}
           ]},
  { description : "Tips!",
    topics:[{ description: "Stick as closely to the concerns that were identified in the first two steps"},
            { description:"While it’s a good idea to give the kid the first opportunity to propose a solution, generating solutions is a team effort"},
            { description:"It’s a good idea to consider the odds of a given solution actually working …if you think the odds are below 60-70 percent, consider what it is that’s making you skeptical and talk about it" },
            {description:"This step always ends with agreement to return to Plan B if the first solution doesn’t stand the test of time "}]},
  { description : "Help Topics",
    topics:[
      {description: "I'm not getting it", url:"http://www.blogtalkradio.com/dr-ross-greene/2013/09/16/parenting-your-challenging-child"},
      {description: "The solution didn’t work", url:"http://www.blogtalkradio.com/dr-ross-greene/2011/03/15/parenting-challenging-kids-collaborative-problem-solving-at-home"}
    ]}
];

})

.controller('HelpTopicContentCtrl', function($scope, HelpCategoriesStep1, $stateParams, AppTools) {
  $scope.topic = HelpCategoriesStep1.getContent($stateParams.id_category, $stateParams.id_topic);
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'
  });
})

.controller('DefineTheProblemCtrl', function($scope, $stateParams) {
  $scope.unsolvedProblem = {
      description: "",
      id:$stateParams.unsolvedProblemId
  };
})

.controller('AdultConcernsCrtl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $stateParams, $ionicTabsDelegate, $timeout, UnsolvedProblemFactory){

  $scope.adultsConcern = { description: ""};
  $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $stateParams.unsolvedProblemId);
  $scope.childsConcerns = getChildsConcern($cordovaSQLite, $stateParams.unsolvedProblemId);

  $scope.updateAdultsConcerns = function(){
    $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $stateParams.unsolvedProblemId);
  };

  $scope.findUnsolvedProblem = function() {
    UnsolvedProblemFactory.find($stateParams.unsolvedProblemId, function(result){
      $scope.unsolvedProblem = result.rows.item(0);
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

.controller('TourCtrl', function($scope, $state, $ionicSlideBoxDelegate,$cordovaSQLite, $ionicPopup){
  $scope.checkActiveToContinue = function(route) {
    if($scope.activeChild.length === 0){
      var alertForNoActiveChild = $ionicPopup.alert({
         title: 'No child registered',
         template: 'You need to register a child to continue.'
       });
       alertForNoActiveChild.then(function(res) {
       });
    }else {
      $state.go(route);
    }
  };
  $scope.startApp = function() {
    $state.go('app.newUnsolvedProblem');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.UnsolvedProblemsTutorial = function(){
    var query ="SELECT COUNT(*) AS UnsolvedProblemsCount FROM unsolved_problems";
    var cont = -1;
    $cordovaSQLite.execute(db,query).then( function(result){
      cont = result.rows.item(0).UnsolvedProblemsCount;
      if(cont === 0)
      {
        $state.go('app.unsolvedTour');
      }
      else{
        $scope.checkActiveToContinue('app.newUnsolvedProblem') ;
          }
      });
  };
})

.controller('ChildsConcernsCtrl', function($scope, $cordovaSQLite, $state, $ionicModal, $ionicPopup, $ionicListDelegate, $ionicTabsDelegate, $stateParams, $timeout, UnsolvedProblemFactory){
  $scope.childsConcern = {
    description: ""
  };

  $scope.unsolvedProblem = {};

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

  $scope.adultsConcerns = getAdultConcerns($cordovaSQLite, $scope.unsolvedProblem.id);
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

});

// OTHER FUNCTIONS


function getLaggingSkills(cordovaSQLite,child_id){
  var lagging_skills = [];
  var query ="SELECT * FROM lagging_skills WHERE child_id = ?";
  cordovaSQLite.execute(db,query,[child_id]).then(function(result) {
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

function getActiveChild(cordovaSQLite,callback){
  var active_child = [];
  var query ="SELECT * FROM childs WHERE active = 1";
  cordovaSQLite.execute(db,query).then(function(result) {
    callback(result);
    },function(err){
      console.log(err.message);
    });
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

function saveChild(cordovaSQLite,child){
  var query = "INSERT INTO childs(first_name,gender,birthday,active) VALUES (?,?,?,1)";
  cordovaSQLite.execute(db,query,[child.first_name,child.gender,child.birthday]);
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


function getChilds(cordovaSQLite, callback){
 var childs = [];
 var query ="SELECT * FROM childs";
 cordovaSQLite.execute(db,query).then(function(result){
   callback(result);
 },
   function(err){
     console.log(err.message);
   });
 return childs;
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
function uncheckLaggingSkill($cordovaSQLite,params){
  var query = "UPDATE lagging_skills SET checked = 0 where id = ?";
  $cordovaSQLite.execute(db,query,params);
}
function checkLaggingSkill($cordovaSQLite, params){
  var query = "UPDATE lagging_skills SET checked = 1 where id = ?";
  $cordovaSQLite.execute(db,query,params);
}
