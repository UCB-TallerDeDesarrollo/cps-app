angular.module('starter.services').factory('ChildrenFactory', function($cordovaSQLite, $ionicPopup) {

  showNameAlert = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'The name is too big!!',
    template: 'please try again.'
  });

  alertPopup.then(function(res) {

  });
};


showDateAlert = function() {
var alertPopup = $ionicPopup.alert({
  title: 'Invalid Birth date!!',
  template: 'Please insert a date prior to today&#39;s date.'
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
    date.setDate(date.getDate() + 1);
    if (child.birthday > date  ) {
      showDateAlert();
      return;
    }

    if (child.birthday <= date) {
      var query = "INSERT INTO childs(first_name,gender,birthday,active, unsolved_problems, lagging_skills_check) VALUES (?,?,?,1,0,0)";
      $cordovaSQLite.execute(db,query,[child.first_name,child.gender,child.birthday]).then(function(){
        callback();
      });
    }

  }
  function getChildren(callback) {
    var children = [];
    var query ="SELECT * FROM childs";
    $cordovaSQLite.execute(db,query)
    .then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          var childID = rows.item(i).id;
          updateUnsolvedProblemCount(childID);
          updateLaggingSkillsCheckCount(childID);
        }
      }
    });
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

  function updateUnsolvedProblemCount(childID){
    var queryUP ="SELECT * FROM unsolved_problems WHERE child_id =?";
          $cordovaSQLite.execute(db, queryUP, [childID]).then(function(res) {
              var UP = res.rows;
              if (UP.length>0){
                  child_ID_ID = childID;
                 // console.log("childdren: " +child_ID_ID+" UP: "+ UP.length);
                  var queryUpdateUP = "UPDATE childs SET unsolved_problems = ? where id = ?";
                  $cordovaSQLite.execute(db,queryUpdateUP,[UP.length,child_ID_ID]);
              }else{
                  child_ID_ID = childID;
                  //console.log("childdren: " +child_ID_ID+" UP: "+ UP.length);               
                  var queryUpdateUP = "UPDATE childs SET unsolved_problems = ? where id = ?";
                  $cordovaSQLite.execute(db,queryUpdateUP,[UP.length,child_ID_ID]);                
              }           
          });
  }

  function updateLaggingSkillsCheckCount(childID){
    var queryLS ="SELECT * FROM lagging_skills WHERE child_id =? AND checked =1 ";
          $cordovaSQLite.execute(db, queryLS, [childID]).then(function(res) {
              var LS = res.rows;
              if (LS.length>0){
                  child_ID_ID = LS.item(0).child_id;
                  //console.log("childdren: " +child_ID_ID+" LS: "+ LS.length);
                  var queryUpdateLS = "UPDATE childs SET lagging_skills_check = ? where id = ?";
                  $cordovaSQLite.execute(db,queryUpdateLS,[LS.length,child_ID_ID]);
              }else{
                  child_ID_ID = childID;
                  //console.log("childdren: " +child_ID_ID+" LS: "+ LS.length);
                  var queryUpdateLS = "UPDATE childs SET lagging_skills_check = ? where id = ?";
                  $cordovaSQLite.execute(db,queryUpdateLS,[LS.length,child_ID_ID]);            
              }           
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
    if (child.birthday > date) {
      showDateAlert();
      return;
    }
    var query = "UPDATE childs SET first_name = ?, gender = ? , birthday = ? where id = ?";
    var params = [child.first_name, child.gender, child.birthday, child.id];
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
