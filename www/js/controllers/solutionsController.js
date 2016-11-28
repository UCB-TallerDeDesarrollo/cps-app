angular.module('starter.controllers').controller('SolutionsCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicListDelegate,$cordovaSQLite, $ionicPopup, PossibleSolutionFactory ){
  $scope.comment = { solutionId: $stateParams.solutionId };

  PossibleSolutionFactory.find($stateParams.solutionId,function(solution){
    $scope.solution = solution;
  });

  $scope.comments = [];
  PossibleSolutionFactory.getComments($stateParams.solutionId,function(comments){
    $scope.comments = comments;
  });

  // getComments($stateParams.solutionId,$cordovaSQLite,function(comments){
  //   $scope.comments = comments;
  // });

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

  $scope.createComment = function(){
    if (!inputFieldIsEmpty($scope.comment.description)) {
      saveComment($cordovaSQLite,$scope.comment);
      PossibleSolutionFactory.getComments($stateParams.solutionId,function(comments){
        $scope.comments = comments;
      });
      $scope.comment.description = "";
      $scope.closeModal();
    }
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
    $ionicListDelegate.closeOptionButtons();
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

  $scope.showDeletionConfirm = function(comment) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete comment',
      template: 'Are you sure you want to delete this comment?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        var query = "DELETE FROM solution_comments where id = ?";
        $cordovaSQLite.execute(db, query, [comment.id]).then(function(res) {
            $scope.comments.splice($scope.comments.indexOf(comment), 1);
        }, function (err) {
            console.error(err);
        });
      }
    });
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

function saveComment(cordovaSQLite,comment){
  var now = new Date();
  var query ="INSERT INTO solution_comments(description,commented_at,solution_id) VALUES (?,?,?)";
  cordovaSQLite.execute(db,query,[comment.description,now,comment.solutionId]);
}

function updateComment(cordovaSQLite, comment){
  var query = "UPDATE solution_comments SET description = ? where id = ?";
  cordovaSQLite.execute(db, query, [comment.description, comment.id]);
}
