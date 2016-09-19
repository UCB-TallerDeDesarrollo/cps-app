angular.module('starter.controllers', [])

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

.controller('UnsolvedProblemCtrl', function($scope, UnsolvedProblems, $cordovaSQLite) {
  if(!$scope.emptyInput) {$scope.emptyInput = false; console.log("no deberia llegar acá");}
  $scope.unsolvedProblems = getUnsolvedProblems($cordovaSQLite);
  $scope.shouldShowReorder = false;
  $scope.moveItem = function(unsolvedProblem, fromIndex, toIndex) {
    var timestampAuxiliary = $scope.unsolvedProblems[fromIndex].sort_timestamp;
    $scope.unsolvedProblems[fromIndex].sort_timestamp = $scope.unsolvedProblems[toIndex].sort_timestamp;
    $scope.unsolvedProblems[toIndex].sort_timestamp = timestampAuxiliary;
    updateUnsolvedProblem($cordovaSQLite, [$scope.unsolvedProblems[fromIndex].description, $scope.unsolvedProblems[fromIndex].sort_timestamp, $scope.unsolvedProblems[fromIndex].id]);
    updateUnsolvedProblem($cordovaSQLite, [$scope.unsolvedProblems[toIndex].description, $scope.unsolvedProblems[toIndex].sort_timestamp, $scope.unsolvedProblems[toIndex].id]);
    $scope.unsolvedProblems.splice(fromIndex, 1);
    $scope.unsolvedProblems.splice(toIndex, 0, unsolvedProblem);
    $scope.unsolvedProblems.sort(function (a, b) {
      return (a.sort_timestamp > b.sort_timestamp ? 1 : -1);
    });
  };
  $scope.createUnsolvedProblem = function() {
    if (!inputFieldIsEmpty($scope.unsolvedProblem.description)) {
      saveUnsolvedProblem($cordovaSQLite,$scope.unsolvedProblem);
      $scope.unsolvedProblem = {};
      $scope.unsolvedProblems = getUnsolvedProblems($cordovaSQLite);
    }
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


.controller('EditUnsolvedProblemCtrl', function($scope, $cordovaSQLite, $state){
  $scope.unsolvedProblem = {
      description: "",
      id:$state.params.itemId
    };

  $scope.emptyInput = false;

  $scope.find = function(unsolvedProblem) {
    console.log($scope);
    var query ="SELECT * FROM unsolved_problems where id = ?";
    $cordovaSQLite.execute(db,query,[$scope.unsolvedProblem.id]).then(function(result){
      $scope.itemf = result.rows.item(0);
      $scope.unsolvedProblem.description = $scope.itemf.description;
    });
  };

  $scope.updateUnsolvedProblem = function(){
    if (!inputFieldIsEmpty($scope.unsolvedProblem.description)) {
      updateUnsolvedProblem($cordovaSQLite, [$scope.unsolvedProblem.description,$scope.unsolvedProblem.id]);
      $state.go('app.newUnsolvedProblem');
    }
    else {
      $scope.emptyInput = true;
    }

  };
});

// OTHER FUNCTIONS

function getUnsolvedProblems(cordovaSQLite) {
  var unsolved_problems = [];
  var query ="SELECT * FROM unsolved_problems ORDER BY sort_timestamp";
  cordovaSQLite.execute(db,query).then(function(result) {
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        unsolved_problems.push(rows.item(i));
      }
    }
    },function(err){
      console.log(err.message);
    });
  return unsolved_problems;
}

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
function inputFieldIsEmpty(description) {
    return description.length === 0;
}

function saveUnsolvedProblem(cordovaSQLite,unsolvedProblem){
  var query ="INSERT INTO unsolved_problems(description,solved) VALUES (?,?)";
  cordovaSQLite.execute(db,query,[unsolvedProblem.description,0]);
}

function updateUnsolvedProblem($cordovaSQLite, params){
  var query = "";
  if(params.length > 2){
    query = "UPDATE unsolved_problems SET description = ?, sort_timestamp = ? where id = ?";
  }
  else{
    query = "UPDATE unsolved_problems SET description = ? where id = ?";
  }
  $cordovaSQLite.execute(db, query, params);
}

function updateLaggingSkill($cordovaSQLite, params){
  var query = "UPDATE lagging_skills SET checked = 1 where id = ?";
  $cordovaSQLite.execute(db,query,params);
}
