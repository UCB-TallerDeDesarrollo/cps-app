var link = "";
angular.module('starter.controllers')
  .controller('UserCtrl', function($scope, $cordovaSQLite, $state, $window, $ionicActionSheet, $ionicListDelegate, $ionicPopup, $ionicModal, $stateParams, $filter, $timeout, $cordovaFileTransfer, $translate, $http,$ionicHistory) {
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
    $scope.get_user_info = function(){
      var email = localStorage.getItem("email")
      $http.get($link_root+'/users/me',

      {

        headers: { 'Authorization': localStorage.getItem("auth_token") },

      })
      .then(data => {
          if(data.data!=null){
           localStorage.setItem("user_name",data.data.name + ' ' + data.data.last_name);
           localStorage.setItem("user_id",data.data.id);
           
           window.plugins.OneSignal.sendTag("User_Id", localStorage.user_id);
          }
      }).catch(error => {
        console.log(error.status);
      });

  }
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
    $ionicModal.fromTemplateUrl('templates/users/users-login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalLogin = modal;
      $scope.modalLogin.hide();
    });
    $scope.openModalLogin = function() {
      $scope.modalLogin.show();
      if(typeof analytics !== 'undefined') {
        analytics.trackView('Log in view');
      } else {
          console.log("Google Analytics Unavailable");
      }
    };
    $scope.closeModalLogin = function() {
      $scope.modalLogin.hide();
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
      $scope.modalLogin.remove();
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
      var email = $scope.user.email;
      console.log("Link raiz: "+ $link_root);
      $translate([
        "SuccessTitle",
        "AcountCreatedSuccessfully"        
      ]).then(function(translations) {
        $http.post($link_root+'/signup',
        {
          name:$scope.user.names,
          last_name:$scope.user.last_name,
          email:$scope.user.email,
          phone:number,
          password:$scope.user.password,
          password_confirmation:$scope.user.password

        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
        })
        .then(data => {
          console.log(data.data.auth_token);
          localStorage.setItem("auth_token",data.data.auth_token);
          localStorage.setItem("email",email);
          var alertForAccountCreated = $ionicPopup.alert({
                  title: translations.SuccessTitle,
                  template: translations.AcountCreatedSuccessfully
              });
          $scope.get_user_info();
        }).catch(error => {
          console.log(error.status);
        });
        $scope.closeModalSignup();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.childs',{reload: true});
      })
    };

    $scope.login = function(){
      $translate([
        "LoginSuccessful",
        "WelcomeBackMessage",
        "ErrorTitle",
        "IncorrectUserOrPassword"
      ]).then(function(translations) {
        var email = $scope.user.email;
        $http.post($link_root+'/auth/login',
        {
          email:$scope.user.email,
          password:$scope.user.password,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
        })
        .then(data => {
          console.log(data.data);
          localStorage.setItem("auth_token",data.data.auth_token);
          localStorage.setItem("email",email);
          var alertForAccountCreated = $ionicPopup.alert({
                  title: translations.LoginSuccessful,
                  template: translations.WelcomeBackMessage
              });
              $scope.get_user_info();
        }).catch(error => {
          var alertForAccountCreated = $ionicPopup.alert({
            title: translations.ErrorTitle,
            template: translations.IncorrectUserOrPassword
          });
          console.log(error.status);
        });
        $scope.closeModalLogin();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.childs',{reload: true});
      })
    };

    $scope.passwordInfoAlert = function(){
    $translate(['passwordInfo','passwordMustHave','passwordCondition1','passwordCondition2','passwordCondition3']).then (function(translations){
      var alertForNoActiveChild = $ionicPopup.alert({
          title: translations.passwordInfo,
          template: translations.passwordMustHave
                   + "<br><br>  - 8 " + translations.passwordCondition1
                   + "<br>  - " + translations.passwordCondition2
                   + "<br>  - " + translations.passwordCondition3,
      });
    });
    }

    $scope.checkConnection = function(){
      console.log("Entro");
      if(window.Connection) {
      if(navigator.connection.type == Connection.NONE)
      { 
        var alertNotConnection = $ionicPopup.alert({
          title: 'Required Connection',
          template: "Internet access is required to view this page. Please check your internet settings and try again."
        });
       
      }}
  }
});
