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
    	question: "A major premise of Dr. Greene's approach is that challenging behavior is a form of developmental delay. What research supports this idea?",
    	answer: "Much of the research is, for better or worse (mostly worse) tied to specific diagnoses, but the link between lagging skills and challenging behavior is unequivocal.  For example, the association between ADHD and lagging executive skills (e.g., difficulty shifting cognitive set, doing things in a logical sequence, having a sense of time, maintaining focus, controlling one’s impulses) is well-established.  Equally well-established is the fact that kids with ADHD are at subsequent increased risk for other diagnoses (and much more serious challenging behavior), such as oppositional defiant disorder (temper outbursts, arguing with adults, and defiance) and conduct disorder (bullying, threatening, intimidating, fighting, physical aggression, stealing, destroying property, lying, truancy). There are also convincing data documenting increased rates of oppositional defiant disorder (ODD) and conduct disorder (CD) in kids with mood disorders (i.e.. those who have difficulty with skills related to the regulating of one’s emotions, including managing one’s emotional response to frustration so as to think rationally [separation of affect]), and in kids who are socially impaired (including skills such as accurately interpreting social cues, seeking attention in appropriate ways, appreciating how one’s behavior is affecting others, empathizing, and appreciating how one is being perceived by others).  The research literature has increasingly shown that kids with language processing delays (including skills such as considering a range of solutions to a problem; expressing concerns, needs, or thoughts in words; and understanding what is being said) are at significantly greater risk for ODD and CD as well. And there is a persuasive and growing literature documenting the very challenging behaviors that can accompany autism spectrum disorders and non-verbal learning disability (and the black-and-white, concrete, literal thinking that typifies these disorders). We’ve learned a lot about children’s brains in the last 30 years.  We now know how challenging kids come to be challenging. It’s time for our actions to reflect our knowledge."
    },{
    	question: "In Lost at School, you point out that kids with behavioral challenges aren’t usually challenging every second of every waking hour. Some kids are challenging at home and not at school, others at school and not at home, and others in both places. If it’s true that the kid is lacking skills, then why would he be lacking them in one place and not another? Isn’t the discrepancy in behavior between home and school proof that he’s choosing to behave one way in one place and another way in the other? Isn’t that a sign that the kid is doing well only when he wants to?",
    	answer: "Actually, it’s proof that challenging behavior is specific to certain conditions. Under what conditions does challenging behavior occur?  Those where skills are being required of the kid that he does not yet sufficiently possess or where problems arise that he hasn’t been able to solve.  But precisely where and when those conditions are present differs from kid to kid. Especially in cases where a kid is more challenging at home than school, it’s common for people to explain the disparity as the result of poor parenting.  That’s usually not true.  The school environment may have advantages that reduce the likelihood of challenging behavior in some kids.  School environments tend to be more structured and predictable than home environments, and this can reduce the likelihood of challenging behavior in some (but by no means all) challenging kids.  Often medicines that are helpful for reducing challenging behavior at school have worn off by the time the kid arrives at home.  And some kids are able to stay tightly wrapped during the school day and then completely unravel – some would say decompensate – the minute they’re back at home.  Of course, most of us look a lot better when we’re outside the home than when we’re inside it! Even when the reverse is true – if a kid’s challenges are greater at school than at home – it’s not uncommon for the finger to be pointed at parents (“Sure, the parents just let him do what he wants at home.  No wonder he doesn’t act up with them.”).  The more plausible and productive explanation is that the school is placing demands on the kid – for focused learning, organizing, sustained effort, and getting along with others – that may not be nearly as intense at home. This presents another opportunity for adults to stop pointing and start identifying lagging skills and unsolved problems."
    },{
    	question: "In Lost at School, you say that this model doesn’t require that adults suspend all of their expectations so a kid won’t exhibit challenging behavior. Care to say more about that?",
    	answer: "Sure thing. It would be impossible to teach, parent, or help kids without having expectations.  Dr. Greene's model does not involve dropping all expectations. But since you can’t fix everything at once, it makes sense to eliminate some low priority expectations (in other words, use Plan C) so the kid is more “available” to work on the higher priority expectations and problems that remain.  Just because you’re eliminating a given expectation now doesn’t mean you won’t come back to it once some higher priority expectations have been met. You will want to consider whether your expectations for each kid are truly realistic, and grade level and chronological age typically are not great indicators of a kid’s developmental readiness for a particular expectation.  We often place expectations on kids that we know they can’t meet, and then punish them when they handle our expectations as poorly as we suspected they would.  An unrealistic expectation is a challenging behavior waiting to happen."
    },{
    	question: "Do you believe in holding kids accountable for their actions?",
    	answer: "It depends on what you mean by “accountable.”  For some folks, holding a kid accountable for his actions simply means making sure he pays the price for his challenging behavior.  In the Dr. Greene&#8217;s model, holding a kid accountable means that the kid is participating in a process in which he’s identifying and articulating his own concerns or perspectives, taking yours into account, and working toward a realistic and mutually satisfactory solution.  One could make the case that Plan B is actually more effective at holding a kid accountable than Plan A, since the kid is participating in and actually thinking about a plan to reduce his challenging behavior (and taking your concerns into account) rather than merely being on the receiving end of imposed adult will and endless adult ingenuity."
    },{
    	question: "Shouldn’t I still be using consequences for challenging behavior – even if I don’t think they’re working – so the other kids know I’m taking the challenging behavior seriously?",
    	answer: "It’s your choice, but you don’t need to use consequences for the other kids to notice that you’re taking the problem seriously.  They need to see that you’ve got a handle on the challenging kid’s lagging skills and unsolved problems and that, slowly but surely, his challenging behaviors are decreasing.  You don’t improve your credibility by continuing to intervene in a way that isn’t working or is making things worse.  Consequences are useful for two things:  (1) teaching basic lessons about right and wrong and (2) giving kids the incentive to do well.  You’ll want to use consequences if you think one or both of these things are coming into play.  But kids with behavioral challenges already know the basic lessons about right and wrong and, because kids do well if they can, they already have the incentive to do well."
    },{
    	question: "Is it really fair to expect teachers – who are not trained as mental health professionals – to solve problems collaboratively?",
    	answer: "I don’t know what’s fair. I do know that teachers already have a lot on their plates.  I know that an astounding number of challenging kids are needlessly slipping through the cracks and losing their futures.  And I know that a mental health degree is not a prerequisite for solving problems collaboratively. Teachers have always taught non-academic skills to their students, skills related to handling life’s social, emotional, and behavioral challenges.  It’s just that some kids and some challenges require that teachers have a different mind-set and skill-set.  What are the key qualifications for helping kids with behavioral challenges?  An open mind, a willingness to reflect on one’s current practices and try on new lenses, the courage to experiment with new practices, and the patience and resolve to become comfortable assessing lagging skills and unsolved problems and using Plan B.  If it makes you feel any better, most mental health professionals don’t have training in solving problems collaboratively either."
    },{
    	question: "It seems like you think teachers should be all things to all kids.",
    	answer: "Not so, but kids with social, emotional, and behavior challenges could really use your help."
    },{
    	question: "Aren’t there some challenging kids who need meds?",
    	answer: "Yes, though nowhere near as many as are actually on meds.  The over-medicating of kids flows from an over-emphasis on diagnoses, the ease with which medications are prescribed, a lack of awareness of the true factors underlying kids’ challenging behavior, the failure to achieve a comprehensive understanding of a kid’s challenges, and a lack of knowledge of Plan B.  That said, there are some kids for whom psychotropic medication is an indispensable component of treatment and whose participation in Plan B is impossible without medication.  It’s crucial to differentiate between the things psychotropic medicine does well and the things psychotropic medicine does not do well lest, as is commonly the case, medicine be prescribed for things medicine does not do well.  Medicine is effective at reducing hyperactivity and poor impulse control; improving attention span; enhancing mood; reducing obsessive-compulsive behaviors and general anxiety; reducing tics; inducing sleep; and helping volatile, aggressive kids be less reactive.  Medicine does not teach skills.  Medicine does not help kids solve problems.  But it can help kids be more “available” to learn skills and solve problems."
    },{
    	question: "In the research literature, training cognitive skills to kids with challenging behavior often hasn’t fared very well. How is this model different?",
    	answer: "In the research literature (and in real life) cognitive skills training has often been conducted outside the environments in which a kid is having the greatest difficulty and by people the kid isn’t having difficulty with; for example, in the office of a guidance counselor, principal, or mental health professional; or in a researcher’s lab.  Skills taught in these artificial environments often haven’t generalized to the environments in which the kid was having difficulty.  In addition, the training has been done in a rote, circumscribed fashion using skills-training modules or curriculum that were not tailored to the specific lagging skills or unsolved problems of individual kids."
    },{
    	question: "Does this model help with kids on the autism spectrum?",
    	answer: "It’s often assumed that this model has no application to these kids, and that well-known applied behavior analysis methodology is really the only option. I beg to differ. “Autism spectrum” doesn’t say anything about the kid’s general cognitive functioning, and unless you’re ready to throw in the towel on teaching the kid lagging skills or helping him learn to solve problems – and hopefully, you’re not – then this model may well have a role to play. The most common obstacle is linguistic skills. As described above, you’ll want to focus first on helping the kid develop the skills to communicate his concerns (often through pictures or hand signals) in a very rudimentary manner. Then, if possible, you’ll want to focus (if it’s feasible) on helping the kid express these same concerns verbally. Along the way, you’ll be watching closely to see if there is some mechanism for the kid to participate in generating solutions."
    },{
    	question: "How does this model differ from other crisis management programs?",
    	answer: "While this model can help defuse a crisis, it’s not primarily a crisis management program. It’s a crisis prevention program. In other words, it’s good to know how to defuse and de-escalate during a crisis, but it’s far better to know how to prevent crises from occurring in the first place. No other learning disability is handled in crisis mode, and a crisis is clearly not the best time to address the lagging skills and unsolved problems underlying social, emotional, and behavioral challenges."
    },{
    	question: "How do poverty and culture impact the effectiveness of Dr. Greene's model?",
    	answer: "At the risk of seeming insensitive, I think poverty is over-rated as an explanation for challenging behavior in kids (in his seminal book, Schools Without Failure, Dr. William Glasser agreed). There are kids from impoverished circumstances who succeed. There are kids from wealthy backgrounds who don’t. Those who come from wealth often have parents who will stop at nothing to access good care and have the resources and wherewithal to find and pay for it. Some receive very poor care anyway. Data suggest that socioeconomic status is not a predictor of success with the model. I do think that people from similar backgrounds sometimes have an easier time connecting with and communicating with each other. But I’ve yet to run into an ethnic group whose members don’t value having their concerns heard and addressed. In fact, look any place in the world where there’s conflict right now and you’ll see one people whose concerns are being disregarded and another imposing its will. It’s very reliable."
    },{
    	question: "Does the this model apply to kids who shoot people in our schools?",
    	answer: "Kids who act on the idea of shooting people at school are clearly having difficulty coming up with more adaptive solutions to problems they’ve been unable to solve. In many instances where kids have resorted to extreme violence, people were surprised that the kid went to such extremes. But we all have what might be called a “threshold of adversity,” and we all have different levels of skill in dealing with adversity. When a person’s threshold of adversity exceeds their skills, the likelihood of violence is heightened. That’s why it’s crucial to keep the lines of communication open with every kid so you’re aware of his lagging skills and unsolved problems. Create a helping relationship. Work collaboratively toward solving the problems so the kid learns the skills."
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
