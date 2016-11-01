angular.module('starter.services').factory('ChildConcernFactory', function($cordovaSQLite) {

  function getChildConcerns(unsolvedProblemId,callback) {
    var childConcerns = [];
    var query ="SELECT * FROM childs_concerns WHERE unsolved_problem_id = ? ORDER BY unsolved_order";
    $cordovaSQLite.execute(db,query,[unsolvedProblemId])
    .then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          childConcerns.push(rows.item(i));
        }
      }
      callback(childConcerns);
    },function(err) {
        console.log(err.message);
    });
  }
  // ============== COMO USAR EL METODO
  // ChildConcernFactory.all(unsolvedProblemID,function(result){
  //   $scope.childConcerns = result;
  // });

  return {
    all: function(unsolvedProblemId,callback) {
      getChildConcerns(unsolvedProblemId,callback);
    },
    insert: function(childConcern) {
      saveChildConcern(childConcern);
    },
    update: function(childConcern) {
      updateChildConcern(childConcern);
    },
    delete: function(childConcernId, callback) {
      deleteChildConcern(childConcern, callback);
    },
    find: function(childConcernId, callback){
      findChildConcern(childConcernId, callback);
    }
  };
});
