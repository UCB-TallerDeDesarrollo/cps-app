angular.module('starter.services')
.factory('AppTools', function($sce, $ionicModal, $window ,$cordovaInAppBrowser, $ionicPlatform) {
  function createNewBrowser(options){
    var browserInstance = {
      title: '',
      destination: ''
    };
    $ionicModal.fromTemplateUrl('templates/in-app-browser-modal.html', options)
    .then(function(modal) {
      browserInstance.browser = modal;
      browserInstance.browser.hide();
    });

    browserInstance.openBrowser = function(link) {
      this.title = link;
      this.destination = $sce.trustAsResourceUrl(link);
      this.browser.show();
      // $cordovaInAppBrowser.open(link, '_self')
      // .then(function(event) {
      //   // success
      // })
      // .catch(function(event) {
      //   // error
      // });
    };

    browserInstance.closeBrowser = function() {
      this.destination = '';
      this.browser.hide();
      // $cordovaInAppBrowser.close();
    };

      $ionicPlatform.onHardwareBackButton(function() {
         browserInstance.closeBrowser();
      });

    browserInstance.getUriLength = function(){
      return (($window.innerWidth * 0.9)/6)-3;
    };
    return browserInstance;
  }
  return {
    newBrowser: function(options){
      return createNewBrowser(options);
    }
  };
});