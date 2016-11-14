angular.module('starter.services').factory('ChildrenFactory', function($cordovaSQLite) {
  // function saveUnsolvedProblem(unsolvedProblem){
  //   var query = "INSERT INTO unsolved_problems(description, solved, unsolved_order, child_id) VALUES (?,?,?,?)";
  //   $cordovaSQLite.execute(db, query, [unsolvedProblem.description, 0, unsolvedProblem.unsolved_order,unsolvedProblem.child_id]);
  // }

  function getChildren(callback) {
    var children = [];
    var query ="SELECT * FROM childs";
    $cordovaSQLite.execute(db,query)
    .then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          children.push(rows.item(i));
        }
      }
      callback(children);
    },function(err) {
        console.log(err.message);
    });
  }

  function getActiveChild(callback){
    var activeChild = {first_name:''};
    var query ="SELECT * FROM childs WHERE active = 1";
    $cordovaSQLite.execute(db,query).then(function(result) {
      if(result.rows.length > 0){
        activeChild = result.rows.item(0);
        callback(activeChild);
      }
    },function(err){
      console.log(err.message);
    });
  }

  function activateChild(childId,callback){
    var query = "UPDATE childs SET active = 1 where id = ?";
    $cordovaSQLite.execute(db,query,[childId]).then(function(result){
      callback();
    });
  }
  function deactivateChildren(callback){
    var query = "UPDATE childs SET active = 0";
    $cordovaSQLite.execute(db,query).then(function(result){
      callback();
    });
  }

  function deleteChild(child,callback){
    var query = "DELETE FROM childs where id = ?";
    $cordovaSQLite.execute(db, query, [child.id]).then(function(res) {
        callback();
    }, function (err) {
        console.error(err);
    });
  }
  // function updateUnsolvedProblem(unsolvedProblem){
  //   var query = "UPDATE unsolved_problems SET description = ?, unsolved_order = ? where id = ?";
  //   var params = [unsolvedProblem.description, unsolvedProblem.unsolved_order, unsolvedProblem.id];
  //   $cordovaSQLite.execute(db, query, params);
  // }

  // function findUnsolvedProblem(unsolvedProblemId, callback){
  //   var query =" SELECT * FROM unsolved_problems where id = ? ";
  //   $cordovaSQLite.execute(db,query,[unsolvedProblemId])
  //   .then( function(result) {
  //       callback(result);
  //   },
  //   function(error){
  //     console.log(error);
  //   });
  // }

  return {
    all: function(callback) {
      getChildren(callback);
    },
    active: function(callback){
      getActiveChild(callback);
    },
    activate: function(childId,callback){
      deactivateChildren(function(){
        activateChild(childId,callback);
      });
    },
    delete:  function(child,callback){
      deleteChild(child,callback);
    // },
    // insert: function(unsolvedProblem) {
    //   saveUnsolvedProblem(unsolvedProblem);
    // },
    // update: function(unsolvedProblem){
    //   updateUnsolvedProblem(unsolvedProblem);
    // },
    // delete: function(unsolvedProblem, callback){
    //   deleteUnsolvedProblem(unsolvedProblem, callback);
    // },
    // find: function(unsolvedProblemId, callback){
    //   findUnsolvedProblem(unsolvedProblemId, callback);
    }
  };
});
