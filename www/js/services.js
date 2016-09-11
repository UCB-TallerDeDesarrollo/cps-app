angular.module('starter.services', [])

.factory('LaggingSkills', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var laggingSkills = [
    { name : "lagging_skill_1", description: "Difficulty handling transitions, shifting from one mindset or task to another", id:1 },
    { name : "lagging_skill_2", description: "Difficulty doing things in a logical sequence or prescribed order", id:2 },
    { name : "lagging_skill_3", description: "Difficulty persisting on challenging or tedious task", id:3 },
    { name : "lagging_skill_4", description: "Poor sense of time", id:4 },
    { name : "lagging_skill_5", description: "Difficulty maintaining focus", id:5 },
    { name : "lagging_skill_6", description: "Difficulty considering the likely outcomes or consequences of actions (impulsive)", id:6 },
    { name : "lagging_skill_7", description: "Difficulty considering a range of solutions to a problem", id:7 },
    { name : "lagging_skill_8", description: "Difficulty expressing concerns, needs, or thoughts in word", id:8 },
    { name : "lagging_skill_9", description: "Difficulty managing emotional response to frustration so as to think rationally", id:9 },
    { name : "lagging_skill_10", description: "Chronic irritability and/or anxiety significantly impede capacity for problem-solving or heighten frustration", id:10 },
    { name : "lagging_skill_11", description: "Difficulty seeing “grays”/concrete, literal, black & white, thinking", id:11 },
    { name : "lagging_skill_12", description: "Difficulty deviating from rules, routines", id:12 },
    { name : "lagging_skill_13", description: "Difficulty handling unpredictability, ambiguity, uncertainty, novelty", id:13 },
    { name : "lagging_skill_14", description: "Difficulty shifting from original idea, plan, or solut", id:14 },
    { name : "lagging_skill_15", description: "Difficulty taking into account situational factors that would suggest the need to adjust a plan of action", id:15 },
    { name : "lagging_skill_16", description: "Difficulty shifting from original idea, plan, or solution", id:16 },
    { name : "lagging_skill_17", description: "Difficulty taking into account situational factors that would suggest the need to adjust a plan of action", id:17 },
    { name : "lagging_skill_18", description: "Inflexible, inaccurate interpretations/cognitive distortions or biases (e.g., “Everyone’s out to get me,” “Nobody likes me,” “You always blame me, “It’s not fair,” “I’m stupid”)", id:18 },
    { name : "lagging_skill_19", description: "Difficulty attending to or accurately interpreting social cues/poor perception of social nuances", id:19 },
    { name : "lagging_skill_20", description: "Difficulty starting conversations, entering groups, connecting with people/lacking other basic social skills", id:20 },
    { name : "lagging_skill_21", description: "Difficulty seeking attention in appropriate way", id:21 },
    { name : "lagging_skill_22", description: "Difficulty appreciating how his/her behavior is affecting others", id:22 },
    { name : "lagging_skill_23", description: "Difficulty empathizing with others, appreciating another person’s perspective or point of view", id:23 },
    { name : "lagging_skill_24", description: "Difficulty appreciating how s/he is coming across or being perceived by others", id:24 },
    { name : "lagging_skill_25", description: "Sensory/motor difficulties", id:25 }
  ];

  return {
    all: function() {
      return laggingSkills;
    },
    remove: function(laggingSkills) {
      laggingSkillss.splice(laggingSkills.indexOf(laggingSkills), 1);
    },
    get: function(laggingSkillsId) {
      for (var i = 0; i < laggingSkillss.length; i++) {
        if (laggingSkillss[i].id === parseInt(laggingSkillsId)) {
          return laggingSkillss[i];
        }
      }
      return null;
    }
  };
})

.factory('UnsolvedProblems', function() {
  // Temporary unsolved problem lists
  var unsolvedProblems = [];
  return {
    all: function() {
      return unsolvedProblems;
    },
    insert: function(desc) {
      unsolvedProblems.push({description:desc});
    }
  };
})


.factory('DataSeed', function() {
  return {
    seed: function($cordovaSQLite, db) {
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lagging_skills (id integer primary key, description text)");
      return;
    },
    deleteSeed: function($cordovaSQLite, db){
      $cordovaSQLite.execute(db, "DROP TABLE lagging_skills");
    }
  };
})

.factory('HelpCategoriesStep1',function(){
  // First Step help categories and data

  var helpCategoriesForStep1 = [
    {name : "help_category_01" , description : "The kid isn’t talking", id:1,
      topics: [
        {name: "topic_01", description: "Maybe the unsolved problem wasn’t free of challenging behavior, or it wasn’t specific, or it contained an adult theory, or it was 'clumped'?", id:"1"},
        {name: "topic_02", description: "Maybe you are using Emergency B (in the heat of the moment when the kid is already upset) instead of Proactive B?", id:"2"},
        {name: "topic_03", description: "Maybe you are using Plan A?", id:"3"},
        {name: "topic_04", description: "Maybe s/he really doesn’t know/hasn’t been asked about this before", id:"4"},
        {name: "topic_05", description: "Maybe s/he needs the problem broken down into its component parts:", id:"5"},
        {name: "topic_06", description: "Maybe s/he needs time to think", id:"6"},
        {name: "topic_07", description: "Maybe s/he doesn’t have the words to tell you", id:"7"},
        {name: "topic_08", description: "My kid won’t talk to me", id:"8"},
        {name: "topic_09", description: "Talking about talking", id:"9"}
      ]
    },

      {name : "help_category_02", description : "My kid is too young to do CPS", id:2,
        topics: [
          {name: "topic_01", description: "Solving Problems Collaboratively with Young Children:", id:"1"},
          {name: "topic_02", description: "Can you use Plan B with young kids?", id:"2"},
        ]
      },
      {name : "help_category_03", description : "The kid talked but I don’t know what to do with what s/he said", id:3,
        topics:[
          {name: "topic_01", description: "Can you use Plan B with young kids?", id:"1"},
        ]
    }
  ];
  return {
    all: function() {
      return helpCategoriesForStep1;
    },
    remove: function(helpCategoryForStep1) {
      helpCategoriesForStep1.splice(helpCategoriesForStep1.indexOf(helpCategoryForStep1), 1);
    },
    get: function(helpCategoriesForStep1Id) {
      for (var i = 0; i < helpCategoriesForStep1.length; i++) {
        if (helpCategoriesForStep1[i].id === parseInt(helpCategoriesForStep1Id)) {
          return helpCategoriesForStep1[i];
        }
      }
      return null;
    }
  };
});
