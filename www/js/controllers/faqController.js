angular.module('starter.controllers')
.controller('FaqCtrl', function($scope) {

  $scope.toggleQuestion = function(question) {
    if ($scope.isQuestionShown(question)) {
      $scope.shownQuestion = null;
    } else {
      $scope.shownQuestion = question;
    }
  };
  $scope.isQuestionShown = function(question) {
    return $scope.shownQuestion === question;
  };

  $scope.challengingKidsQuestions = [
    {
      question:"Why are challenging kids challenging?",
      answer:"Because they’re lacking the skills not to be challenging. If they had the skills, they wouldn’t be challenging. That’s because –and this is perhaps the key theme of the model – Kids do well if they can. And because (here’s another key theme) Doing well is preferable to not doing well. This, of course, is a dramatic departure from the view of challenging kids as attention-seeking, manipulative, coercive, limit-testing, and poorly motivated. It’s a completely di erent set of lenses, supported by research in the neurosciences over the past 30-40 years, and it has dramatic implications for how caregivers go about helping such kids."
    },{
      question:"When are challenging kids challenging?",
      answer:"When the demands or expectations being placed upon them exceed the skills that they have to respond adaptively. Of course, that’s when we all respond maladaptively: when we’re lacking the skills to respond adaptively. Thus, an important goal for helpers is to identify the skills a challenging kid is lacking. An even more important goal is to identify the speci c expectations a kid is having di culty meeting, referred to as unsolved problems... and to help kids solve those problems. Because unsolved problems tend to be highly predictable, the problem-solving should be proactive most of the time. Identifying lagging skills and unsolved problems is accomplished through use of an instrument called the Assessment of Lagging Skills and Unsolved Problems (ALSUP). You can  nd the ALSUP in The Paperwork section of the website of Lives in the Balance, the nonpro t Dr. Greene founded to help disseminate his approach (livesinthebalance.org)."
    },{
      question:"What behaviors do challenging kids exhibit when they don’t have the skills to respond adaptively to certain demands?",
      answer:"Challenging kids communicate that they’re struggling to meet demands and expectations in some fairly common ways: whining, pouting, sulking, withdrawing, crying, screaming, swearing, hitting, spitting, kicking, throwing, lying, stealing, and so forth. But what a kid does when he’s having trouble meeting demands and expectations isn’t the most important part (though it may feel that way). Why and when he’s doing these things are much more important."
    },{
      question:"What should we be doing di erently to help these kids better than we’re helping them now?",
      answer:"If challenging behavior is set in motion by lagging skills and not lagging motivation, then it’s easy to understand why rewarding and punishing a kid may not make things better. Since challenging behavior occurs in response to highly predictable unsolved problems, then the goal is to solve those problems. But if we solve them unilaterally, through imposition of adult will (referred to in the model as “Plan A”), then we’ll only increase the likelihood of challenging episodes and we won’t solve any problems durably. Better to solve those problems collaboratively (“Plan B”) so the kid is a fully invested participant, solutions are more durable, and (over time) the kid -- and often the adults as well -- learn the skills they were lacking all along. Plan B is comprised of three basic ingredients. The  rst ingredient – called the Empathy step – involves gathering information from the child so as to achieve the clearest understanding of his or her concern or perspective on a given unsolved problem. The second ingredient (called the De ne Adult Concerns step) involves entering into consideration the adult concern or perspective on the same unsolved problem. The third ingredient (called the Invitation step) involves having the adult and kid brainstorm solutions so as to arrive at a plan of action that is both realistic and mutually satisfactory...in other words, a solution that addresses the concerns of both parties and that both parties can actually perform."
    },{
      question:"Where can I learn more about this model?",
      answer:"The Lives in the Balance website is a very good place to start. It has a ton of free resources to help you learn about and apply Dr. Greene's approach, including streaming video, audio programming, commentary, support, and lots more."
    },{
      question:"Isn't this the same model as what was previously known as Collaborative Problem Solving?",
      answer:"Dr. Greene is the originator of the Collaborative Problem Solving approach, and for many years referred to his model by that name in his research papers, scholarly articles, books, and workshops. He now calls his model Collaborative & Proactive Solutions (CPS). Be careful! There are others using the name Collaborative Problem Solving out there, but they had nothing to do with the origination or development of Dr. Greene's model and are not associated with Dr. Greene or Lives in the Balance in any way!"
    }
  ];
  $scope.modelQuestions = [
    {
      question:"One",
      answer:"Answ 1"
    },{
      question:"Two",
      answer:"Answ 2"
    }
  ];
  $scope.plansQuestions = [
    {
      question:"One",
      answer:"Answ 1"
    },{
      question:"Two",
      answer:"Answ 2"
    }
  ];
  $scope.classroomQuestions = [
    {
      question:"One",
      answer:"Answ 1"
    },{
      question:"Two",
      answer:"Answ 2"
    }
  ];
  $scope.policiesAndPracticesQuestions = [
    {
      question:"One",
      answer:"Answ 1"
    },{
      question:"Two",
      answer:"Answ 2"
    }
  ];
});
