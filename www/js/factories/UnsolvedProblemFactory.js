angular.module('starter.services').factory('UnsolvedProblemFactory', function($cordovaSQLite) {
  function saveUnsolvedProblem(unsolvedProblem){
    var query = "INSERT INTO unsolved_problems(description, solved, unsolved_order, child_id) VALUES (?,?,?,?)";
    $cordovaSQLite.execute(db, query, [unsolvedProblem.description, 0, unsolvedProblem.unsolved_order,unsolvedProblem.child_id]);
    var query2 = "UPDATE childs SET unsolved_problems = unsolved_problems + 1 where id = ?";
    $cordovaSQLite.execute(db,query2,[unsolvedProblem.child_id]);
/*  
    var query_unsolved_problems ="SELECT unsolved_problems FROM childs WHERE id = ?";
    params_child_id = [unsolvedProblem.child_id];
    $cordovaSQLite.execute(db,query_unsolved_problems, params_child_id).then(function(result) {
      if(result.rows.length > 0){
        child_unsolved_problems = result.rows.item(0).unsolved_problems;
        child_unsolved_problems = child_unsolved_problems + 1;
        var query_update_child = "UPDATE childs SET unsolved_problems = ? where id = ?";
        var params = [child_unsolved_problems, unsolvedProblem.child_id];
        $cordovaSQLite.execute(db,query_update_child,params);
      }
    });
*/
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

    var query2 = "UPDATE childs SET unsolved_problems = unsolved_problems - 1 where id = ?";
    $cordovaSQLite.execute(db,query2,[unsolvedProblem.child_id]);
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
