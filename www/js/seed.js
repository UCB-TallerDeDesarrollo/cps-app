angular.module('starter.seed', [])

.factory('DataSeed', function() {
  function seedLaggingSkills($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lagging_skills (id integer primary key autoincrement, description text, checked integer)");
    var sqlLaggingSkills = [
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty handling transitions, shifting from one mindset or task to another",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty doing things in a logical sequence or prescribed order",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty persisting on challenging or tedious task",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Poor sense of time",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty maintaining focus",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty considering the likely outcomes or consequences of actions (impulsive)",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty considering a range of solutions to a problem",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty expressing concerns, needs, or thoughts in word",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ( "Difficulty managing emotional response to frustration so as to think rationally",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Chronic irritability and/or anxiety significantly impede capacity for problem-solving or heighten frustration",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty seeing “grays”/concrete, literal, black & white, thinking",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty deviating from rules, routines",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty handling unpredictability, ambiguity, uncertainty, novelty",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty shifting from original idea, plan, or solut",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty taking into account situational factors that would suggest the need to adjust a plan of action",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty shifting from original idea, plan, or solution",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty taking into account situational factors that would suggest the need to adjust a plan of action",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Inflexible, inaccurate interpretations/cognitive distortions or biases (e.g., “Everyone’s out to get me,” “Nobody likes me,” “You always blame me, “It’s not fair,” “I’m stupid”)",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty attending to or accurately interpreting social cues/poor perception of social nuances",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty starting conversations, entering groups, connecting with people/lacking other basic social skills",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty seeking attention in appropriate way",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty appreciating how his/her behavior is affecting others",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty empathizing with others, appreciating another person’s perspective or point of view",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Difficulty appreciating how s/he is coming across or being perceived by others",0)',
      'INSERT INTO lagging_skills (description,checked) VALUES ("Sensory/motor difficulties",0)'];
      sqlLaggingSkills.forEach(function(item){
        $cordovaSQLite.execute(db, item);
      });
  }
  function seedUnsolvedProblems($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS unsolved_problems (id integer primary key autoincrement, description text, solved boolean, sort_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
  }
  function seedChildsConcerns($cordovaSQLite, db){
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS childs_concerns (id integer primary key autoincrement, description text, unsolved_problem_id integer, FOREIGN KEY (unsolved_problem_id) REFERENCES unsolved_problems (id))");
  }

  return {
    seed: function($cordovaSQLite, db) {
      seedLaggingSkills($cordovaSQLite, db);
      seedUnsolvedProblems($cordovaSQLite, db);
      seedChildsConcerns($cordovaSQLite,db);
      return;
    },
    deleteSeed: function($cordovaSQLite, db){
      $cordovaSQLite.execute(db, "DROP TABLE lagging_skills");
      $cordovaSQLite.execute(db, "DROP TABLE unsolved_problems");
      $cordovaSQLite.execute(db, "DROP TABLE childs_concerns");
    }
  };
});
