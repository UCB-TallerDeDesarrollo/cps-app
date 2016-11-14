angular.module('starter.services').factory('UnsolvedProblemFactory', function($cordovaSQLite) {
  function saveUnsolvedProblem(unsolvedProblem){
    var query = "INSERT INTO unsolved_problems(description, solved, unsolved_order, child_id) VALUES (?,?,?,?)";
    $cordovaSQLite.execute(db, query, [unsolvedProblem.description, 0, unsolvedProblem.unsolved_order,unsolvedProblem.child_id]);
  }

  function getUnsolvedProblems(childId,callback) {
    var unsolved_problems = [];
    var query ="SELECT * FROM unsolved_problems WHERE child_id = ? ORDER BY unsolved_order";
    $cordovaSQLite.execute(db,query,[childId]).then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          unsolved_problems.push(rows.item(i));
        }
      }
      callback(unsolved_problems);
      },function(err){
        console.log(err.message);
      });
    return unsolved_problems;
  }

  function updateUnsolvedProblem(unsolvedProblem){
    var query = "UPDATE unsolved_problems SET description = ?, unsolved_order = ? where id = ?";
    var params = [unsolvedProblem.description, unsolvedProblem.unsolved_order, unsolvedProblem.id];
    $cordovaSQLite.execute(db, query, params);
  }

  function deleteUnsolvedProblem(unsolvedProblem, callback){
    var query = "DELETE FROM unsolved_problems where id = ?";
    $cordovaSQLite.execute(db, query, [unsolvedProblem.id]).then(function(res) {
      callback();
    }, function (err) {
        console.error(err.message);
    });
  }

  function findUnsolvedProblem(unsolvedProblemId, callback){
    var query =" SELECT * FROM unsolved_problems where id = ? ";
    $cordovaSQLite.execute(db,query,[unsolvedProblemId])
    .then( function(result) {
        callback(result);
    },
    function(error){
      console.log(error);
    });
  }

  return {
    all: function(childId,callback) {
      getUnsolvedProblems(childId,callback);
    },
    insert: function(unsolvedProblem) {
      saveUnsolvedProblem(unsolvedProblem);
    },
    update: function(unsolvedProblem){
      updateUnsolvedProblem(unsolvedProblem);
    },
    delete: function(unsolvedProblem, callback){
      deleteUnsolvedProblem(unsolvedProblem, callback);
    },
    find: function(unsolvedProblemId, callback){
      findUnsolvedProblem(unsolvedProblemId, callback);
    }
  };
});
