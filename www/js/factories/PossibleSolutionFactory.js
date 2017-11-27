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
  function getAllPairs(solutionId, callback) {
    var pairs = [];
    var query ="SELECT * FROM pair_childConcerntoadultConcern WHERE solution_id = ?";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          pairs.push(rows.item(i));
        }
        callback(pairs);
      }
    },function(err){console.log(err.message);});
  }
  function insertComment(comment){
    var now = new Date();
    var query ="INSERT INTO solution_comments(description,commented_at,solution_id) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[comment.description,now,comment.solutionId]);
  }


  function insertPair(pair,solution_id){

    var query ="INSERT INTO pair_childConcerntoadultConcern(description,description2,solution_id) VALUES (?,?,?)";
    $cordovaSQLite.execute(db,query,[pair.description,pair.description2,solution_id]);
  }

  function getLast(unsolved_problem_id,callback){
    var solutionLate = [];
    var query ="SELECT *FROM solutions WHERE unsolved_problem_id = ? ORDER BY id DESC LIMIT 1";
  $cordovaSQLite.execute(db,query,[unsolved_problem_id]).then(function(result) {
      var rows = result.rows;
         if(rows.length) {
           var solutionLate = result.rows.item(0);
           callback(solutionLate);
       }
    },function(err){
      console.log(err.message);
    });
  }


 function findPair(solutionId, callback){
    var pair=null;
    var query ="SELECT * FROM pair_childConcerntoadultConcern WHERE solution_id = ?";
    $cordovaSQLite.execute(db,query,[solutionId]).then(function(result){
      var rows = result.rows;
         if(rows.length) {
         pair = result.rows.item(0);
       }
       callback(pair);

    },function(err){
      console.log(err.message);

    });

  }

  function updateComment(comment){
    var query = "UPDATE solution_comments SET description = ? where id = ?";
    $cordovaSQLite.execute(db, query, [comment.description, comment.id]);
  }
  function updatePair(pair){
     var query = "UPDATE pair_childConcerntoadultConcern SET description = ?, description2 = ? where id = ?";
     $cordovaSQLite.execute(db, query, [pair.description,pair.description2, pair.id]);
   }


  return {
    all: function(unsolvedProblemId, callback){
      getAllSolutions(unsolvedProblemId, callback);
    },
    allPairs: function(solutionId, callback){
      getAllPairs(solutionId, callback);
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
    insertPair: function(pair,solution_id){
      insertPair(pair,solution_id);
    },
    findPair: function(solutionId,callback){
      findPair(solutionId,callback);
    },
    updatePair: function(pair){
      updatePair(pair);
    },
    getLast: function(solution,callback){
      getLast(solution,callback);
    },
    updateComment: function(comment){
      updateComment(comment);
    }
  };
});
