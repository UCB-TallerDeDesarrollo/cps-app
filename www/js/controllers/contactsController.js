angular
  .module("starter.controllers")
  .controller("ContactsCtrl", function(
    $scope,
    $cordovaSQLite,
    $state,
    $window,
    $ionicActionSheet,
    $ionicListDelegate,
    $ionicPopup,
    $ionicModal,
    $stateParams,
    $filter,
    $timeout,
    $cordovaFileTransfer,
    UnsolvedProblemFactory,
    ChildrenFactory,
    $translate,
    $http,
    LaggingSkills,
    AdultConcernFactory,
    ChildConcernFactory,
    PossibleSolutionFactory
  ) {
    ChildrenFactory.all(function(children) {
      $scope.childs = children;
    });
    $scope.contact = {};
    $scope.contact.mail = "";
    $ionicModal
      .fromTemplateUrl("templates/contacts/add-contact-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        $scope.modalCreate = modal;
        $scope.modalCreate.hide();
      });
    $scope.openModalAddContact = function() {
      $scope.modalCreate.show();
    };

    $scope.closeModalAddContact = function() {      
      $scope.modalCreate.hide();
      $scope.contact.mail = "";
      $ionicListDelegate.closeOptionButtons();
    };

      $scope.searchInit = function() {
        if ($stateParams.searchWord) {
          $scope.searchWord = $stateParams.searchWord;
        }
      };

    $scope.isAcceptedShown = function() {
    return $scope.shownAccepted === false;
    };

    $scope.toggleAccepted = function() {
        if ($scope.isAcceptedShown(false)) {
            $scope.shownAccepted = true;
        } else {
            $scope.shownAccepted = false;
        }
    };

    $scope.isResquestShown = function() {
        return $scope.shownResquest === false;
    };

    $scope.toggleRequest = function() {
        if ($scope.isResquestShown(false)) {
          $scope.shownResquest = true;
        } else {
          $scope.shownResquest = false;
        }
    };

    $scope.isPendingShown = function() {
        return $scope.shownPending === false;
    };

    $scope.togglePending = function() {
      if ($scope.isPendingShown(false)) {
        $scope.shownPending = true;
      } else {
        $scope.shownPending = false;
      }
    };
});
