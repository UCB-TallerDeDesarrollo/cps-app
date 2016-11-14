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

  function updateChildsConcern(childConcern){
    var query = "";
    query = "UPDATE childs_concerns SET description = ?, unsolved_order = ? where id = ?";
    $cordovaSQLite.execute(db, query, [childConcern.description, childConcern.unsolved_order, childConcern.id]);
  }

  function deleteChildsConcern(childConcern, callback) {
    var query = "DELETE FROM childs_concerns where id = ?";
    $cordovaSQLite.execute(db, query, [childConcern.id]).then(function(res) {
      callback();
    }, function (err) {
        console.error(err);
    });
  }

  return {
    all: function(unsolvedProblemId,callback) {
      getChildConcerns(unsolvedProblemId,callback);
    },
    insert: function(childConcern) {
      insertChildsConcern(childConcern);
    },
    update: function(childsConcern) {
      updateChildsConcern(childsConcern);
    },
    delete: function(childsConcern, callback) {
      deleteChildsConcern(childsConcern, callback);
    }
  };
});
