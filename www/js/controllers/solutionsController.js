angular.module('starter.controllers').controller('SolutionsCtrl', function($scope, $state, $stateParams, $ionicModal, $ionicListDelegate,$cordovaSQLite, $ionicPopup, PossibleSolutionFactory, $translate, $http){
  $scope.comment = { solutionId: $stateParams.solutionId };

  $scope.pair = { solutionId: $stateParams.solutionId };


  PossibleSolutionFactory.find($stateParams.solutionId,function(solution){
    $scope.solution = solution;
  });

  PossibleSolutionFactory.findPair($stateParams.solutionId,function(pairs){
    $scope.pairs = pairs;
  });

  $scope.comments = [];
    $scope.pairs = [];

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
    if(typeof analytics !== 'undefined') {
      analytics.trackView('New possible solution view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };
  $scope.closeModal = function() {
    $scope.modalCreate.hide();
    $ionicListDelegate.closeOptionButtons();
    $scope.comment = { solutionId: $stateParams.solutionId };
  };

  $scope.createComment = function(){
    if (!inputFieldIsEmpty($scope.comment.description)) {
      PossibleSolutionFactory.insertComment($scope.comment);
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
      PossibleSolutionFactory.updateComment($scope.editableComment);
      $scope.modalEdit.hide();
      $scope.commentEdit = {};
      PossibleSolutionFactory.getComments($stateParams.solutionId,function(comments){
        $scope.comments = comments;
      });
    }
    else {
      $scope.emptyInput = true;
    }
  };

  $scope.showDeletionConfirm = function(comment) {
    $translate(['DeleteCommentTitle','DeleteCommentBody', 'CancelOption','YesMessage']).then (function(translations){
    var confirmPopup = $ionicPopup.confirm({
      title: translations.DeleteCommentTitle,
      template: translations.DeleteCommentBody,
      cancelText: translations.CancelOption,
      okText: translations.YesMessage
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

  $scope.sharedCommentSolutions;

    $scope.getSharedPosibleSolutions = function(posible_solution_id) {
        console.log(posible_solution_id);
        $http.get($link_root +"/solution_commentaries/"+posible_solution_id, {
            headers: { Authorization: localStorage.getItem("auth_token") }
          })
          .then(data => {
            $scope.sharedCommentSolutions = data.data;
            console.log($scope.sharedCommentSolutions);
          })
          .catch(error => {
            console.log(error.message);
          });
      };
});
