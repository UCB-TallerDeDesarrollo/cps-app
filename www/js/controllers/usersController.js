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
    $scope.passwordRegularExpression = /(?=\w*[A-Z])(?=\w*[a-z])\S{5,}/;
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
      $scope.user.name="";
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
      $scope.user.names="Samuel";
      $scope.user.last_name="Veizaga";
      $scope.user.phone= 67429995 ;
      $scope.user.email="samuel@hotmail.com";
      $scope.user.password="password";
      $scope.user.password_confirmation="password";
      var number = $scope.user.phone.toString();
      var link = "http://localhost:3000/signup";
      var data = JSON.stringify({name : $scope.user.names,
                  last_name : $scope.user.last_name,
                  email : $scope.user.email,
                  phone : number,
                  password : $scope.user.password,
                  password_confirmation : $scope.user.password
                });
      $http.post(link, data)
      .then(function (res){
         console.log(res);
       });
      // $http({
      //   url: 'http://localhost:3000/signup',
      //   method: "POST",
      //   dataType: 'JSON',
      //   data: JSON.stringify({
      //     'name' : $scope.user.names,
      //     'last_name' : $scope.user.last_name,
      //     'email' : $scope.user.email,
      //     'phone' : number,
      //     'password' : $scope.user.password,
      //     'password_confirmation' : $scope.user.password
      //   })
      // })
      // .then(function(response) {
      //   console.log(response);
      // },
      // function(response) { // optional
      //   console.log(response);
      // });
    };

});
