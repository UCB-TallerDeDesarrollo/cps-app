var link = "http://localhost:3000/signup";
angular.module('starter.controllers')
  .controller('UserCtrl', function($scope, $cordovaSQLite, $state, $window, $ionicActionSheet, $ionicListDelegate, $ionicPopup, $ionicModal, $stateParams, $filter, $timeout, $cordovaFileTransfer, $translate, $http) {
    $scope.user = {};
    $scope.user.names="";
    $scope.user.last_name="";
    $scope.user.phone="";
    $scope.user.email="";
    $scope.user.password="";
    $scope.user.password_confirmation="";
    $scope.emailRegularExpression = /\S+@\S+\.\S+/;
    $scope.anyStringRegExpression = /\S+/;
    $scope.passwordRegularExpression = /(?=\w*[A-Z])(?=\w*[a-z])(?=\w*[0-9])\S{8,}/;
    $ionicModal.fromTemplateUrl('templates/users/users-signup-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalSignup = modal;
      $scope.modalSignup.hide();
    });
    $scope.openModalSignup = function() {
      $scope.modalSignup.show();
      if(typeof analytics !== 'undefined') {
        analytics.trackView('Create user view');
      } else {
          console.log("Google Analytics Unavailable");
      }
    };
    $scope.closeModalSignup = function() {
      $scope.modalSignup.hide();
      $scope.user.names="";
      $scope.user.last_name="";
      $scope.user.phone="";
      $scope.user.email="";
      $scope.user.password="";
      $scope.user.password_confirmation="";
      $scope.activeChild={name:""};
      $ionicListDelegate.closeOptionButtons();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modalSignup.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.signup = function(){
      var number = $scope.user.phone.toString();
      var data = {name:$scope.user.names,
                  last_name:$scope.user.last_name,
                  email:$scope.user.email,
                  phone:number,
                  password:$scope.user.password,
                  password_confirmation:$scope.user.password
                };
      $http({
        method: 'POST',
        url: link,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: data
      })
      .then(function(response) {
        console.log(response.data.message);
        var alertForAccountCreated = $ionicPopup.alert({
            title: 'Success!',
            template: 'Your account has been crated.'
        });
      },
      function(response) {
        console.log(response.data.message);
      });
      $scope.closeModalSignup();
    };

    $scope.passwordInfoAlert = function(){
      var alertForNoActiveChild = $ionicPopup.alert({
          title: 'Password information',
          template: "Your password must have at least: "
                   + "<br><br>  - 8 caracters. "
                   + "<br>  - One capital letter. "
                   + "<br>  - One lower case letter. ",
      });
    }
});
