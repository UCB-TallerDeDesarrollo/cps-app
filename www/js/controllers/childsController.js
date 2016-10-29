angular.module('starter.controllers')
  .controller('ChildsCtrl', function($scope, $cordovaSQLite, $state, $ionicActionSheet, $ionicListDelegate, $ionicPopup, $ionicModal, $stateParams) {

    $ionicModal.fromTemplateUrl('templates/child/create-child-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalCreate = modal;
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
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

});
