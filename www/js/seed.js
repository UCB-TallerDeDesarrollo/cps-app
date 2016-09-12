angular.module('starter.seed', [])

.factory('DataSeed', function() {
  function seedLaggingSkills($cordovaSQLite, db){
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lagging_skills (id integer primary key autoincrement, description text)");
    var sqlLaggingSkills = ['INSERT INTO lagging_skills (description) VALUES ( "Difficulty handling transitions, shifting from one mindset or task to another")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty doing things in a logical sequence or prescribed order")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty persisting on challenging or tedious task")',
      'INSERT INTO lagging_skills (description) VALUES ( "Poor sense of time")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty maintaining focus")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty considering the likely outcomes or consequences of actions (impulsive)")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty considering a range of solutions to a problem")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty expressing concerns, needs, or thoughts in word")',
      'INSERT INTO lagging_skills (description) VALUES ( "Difficulty managing emotional response to frustration so as to think rationally")',
      'INSERT INTO lagging_skills (description) VALUES ("Chronic irritability and/or anxiety significantly impede capacity for problem-solving or heighten frustration",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty seeing “grays”/concrete, literal, black & white, thinking",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty deviating from rules, routines",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty handling unpredictability, ambiguity, uncertainty, novelty",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty shifting from original idea, plan, or solut",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty taking into account situational factors that would suggest the need to adjust a plan of action",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty shifting from original idea, plan, or solution",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty taking into account situational factors that would suggest the need to adjust a plan of action",)',
      'INSERT INTO lagging_skills (description) VALUES ("Inflexible, inaccurate interpretations/cognitive distortions or biases (e.g., “Everyone’s out to get me,” “Nobody likes me,” “You always blame me, “It’s not fair,” “I’m stupid”)",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty attending to or accurately interpreting social cues/poor perception of social nuances",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty starting conversations, entering groups, connecting with people/lacking other basic social skills",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty seeking attention in appropriate way",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty appreciating how his/her behavior is affecting others",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty empathizing with others, appreciating another person’s perspective or point of view",)',
      'INSERT INTO lagging_skills (description) VALUES ("Difficulty appreciating how s/he is coming across or being perceived by others",)',
      'INSERT INTO lagging_skills (description) VALUES ("Sensory/motor difficulties")'];
      sqlLaggingSkills.forEach(function(item){
        $cordovaSQLite.execute(db, item);
      });
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
