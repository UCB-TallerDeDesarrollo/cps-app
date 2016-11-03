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

  function insertChildsConcern(childsConcern){
    var query ="INSERT INTO childs_concerns(description,unsolved_problem_id,unsolved_order) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[childsConcern.description,childsConcern.unsolvedProblemId,childsConcern.unsolvedOrder]);
  }

  function updateChildsConcern(childsConcern){
    var query = "";
    query = "UPDATE childs_concerns SET description = ?, unsolved_order = ? where id = ?";
    $cordovaSQLite.execute(db, query, [childsConcern.description, childsConcern.unsolved_order, childsConcern.id]);
  }

  return {
    all: function(unsolvedProblemId,callback) {
      getChildConcerns(unsolvedProblemId,callback);
    },
    insert: function(childConcern) {
      insertChildsConcern(childConcern);
    },
    update: function(childConcern) {
      updateChildsConcern(childConcern);
    },
    delete: function(childConcernId, callback) {
      deleteChildConcern(childConcern, callback);
    },
    find: function(childConcernId, callback){
      findChildConcern(childConcernId, callback);
    }
  };
});

// ============== COMO USAR EL METODO
// ChildConcernFactory.all(unsolvedProblemID,function(result){
//   $scope.childConcerns = result;
// });
