angular.module('starter.seed', [])

.factory('DataSeed', function() {
  function seedLaggingSkills($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lagging_skills (id integer primary key autoincrement, description text, checked integer, child_id integer)");
  }

  function seedChilds($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS childs (id integer primary key autoincrement, first_name text, last_name text, active integer default 0);");
    $cordovaSQLite.execute(db, "ALTER TABLE  childs ADD COLUMN unsolved_problems integer default 0");
    $cordovaSQLite.execute(db, "ALTER TABLE  childs ADD COLUMN lagging_skills_check integer default 0");
  }

  function seedUnsolvedProblems($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS unsolved_problems (id integer primary key autoincrement, description text, solved boolean, unsolved_order integer, unsolved_score integer default 0, child_id integer);");
  }
  function seedChildsConcerns($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS childs_concerns (id integer primary key autoincrement, description text, unsolved_problem_id integer, unsolved_order integer , FOREIGN KEY (unsolved_problem_id) REFERENCES unsolved_problems (id))");
  }

  function seedAdultsConcerns($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS adults_concerns (id integer primary key autoincrement, description text, unsolved_problem_id integer, FOREIGN KEY (unsolved_problem_id) REFERENCES unsolved_problems (id))");
  }

  function seedSolutions($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS solutions (id integer primary key autoincrement, description text, unsolved_problem_id integer, rating integer, FOREIGN KEY (unsolved_problem_id) REFERENCES adults_concerns (id))");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS solution_comments (id integer primary key autoincrement, description text, commented_at date, solution_id integer, FOREIGN KEY (solution_id) REFERENCES solutions (id))");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pair_childConcerntoadultConcern (id integer primary key autoincrement, description text,description2 text, solution_id integer, FOREIGN KEY (solution_id) REFERENCES solutions (id))");
  }

  return {
    seed: function($cordovaSQLite, db) {
      seedLaggingSkills($cordovaSQLite, db);
      seedUnsolvedProblems($cordovaSQLite, db);
      seedChildsConcerns($cordovaSQLite, db);
      seedAdultsConcerns($cordovaSQLite, db);
      seedSolutions($cordovaSQLite, db);
      seedChilds($cordovaSQLite,db);
      return;
    },
    deleteSeed: function($cordovaSQLite, db) {
      $cordovaSQLite.execute(db, "DROP TABLE lagging_skills");
      $cordovaSQLite.execute(db, "DROP TABLE unsolved_problems");
      $cordovaSQLite.execute(db, "DROP TABLE childs_concerns");
      $cordovaSQLite.execute(db, "DROP TABLE adults_concerns");
      $cordovaSQLite.execute(db, "DROP TABLE solutions");
      $cordovaSQLite.execute(db, "DROP TABLE solution_comments");
      $cordovaSQLite.execute(db, "DROP TABLE pair_childConcerntoadultConcern");
      $cordovaSQLite.execute(db, "DROP TABLE childs");
    }
  };
});
