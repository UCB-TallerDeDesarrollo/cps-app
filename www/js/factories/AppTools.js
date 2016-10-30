angular.module('starter.services')
.factory('AppTools', function($sce, $ionicModal, $window) {
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
    };

    browserInstance.closeBrowser = function() {
      this.destination = '';
      this.browser.hide();
    };

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
