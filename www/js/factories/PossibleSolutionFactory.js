angular.module('starter.services').factory('PossibleSolutionFactory', function($cordovaSQLite) {

  function findSolutionByID(solutionId, callback){
    var solution = {};
    var query ="SELECT * FROM solutions WHERE id = ?";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
      solution = result.rows.item(0);
      callback(solution);
    },
    function(err){
      console.log(err.message);
    });
  }

  function getAllSolutions(unsolvedProblemId, callback) {
    var solutions = [];
    var query ="SELECT * FROM solutions WHERE unsolved_problem_id = ?";
    $cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          solutions.push(rows.item(i));
        }
        callback(solutions);
      }
    },function(err){
      console.log(err.message);
    });
    return solutions;
  }
  function insertSolution(solution){
    var query ="INSERT INTO solutions(description,unsolved_problem_id,rating) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[solution.description, solution.unsolvedProblemId, solution.rating]);
  }

  function updateSolution(solution){
    var query = "UPDATE solutions SET description = ? where id = ?";
    $cordovaSQLite.execute(db, query, [solution.description, solution.id]);
  }

  function deleteSolution(solutionId, callback){
    var query = "DELETE FROM solutions where id = ?";
    $cordovaSQLite.execute(db, query, [solutionId]).then(function(res) {
        callback();
    }, function (err) {
        console.error(err);
    });
  }

  return {
    all: function(unsolvedProblemId, callback) {
      getAllSolutions(unsolvedProblemId, callback);
    },
    insert: function(possibleSolution){
      insertSolution(possibleSolution);
    },
    find: function(callback){
      findSolutionByID(callback);
    },
    delete:  function(solutionId, callback){
      deleteSolution(solutionId, callback);
    },
    update: function(possibleSolution){
      updateSolution(possibleSolution);
    }
  };
});
