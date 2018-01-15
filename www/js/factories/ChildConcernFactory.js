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



  function getPair(callback){
    var pair = [];
    var query ="SELECT * FROM pair_childConcerntoadultConcern";
    $cordovaSQLite.execute(db,query)
    .then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          pair.push(rows.item(i));
        }
      }
      callback(pair);
    },function(err) {
        console.log(err.message);
    });

   }

   function updateChildsConcernPair(ChildsConcernDescription,pair){
     var query = "UPDATE pair_childConcerntoadultConcern SET description = ?, description2 = ? where id = ?";
     $cordovaSQLite.execute(db, query, [ChildsConcernDescription,pair.description2, pair.id]);
    }

  function deleteChildsConcern(childConcern, callback) {
    var query = "DELETE FROM childs_concerns where id = ?";
    $cordovaSQLite.execute(db, query, [childConcern.id]).then(function(res) {
      callback();
    }, function (err) {
        console.error(err);
    });
  }

  function deleteChildsConcernPair(pair) {
    var query = "DELETE FROM pair_childConcerntoadultConcern where id = ?";
    $cordovaSQLite.execute(db, query, [pair.id]);
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
    getPair: function(callback){
     getPair(callback);
    },
    updateChildsConcernPair: function(ChildsConcernDescription,pair) {
       updateChildsConcernPair(ChildsConcernDescription,pair);
    },
    deleteChildsConcernPair: function(pair) {
      deleteChildsConcernPair(pair);
   },
    delete: function(childsConcern, callback) {
      deleteChildsConcern(childsConcern, callback);
    }
  };
});
