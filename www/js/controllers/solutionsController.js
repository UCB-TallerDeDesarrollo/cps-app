angular.module('starter.controllers').controller('SolutionsCtrl', function($scope, $state, $stateParams, $ionicModal, $cordovaSQLite){
  $scope.comment = { solutionId: $stateParams.solutionId };

  getSolution($stateParams.solutionId,$cordovaSQLite,function(solution){
    $scope.solution = solution;
  });

  $scope.comments = [];
  getComments($stateParams.solutionId,$cordovaSQLite,function(comments){
    $scope.comments = comments;
  });

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
  };

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
  };

  $scope.$on('$destroy', function() {
    $scope.modalCreate.remove();
    $scope.modalEdit.remove();
  });

  $scope.editComment = function(comment){
    $scope.commentEdit = comment;
    $scope.editableComment = {
      description: comment.description,
      id: comment.id
    };
    $scope.openModalEdit();
  };

  $scope.updateComment = function(){
    if (!inputFieldIsEmpty($scope.editableComment.description)) {
      updateComment($cordovaSQLite,$scope.editableComment);
      $scope.modalEdit.hide();
      $scope.commentEdit = {};
      getComments($stateParams.solutionId,$cordovaSQLite,function(comments){
        $scope.comments = comments;
      });
    }
    else {
      $scope.emptyInput = true;
    }
  };

  $scope.createComment = function(){
    if (!inputFieldIsEmpty($scope.comment.description)) {
      saveComment($cordovaSQLite,$scope.comment);
      getComments($stateParams.solutionId,$cordovaSQLite,function(comments){
        $scope.comments = comments;
      });
      $scope.comment.description = "";
      $scope.closeModal();
    }
  };

  $scope.parseDate = function(commented_at){
    commented_at = new Date(commented_at);
    return commented_at.toLocaleString();
  };

  $scope.getRatingIcon = function(solution) {
    var rating = solution.rating;
    if (rating === 0) {
      return 'ion-help';
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
});

function getSolution(solutionId,cordovaSQLite,callback){
  var solution;
  var query ="SELECT * FROM solutions WHERE id = ?";
  cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
    solution = result.rows.item(0);
    callback(solution);
  },function(err){console.log(err.message);});
}

function getComments(solutionId,cordovaSQLite,callback){
  var comments = [];
  var query ="SELECT * FROM solution_comments WHERE solution_id = ? ORDER BY commented_at DESC";
  cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
    var rows = result.rows;
    if(rows.length) {
      for(var i=0; i < rows.length; i++){
        comments.push(rows.item(i));
      }
      callback(comments);
    }
  },function(err){console.log(err.message);});
}

function saveComment(cordovaSQLite,comment){
  var now = new Date();
  var query ="INSERT INTO solution_comments(description,commented_at,solution_id) VALUES (?,?,?)";
  cordovaSQLite.execute(db,query,[comment.description,now,comment.solutionId]);
}

function updateComment($cordovaSQLite, comment){
  var query = "UPDATE solution_comments SET description = ? where id = ?";
  $cordovaSQLite.execute(db, query, [comment.description, comment.id]);
}
