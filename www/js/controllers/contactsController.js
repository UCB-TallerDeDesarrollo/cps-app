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
    $scope.userFriends;
    $scope.userFriendsRequest;
    $scope.userPendingSentRequest;
    $scope.searchResults;
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
      $state.go($state.current, {}, {reload: true});

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

    $scope.isPendingSentResquestShown = function() {
        return $scope.shownSentResquest === false;
    };

    $scope.togglePendingSentRequests = function() {
        if ($scope.isPendingSentResquestShown(false)) {
          $scope.shownSentResquest = true;
        } else {
          $scope.shownSentResquest = false;
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

    $scope.getFriendsRequests = function(){
      var user_id = localStorage.getItem("user_id");
      $http.get($link_root+'/users/'+user_id+'/friends_requests',

      {

        headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
        $scope.userFriendsRequest = data.data
      }).catch(error => {
        console.log(error.message);
      });
    }

    $scope.getPengingSentRequests = function(){
      var user_id = localStorage.getItem("user_id");
      $http.get($link_root+'/users/'+user_id+'/pendingRequests',
      {
        headers: { 'Authorization': localStorage.getItem("auth_token") },
      })
      .then(data => {
        $scope.userPendingSentRequest = data.data
        console.log($scope.userPendingSentRequest);
      }).catch(error => {
        console.log(error.message);
      });
    }

    $scope.getUserFriends = function(){
      var user_id = localStorage.getItem("user_id");
      $http.get($link_root+'/users/'+user_id+'/contacts',
      {
        headers: { 'Authorization': localStorage.getItem("auth_token") },
      })
      .then(data => {
          $scope.userFriends = data.data
      }).catch(error => {
        console.log(error.message);
      });
    }


    $scope.searchUser = function(search_options){
      console.log(search_options)
      $http.get($link_root+'/users/search?search_options='+search_options,

      {

        headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
          $scope.searchResults = data.data
      }).catch(error => {
        console.log(error.status);
      });
    }

    $scope.acceptFriendRequest = function(request_id){
      var user_id = localStorage.getItem("user_id");
      $http.post( $link_root +'/users/'+user_id+'/friends_requests/'+request_id+'/accept',
      {

      },
      {
      headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
        var alertForAcceptedRequest = $ionicPopup.alert({
          title: data.data.status,
          template: data.data.message,
        });
        alertForAcceptedRequest.then(function(res) {
          if (res) {
            $state.go($state.current, {}, {reload: true});
          }
        });
      },
        function(response) {
          console.log(response.data.message);
      });
    };

    $scope.rejectFriendRequest = function(request_id){
      var user_id = localStorage.getItem("user_id");
      $http.post( $link_root +'/users/'+user_id+'/friends_requests/'+request_id+'/reject',
      {

      },
      {
      headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
        var alertForAcceptedRequest = $ionicPopup.alert({
          title: data.data.status,
          template: data.data.message,
        });
        alertForAcceptedRequest.then(function(res) {
          if (res) {
            $state.go($state.current, {}, {reload: true});
          }
        });
      },
        function(response) {
          console.log(response.data.message);
      });
    };

    $scope.sendFriendRequest = function(friend_id){
      var user_id = localStorage.getItem("user_id");
      $http.post( $link_root +'/users/'+user_id+'/friends_requests?applicant_id='+friend_id,
      {

      },
      {
      headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
        var alertForSentRequest = $ionicPopup.alert({
          title: data.data.status,
          template: data.data.message,
        });

      },
        function(response) {
          console.log(response.data.message);
      });
    };

    $scope.confirmDeleteContact =function(friend_id){
      var alertForDeleteContact = $ionicPopup.confirm({
        title:"Delete contact",
        cancelText: "No",
        template: "Are you sure you want to delete this contact?",
        okText: 'Yes'
      });
      alertForDeleteContact.then(function(res) {
        if (res) {
          $scope.deleteContact(friend_id);
        }
      });
    }

    $scope.deleteContact = function(friend_id){
      var user_id = localStorage.getItem("user_id");
      $http.delete( $link_root +'/users/'+user_id+'/contacts/'+friend_id,
      {
      headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
        var alertForSentRequest = $ionicPopup.alert({
          title: data.data.status,
          template: data.data.message,
        });
        $state.go($state.current, {}, {reload: true});
      },
        function(response) {
          console.log(response.data.message);
      });
    };

});
