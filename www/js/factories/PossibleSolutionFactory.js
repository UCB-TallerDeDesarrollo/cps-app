angular.module('starter.services').factory('PossibleSolutionFactory', function($cordovaSQLite) {

  function findSolution(solutionId, callback){
    var solution = {};
    var query ="SELECT * FROM solutions WHERE id = ?";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
      solution = result.rows.item(0);
      callback(solution);
    },function(err){
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
    }, function (err) {console.error(err);});
  }

  function getCommentsForSolution(solutionId,callback){
    var comments = [];
    var query ="SELECT * FROM solution_comments WHERE solution_id = ? ORDER BY commented_at DESC";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          comments.push(rows.item(i));
        }
        callback(comments);
      }
    },function(err){console.log(err.message);});
  }

  function insertComment(comment){
    var now = new Date();
    var query ="INSERT INTO solution_comments(description,commented_at,solution_id) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[comment.description,now,comment.solutionId]);
  }


  function insertPair(pair){

    var query ="INSERT INTO pair_childConcerntoadultConcern(description,description2,solution_id) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[pair.description,pair.description2,pair.solutionId]);
  }


  function findPair(solutionId, callback){
    var pair = {};
    var query ="SELECT * FROM pair_childConcerntoadultConcern WHERE id = ?";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
      pair = result.rows.item(0);
      callback(pair);
    },function(err){
      console.log(err.message);
    });
  }



  function updateComment(comment){
    var query = "UPDATE solution_comments SET description = ? where id = ?";
    $cordovaSQLite.execute(db, query, [comment.description, comment.id]);
  }

  return {
    all: function(unsolvedProblemId, callback){
      getAllSolutions(unsolvedProblemId, callback);
    },
    insert: function(possibleSolution){
      insertSolution(possibleSolution);
    },
    update: function(possibleSolution){
      updateSolution(possibleSolution);
    },
    delete:  function(solutionId, callback){
      deleteSolution(solutionId, callback);
    },
    find: function(solutionId, callback){
      findSolution(solutionId, callback);
    },
    getComments: function(solutionId, callback){
      getCommentsForSolution(solutionId, callback);
    },
    insertComment: function(comment){
      insertComment(comment);
    },
    insertPair: function(pair){
      insertPair(pair);
    },
    findPair: function(solutionId, callback){
      findPair(solutionId, callback);
    },
    updateComment: function(comment){
      updateComment(comment);
    }
  };
});
