angular.module('starter.services').factory('AdultConcernFactory', function($cordovaSQLite) {

  return {
    all: function(unsolvedProblemId,callback) {
      getAdultsConcerns(unsolvedProblemId,callback);
    },
    insert: function(adultsConcern) {
      insertAdultsConcern(adultsConcern);
    },
    update: function(adultsConcern) {
      updateAdultsConcern(adultsConcern);
    },
    delete: function(adultsConcern, callback) {
      deleteAdultsConcern(adultsConcern, callback);
    }
  };
});
