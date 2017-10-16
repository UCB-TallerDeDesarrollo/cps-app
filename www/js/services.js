angular.module('starter.services', ['ngCordova'])

.factory('LaggingSkills', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array
  function getLaggingSkills(child_id, callback){
    var lagging_skills = [];
    var query ="SELECT * FROM lagging_skills WHERE child_id = ?";
    $cordovaSQLite.execute(db,query,[child_id]).then(function(result) {
      var rows = result.rows;
      if(rows.length) {
        for(var i=0; i < rows.length; i++){
          lagging_skills.push(rows.item(i));
        }
        callback(lagging_skills);
      }
      },function(err){
        console.log(err.message);
      });
  }
  function uncheckLaggingSkill(lagginSkillId,child_id){
    console.log("Controller out Child id:" + child_id);
    var query = "UPDATE lagging_skills SET checked = 0 where id = ?";
    $cordovaSQLite.execute(db,query,lagginSkillId);
    var query2 = "UPDATE childs SET lagging_skills_check = lagging_skills_check - 1 where id = ?";
    $cordovaSQLite.execute(db,query2,child_id);

  }
  function checkLaggingSkill(lagginSkillId,child_id){
    var query = "UPDATE lagging_skills SET checked = 1 where id = ?";
    $cordovaSQLite.execute(db,query,lagginSkillId);
    console.log("Services Child id: " + child_id);
    var query2 = "UPDATE childs SET lagging_skills_check = lagging_skills_check + 1 where id = ?";
    $cordovaSQLite.execute(db,query2,child_id);
  }

  return {
    all: function(callback, childId) {
      getLaggingSkills(callback, childId);
    },
    get: function(laggingSkillList,laggingSkillsId) {
      for (var i = 0; i < laggingSkillList.length; i++) {
        if (laggingSkillList[i].id === parseInt(laggingSkillsId)) {
          return laggingSkillList[i];
        }
      }
      return null;
    },
    check: function(laggingskillId, child_id){
      checkLaggingSkill(laggingskillId, child_id);
    },
    uncheck: function(laggingskillId, child_id){
      uncheckLaggingSkill(laggingskillId, child_id);
    },
    getChecked: function(laggingSkillList){
        var laggingSkillsCheckedList = [];
        for (var i = 0; i < laggingSkillList.length; i++) {
          if (laggingSkillList[i].checked === 1) {
            laggingSkillsCheckedList.push(laggingSkillList[i]);
          }
        }
        return laggingSkillsCheckedList;
    },
    getCheckedCount: function(laggingSkillList){
      var laggingSkillsCheckedCount = 0;
      
      for (var i = 0; i < laggingSkillList.length; i++) {
        if (laggingSkillList[i].checked === 1) {
          laggingSkillsCheckedCount = laggingSkillsCheckedCount + 1;
        }
      }
      return laggingSkillsCheckedCount;
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
    {name : "help_category_01" , description : "The kid isn’t talking", image: "category_1.png",id:1,
      topics: [
        {name: "topic_01", description: "Maybe the unsolved problem wasn’t free of challenging behavior, or it wasn’t specific, or it contained an adult theory, or it was 'clumped'?", id:"1"},
        {name: "topic_02", description: "Maybe you are using Emergency B (in the heat of the moment when the kid is already upset) instead of Proactive B?", id:"2",
          contents: [
            {name: "content_01", description: "Make an appointment", link:"http://www.blogtalkradio.com/dr-ross-greene/2011/05/24/parenting-challenging-kids-collaborative-problem-solving-at-home", id:"1"},
            {name: "content_02", description: "What's the best thing to do in the heat of the moment", link: "http://www.blogtalkradio.com/dr-ross-greene/2016/01/25/the-heat-of-the-moment",id:"2"},
            {name: "content_03", description: "What to do when your child is in the midst of an outburst", link: "http://www.blogtalkradio.com/dr-ross-greene/2015/03/30/the-heat-of-the-moment", id:"3"}
          ]
        },
        {name: "topic_03", description: "Maybe you are using Plan A?", id:"3"},
        {name: "topic_04", description: "Maybe s/he really doesn’t know/hasn’t been asked about this before", id:"4"},
        {name: "topic_05", description: "Maybe s/he needs the problem broken down into its component parts:", id:"5",
          contents: [
            {name: "content_01", description: "EXAMPLE: So writing the answers to the questions on the science quiz is hard for you…but you’re not sure why. Let’s think about the different parts of answering questions on the science quiz. First, you have to understand what the question is asking. Is that part hard for you? Next, you need to think of the answer to the question. Is that part hard? Next, you have to remember the answer long enough to write it down. Are you having trouble with that part? Then you have to actually do the writing. Any trouble with that part?”", id:"1"}
          ]
        },
        {name: "topic_06", description: "Maybe s/he needs time to think", id:"6"},
        {name: "topic_07", description: "Maybe s/he doesn’t have the words to tell you", id:"7",
          contents: [
            {name: "content_01", description: "Give your kid the fingers",link:"http://www.blogtalkradio.com/dr-ross-greene/2016/03/14/give-your-kid-the-fingers", id:"1"}
          ]
        },
        {name: "topic_08", description: "My kid won’t talk to me", id:"8", link:"http://www.blogtalkradio.com/dr-ross-greene/2010/09/21/parenting-challenging-kids-collaborative-problem-s"},
        {name: "topic_09", description: "Talking about talking", id:"9", link:"http://www.blogtalkradio.com/dr-ross-greene/2013/05/20/parenting-your-challenging-child"}
      ]
    },

      {name : "help_category_02", description : "My kid is too young to do CPS",image: "category_2.png", id:2,
        topics: [
          {name: "topic_01", description: "Solving problems collaboratively with young children", id:"1",link:"http://www.blogtalkradio.com/dr-ross-greene/2010/04/27/parenting-challenging-kids-collaborative-problem-s"},
          {name: "topic_02", description: "Can you use Plan B with young kids?", id:"2", link:"http://www.blogtalkradio.com/dr-ross-greene/2011/03/08/parenting-challenging-kids-collaborative-problem-solving-at-home"},
        ]
      },
      {name : "help_category_03", description : "The kid talked but I don’t know what to do with what s/he said", image: "category_3.png", id:3,
        topics:[
          {name: "topic_01", description: "Are you confused?", id:"1",
            contents: [
              {name: "content_01", description: "Use REFLECTIVE LISTENING AND CLARIFYING STATEMENTS - Reflective listening basically involves mirroring what a child has said and then encouraging him/her to provide additional information by saying one of the following: • “How so?” • “I don’t quite understand” • “I’m confused” • “Can you say more about that?” • “What do you mean?” Reflective listening is your “default” drilling strategy…if you aren’t sure of which strategy to use or what to say next, use this strategy.", id:"1"}
            ]
          },
          {name: "topic_02", description: "Need more information?", id:"2",
            contents: [
              {name: "content_01", description: "ASK ABOUT THE WHO, WHAT, WHERE/WHEN OF THE UNSOLVED PROBLEM EXAMPLES: • “Who was making fun of your clothes?” • “What’s getting the way of completing the science project?”• “Where is Eddie bossing you around?”", id:"1"},
              {name: "content_02", description: "ASK ABOUT WHY THE PROBLEM OCCURS UNDER SOME CONDITIONS AND NOT OTHERS EXAMPLE: “You seem to be doing really well in your work group in math…but not so well in your work group in social studies…what’s getting in the way in social studies?”", id:"2"},
              {name: "content_03", description: "ASK THE CHILD WHAT S/HE’S THINKING IN THE MIDST OF THE UNSOLVED PROBLEM Notice, this is different than asking the child what s/he is feeling, which doesn’t usually provide much information about the child’s concern or perspective on an unsolved problem.  EXAMPLE: “What were you thinking when Mrs. Thompson told the class to get to work on the science quiz?”", id:"3"}
            ]
          },
          {name: "topic_03", description: "The child said something that is different than I what observed?", id:"3",
            contents: [
              {name: "content_01", description: "Make a DISCREPANT OBSERVATION - This involves making an observation that differs from what the child is describing about a particular situation, and it’s the riskiest (in terms of causing the child to stop talking) of all the drilling strategies. EXAMPLE: “I know you’re saying that you haven’t been having any difficulty with Chad on the playground lately, but I recall a few times last week when you guys were having a big disagreement about the rules in the box-ball game. What do you think was going on with that?”", id:"1"}
            ]
          },
          {name: "topic_04", description: "The child said some concerns but I think there are more!", id:"4",
            contents: [
              {name: "content_01", description: "Use TABLING (AND ASKING FOR MORE CONCERNS) This is where you’re “shelving” some concerns the child has already expressed so as to permit consideration of other concerns. EXAMPLE: “So if Timmy wasn’t sitting too close to you, and Robbie wasn’t making noises, and the floor wasn’t dirty, and the buttons in your pants weren’t bothering you…is there anything else that would make it difficult for you to participate in Morning Meeting?”", id:"1"}
            ]
          },

          {name: "topic_05", description: "I’m not sure I’m done with Step 1", id:"5",
            contents: [
              {name: "content_01", description: "SUMMARIZE AND ASK FOR MORE CONCERNS This is where you’re summarizing concerns you’ve already heard about and then asking if there are any other concerns that haven’t yet been discussed. This is the recommended strategy to use before moving on to the Define Adult Concerns step. EXAMPLE: “Let me make sure I understand all of this correctly. It’s hard for you to do your social studies worksheet for homework because writing down the answers is still hard for you…and because sometimes you don’t understand the question…and because Mrs. Langley hasn’t yet covered the material on the worksheet. Is there anything else that’s hard for you about completing the social studies worksheet for homework?”", id:"1"},
              {name: "content_02", description: "When you’ve summarized and asked for more concerns, and the child has none, you are done with Step 1", id:"2"}
            ]
        },
          {name: "topic_06", description: "I don’t know how to drill", id:"6",
            contents: [
              {name: "content_01", description: "Drilling video", link:"http://livesinthebalance.org/step-three-fourth-video", id:"1"},
              {name: "content_02", description: "Creative drilling",link:"http://www.blogtalkradio.com/dr-ross-greene/2015/10/05/creative-drilling", id:"2"},
              {name: "content_03", description: "Can’t solve problems without identifying a kids’ concern",link:"http://www.blogtalkradio.com/dr-ross-greene/2011/10/25/parenting-your-challenging-child", id:"3"}

            ]
        }

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
    },

    getContent: function(helpCategoriesForStep1Id, contentForTopicsId) {
      for (var i = 0; i < helpCategoriesForStep1.length; i++) {
        if (helpCategoriesForStep1[i].id === parseInt(helpCategoriesForStep1Id)) {
          var category = helpCategoriesForStep1[i].topics;
          for (var j = 0; j < category.length; j++) {
            if (category[j].id === contentForTopicsId)
              return category[j];
          }
        }
      }
      return null;
    },
  };
});
