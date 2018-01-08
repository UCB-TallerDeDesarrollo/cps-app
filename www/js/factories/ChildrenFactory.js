angular.module('starter.services').factory('ChildrenFactory', function($cordovaSQLite, $ionicPopup, $translate) {

  showNameAlert = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'The name is too big!!',
    template: 'Please try again.'
  });

  alertPopup.then(function(res) {

  });
};



var date = new Date();

  function saveChild(child,callback){
    if (child.first_name.length > 60) {
      showNameAlert();
      return;
    }
    var query = "INSERT INTO childs(first_name,active, unsolved_problems, lagging_skills_check) VALUES (?,1,0,0)";
    $cordovaSQLite.execute(db,query,[child.first_name]).then(function(){
      callback();
    });
  }
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


  function updateChild(child){

    var query = "UPDATE childs SET first_name = ? where id = ?";
    var params = [child.first_name,  child.id];
    $cordovaSQLite.execute(db, query, params);
  }

  return {
    all: function(callback) {
      getChildren(callback);
    },
    insert: function(child,callback){
      saveChild(child,callback);
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
    },
    update: function(child){
      updateChild(child);
    }
  };
});
