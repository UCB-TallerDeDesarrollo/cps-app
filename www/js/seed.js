angular.module('starter.seed', [])

.factory('DataSeed', function() {
  function seedLaggingSkills($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lagging_skills (id integer primary key autoincrement, description text)");
  }
  function seedUnsolvedProblems($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS unsolved_problems (id integer primary key autoincrement, description text, solved boolean)");
  }
  return {
    seed: function($cordovaSQLite, db) {
      seedLaggingSkills($cordovaSQLite, db);
      seedUnsolvedProblems($cordovaSQLite, db);
      return;
    },
    deleteSeed: function($cordovaSQLite, db){
      $cordovaSQLite.execute(db, "DROP TABLE lagging_skills");
      $cordovaSQLite.execute(db, "DROP TABLE unsolved_problems");
    }
  };
});
