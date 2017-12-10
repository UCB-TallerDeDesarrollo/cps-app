angular.module('starter.services').factory('HelpInformationFactory', function() {

  var step1Help = [
    {
      name : "help_category_01",
      description : "The child isn’t talking",
      image: "category_1.png",
      id:1,
      topics: [
        {
          name: "topic_01",
          description: "Maybe the unsolved problem wasn’t free of challenging behavior, or it wasn’t specific, or it contained an adult theory, or it was 'clumped'?",
          id:"1"
        },
        {
          name: "topic_02",
          description: "Maybe you are using Emergency B (in the heat of the moment when the child is already upset) instead of Proactive B?",
          id:"2",
          contents: [
            {
              name: "content_01",
              description: "Make an appointment",
              link:"http://www.blogtalkradio.com/dr-ross-greene/2011/05/24/parenting-challenging-kids-collaborative-problem-solving-at-home",
              id:"1"
            },
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
            {name: "content_01", description: "Give your child the fingers",link:"http://www.blogtalkradio.com/dr-ross-greene/2016/03/14/give-your-kid-the-fingers", id:"1"}
          ]
        },
        {name: "topic_08", description: "My child won’t talk to me", id:"8", link:"http://www.blogtalkradio.com/dr-ross-greene/2010/09/21/parenting-challenging-kids-collaborative-problem-s"},
        {name: "topic_09", description: "Talking about talking", id:"9", link:"http://www.blogtalkradio.com/dr-ross-greene/2013/05/20/parenting-your-challenging-child"}
      ]
    },
    {
      name : "help_category_02",
      description : "My child is too young to do CPS",
      image: "category_2.png",
      id:2,
      topics: [
        {name: "topic_01", description: "Solving problems collaboratively with young children", id:"1",link:"http://www.blogtalkradio.com/dr-ross-greene/2010/04/27/parenting-challenging-kids-collaborative-problem-s"},
        {name: "topic_02", description: "Can you use Plan B with young childs?", id:"2", link:"http://www.blogtalkradio.com/dr-ross-greene/2011/03/08/parenting-challenging-kids-collaborative-problem-solving-at-home"},
      ]
    },
    {
      name : "help_category_03",
      description : "The child talked but I don’t know what to do with what s/he said",
      image: "category_3.png",
      id:3,
      topics:[
        {
          name: "topic_01", description: "Are you confused?", id:"1",
          contents: [
            {name: "content_01", description: "Use REFLECTIVE LISTENING AND CLARIFYING STATEMENTS - Reflective listening basically involves mirroring what a child has said and then encouraging him/her to provide additional information by saying one of the following: • “How so?” • “I don’t quite understand” • “I’m confused” • “Can you say more about that?” • “What do you mean?” Reflective listening is your “default” drilling strategy…if you aren’t sure of which strategy to use or what to say next, use this strategy.", id:"1"}
          ]
        },
        {
          name: "topic_02", description: "Need more information?", id:"2",
          contents: [
            {name: "content_01", description: "ASK ABOUT THE WHO, WHAT, WHERE/WHEN OF THE UNSOLVED PROBLEM EXAMPLES: • “Who was making fun of your clothes?” • “What’s getting the way of completing the science project?”• “Where is Eddie bossing you around?”", id:"1"},
            {name: "content_02", description: "ASK ABOUT WHY THE PROBLEM OCCURS UNDER SOME CONDITIONS AND NOT OTHERS EXAMPLE: “You seem to be doing really well in your work group in math…but not so well in your work group in social studies…what’s getting in the way in social studies?”", id:"2"},
            {name: "content_03", description: "ASK THE CHILD WHAT S/HE’S THINKING IN THE MIDST OF THE UNSOLVED PROBLEM Notice, this is different than asking the child what s/he is feeling, which doesn’t usually provide much information about the child’s concern or perspective on an unsolved problem.  EXAMPLE: “What were you thinking when Mrs. Thompson told the class to get to work on the science quiz?”", id:"3"}
          ]
        },
        {
          name: "topic_03", description: "The child said something that is different than I what observed?", id:"3",
          contents: [
            {name: "content_01", description: "Make a DISCREPANT OBSERVATION - This involves making an observation that differs from what the child is describing about a particular situation, and it’s the riskiest (in terms of causing the child to stop talking) of all the drilling strategies. EXAMPLE: “I know you’re saying that you haven’t been having any difficulty with Chad on the playground lately, but I recall a few times last week when you guys were having a big disagreement about the rules in the box-ball game. What do you think was going on with that?”", id:"1"}
          ]
        },
        {
          name: "topic_04", description: "The child said some concerns but I think there are more!", id:"4",
          contents: [
            {name: "content_01", description: "Use TABLING (AND ASKING FOR MORE CONCERNS) This is where you’re “shelving” some concerns the child has already expressed so as to permit consideration of other concerns. EXAMPLE: “So if Timmy wasn’t sitting too close to you, and Robbie wasn’t making noises, and the floor wasn’t dirty, and the buttons in your pants weren’t bothering you…is there anything else that would make it difficult for you to participate in Morning Meeting?”", id:"1"}
          ]
        },
        {
          name: "topic_05", description: "I’m not sure I’m done with Step 1", id:"5",
          contents: [
            {name: "content_01", description: "SUMMARIZE AND ASK FOR MORE CONCERNS This is where you’re summarizing concerns you’ve already heard about and then asking if there are any other concerns that haven’t yet been discussed. This is the recommended strategy to use before moving on to the Define Adult Concerns step. EXAMPLE: “Let me make sure I understand all of this correctly. It’s hard for you to do your social studies worksheet for homework because writing down the answers is still hard for you…and because sometimes you don’t understand the question…and because Mrs. Langley hasn’t yet covered the material on the worksheet. Is there anything else that’s hard for you about completing the social studies worksheet for homework?”", id:"1"},
            {name: "content_02", description: "When you’ve summarized and asked for more concerns, and the child has none, you are done with Step 1", id:"2"}
          ]
        },
        {
          name: "topic_06", description: "I don’t know how to drill", id:"6",
          contents: [
            {name: "content_01", description: "Drilling video", link:"http://livesinthebalance.org/step-three-fourth-video", id:"1"},
            {name: "content_02", description: "Creative drilling",link:"http://www.blogtalkradio.com/dr-ross-greene/2015/10/05/creative-drilling", id:"2"},
            {name: "content_03", description: "Can’t solve problems without identifying a childs’ concern",link:"http://www.blogtalkradio.com/dr-ross-greene/2011/10/25/parenting-your-challenging-child", id:"3"}
          ]
        }
      ]
    }
  ];
  var step2Help = [
    {
      title:"DEFINE THE PROBLEM STEP | INGREDIENT/GOAL",
      content:"Enter the concern of the second party (often the adult) into consideration"
    },
    {
      title:"WORDS | Initial Inquiry (neutral observation)",
      content:"The thing is (insert adult concern)…. or My concern is (insert adult concern)…"
    },
    {
      title:"WHAT YOU'RE THINKING",
      content:"Have I been clear about my concern? Does the child understand what I have said?"
    },
    {
      title:"DON'T",
      content:"Start talking about solutions yet. Sermonize, judge, lecture, use sarcasm"
    },
    {
      title:"Help Topics",
      content:""
    },
  ];
  var step3Help = [
    {
      description : "Invitation Step | Ingredient/Goal",
      topics:[{ description: "Generate solutions that are realistic (meaning both parties can do what they are agreeing to) and mutually satisfactory (meaning the solution truly addresses the concerns of both parties)"}]
    },
    {
      description : "Words ",
      topics:[{ description: "Restate the concerns that were identified in the first two steps, usually beginning with “I wonder if there is a way…"}]
    },
    {
      description : "What you're thinking",
      topics:[{ description: "Have I summarized both concerns accurately? Have we truly considered whether both parties can do what they’ve agreed to? Does the solution truly address the concerns of both parties? What’s my estimate of the odds of this solution working?"}]
    },
    {
      description : "Don't",
      topics:[{ description: "Rush through this step either"},
              { description: "Enter this step with preordained solutions"},
              { description: "Sign off on solutions that both parties can’t actually perform"},
              { description: "Sign off on solutions that don’t truly address the concerns of both parties"}
             ]},
    {
      description : "Tips!",
      topics:[
        { description: "Stick as closely to the concerns that were identified in the first two steps"},
        { description:"While it’s a good idea to give the child the first opportunity to propose a solution, generating solutions is a team effort"},
        { description:"It’s a good idea to consider the odds of a given solution actually working …if you think the odds are below 60-70 percent, consider what it is that’s making you skeptical and talk about it" },
        {description:"This step always ends with agreement to return to Plan B if the first solution doesn’t stand the test of time "}]
      },
    {
    description : "Help Topics",
    topics:[
      {description: "I'm not getting it", url:"http://www.blogtalkradio.com/dr-ross-greene/2013/09/16/parenting-your-challenging-child"},
      {description: "The solution didn’t work", url:"http://www.blogtalkradio.com/dr-ross-greene/2011/03/15/parenting-challenging-kids-collaborative-problem-solving-at-home"}
    ]}
  ];
  var faq = [
    {
      question:"Why are challenging childs challenging?",
      answer:"Because they’re lacking the skills not to be challenging. If they had the skills, they wouldn’t be challenging. That’s because –and this is perhaps the key theme of the model – childs do well if they can. And because (here’s another key theme) Doing well is preferable to not doing well. This, of course, is a dramatic departure from the view of challenging childs as attention-seeking, manipulative, coercive, limit-testing, and poorly motivated. It’s a completely di erent set of lenses, supported by research in the neurosciences over the past 30-40 years, and it has dramatic implications for how caregivers go about helping such childs."
    },
    {
      question:"When are challenging childs challenging?",
      answer:"When the demands or expectations being placed upon them exceed the skills that they have to respond adaptively. Of course, that’s when we all respond maladaptively: when we’re lacking the skills to respond adaptively. Thus, an important goal for helpers is to identify the skills a challenging child is lacking. An even more important goal is to identify the speci c expectations a child is having di culty meeting, referred to as unsolved problems... and to help childs solve those problems. Because unsolved problems tend to be highly predictable, the problem-solving should be proactive most of the time. Identifying lagging skills and unsolved problems is accomplished through use of an instrument called the Assessment of Lagging Skills and Unsolved Problems (ALSUP). You can  nd the ALSUP in The Paperwork section of the website of Lives in the Balance, the nonpro t Dr. Greene founded to help disseminate his approach (livesinthebalance.org)."
    },
    {
      question:"What behaviors do challenging childs exhibit when they don’t have the skills to respond adaptively to certain demands?",
      answer:"Challenging childs communicate that they’re struggling to meet demands and expectations in some fairly common ways: whining, pouting, sulking, withdrawing, crying, screaming, swearing, hitting, spitting, kicking, throwing, lying, stealing, and so forth. But what a child does when he’s having trouble meeting demands and expectations isn’t the most important part (though it may feel that way). Why and when he’s doing these things are much more important."
    },
    {
      question:"What should we be doing di erently to help these childs better than we’re helping them now?",
      answer:"If challenging behavior is set in motion by lagging skills and not lagging motivation, then it’s easy to understand why rewarding and punishing a child may not make things better. Since challenging behavior occurs in response to highly predictable unsolved problems, then the goal is to solve those problems. But if we solve them unilaterally, through imposition of adult will (referred to in the model as “Plan A”), then we’ll only increase the likelihood of challenging episodes and we won’t solve any problems durably. Better to solve those problems collaboratively (“Plan B”) so the child is a fully invested participant, solutions are more durable, and (over time) the child -- and often the adults as well -- learn the skills they were lacking all along. Plan B is comprised of three basic ingredients. The  rst ingredient – called the Empathy step – involves gathering information from the child so as to achieve the clearest understanding of his or her concern or perspective on a given unsolved problem. The second ingredient (called the De ne Adult Concerns step) involves entering into consideration the adult concern or perspective on the same unsolved problem. The third ingredient (called the Invitation step) involves having the adult and child brainstorm solutions so as to arrive at a plan of action that is both realistic and mutually satisfactory...in other words, a solution that addresses the concerns of both parties and that both parties can actually perform."
    },
    {
      question:"Where can I learn more about this model?",
      answer:"The Lives in the Balance website is a very good place to start. It has a ton of free resources to help you learn about and apply CPS approach, including streaming video, audio programming, commentary, support, and lots more."
    },
    {
      question:"Isn't this the same model as what was previously known as Collaborative Problem Solving?",
      answer:"Dr. Greene is the originator of the Collaborative Problem Solving approach, and for many years referred to his model by that name in his research papers, scholarly articles, books, and workshops. He now calls his model Collaborative & Proactive Solutions (CPS). Be careful! There are others using the name Collaborative Problem Solving out there, but they had nothing to do with the origination or development of CPS Model and are not associated with Dr. Greene or Lives in the Balance in any way!"
    },
    {
      question: "A major premise of CPS approach is that challenging behavior is a form of developmental delay. What research supports this idea?",
      answer: "Much of the research is, for better or worse (mostly worse) tied to specific diagnoses, but the link between lagging skills and challenging behavior is unequivocal.  For example, the association between ADHD and lagging executive skills (e.g., difficulty shifting cognitive set, doing things in a logical sequence, having a sense of time, maintaining focus, controlling one’s impulses) is well-established.  Equally well-established is the fact that childs with ADHD are at subsequent increased risk for other diagnoses (and much more serious challenging behavior), such as oppositional defiant disorder (temper outbursts, arguing with adults, and defiance) and conduct disorder (bullying, threatening, intimidating, fighting, physical aggression, stealing, destroying property, lying, truancy). There are also convincing data documenting increased rates of oppositional defiant disorder (ODD) and conduct disorder (CD) in childs with mood disorders (i.e.. those who have difficulty with skills related to the regulating of one’s emotions, including managing one’s emotional response to frustration so as to think rationally [separation of affect]), and in childs who are socially impaired (including skills such as accurately interpreting social cues, seeking attention in appropriate ways, appreciating how one’s behavior is affecting others, empathizing, and appreciating how one is being perceived by others).  The research literature has increasingly shown that childs with language processing delays (including skills such as considering a range of solutions to a problem; expressing concerns, needs, or thoughts in words; and understanding what is being said) are at significantly greater risk for ODD and CD as well. And there is a persuasive and growing literature documenting the very challenging behaviors that can accompany autism spectrum disorders and non-verbal learning disability (and the black-and-white, concrete, literal thinking that typifies these disorders). We’ve learned a lot about children’s brains in the last 30 years.  We now know how challenging childs come to be challenging. It’s time for our actions to reflect our knowledge."
    },
    {
      question: "In Lost at School, you point out that childs with behavioral challenges aren’t usually challenging every second of every waking hour. Some childs are challenging at home and not at school, others at school and not at home, and others in both places. If it’s true that the child is lacking skills, then why would he be lacking them in one place and not another? Isn’t the discrepancy in behavior between home and school proof that he’s choosing to behave one way in one place and another way in the other? Isn’t that a sign that the child is doing well only when he wants to?",
      answer: "Actually, it’s proof that challenging behavior is specific to certain conditions. Under what conditions does challenging behavior occur?  Those where skills are being required of the child that he does not yet sufficiently possess or where problems arise that he hasn’t been able to solve.  But precisely where and when those conditions are present differs from child to child. Especially in cases where a child is more challenging at home than school, it’s common for people to explain the disparity as the result of poor parenting.  That’s usually not true.  The school environment may have advantages that reduce the likelihood of challenging behavior in some childs.  School environments tend to be more structured and predictable than home environments, and this can reduce the likelihood of challenging behavior in some (but by no means all) challenging childs.  Often medicines that are helpful for reducing challenging behavior at school have worn off by the time the child arrives at home.  And some childs are able to stay tightly wrapped during the school day and then completely unravel – some would say decompensate – the minute they’re back at home.  Of course, most of us look a lot better when we’re outside the home than when we’re inside it! Even when the reverse is true – if a child’s challenges are greater at school than at home – it’s not uncommon for the finger to be pointed at parents (“Sure, the parents just let him do what he wants at home.  No wonder he doesn’t act up with them.”).  The more plausible and productive explanation is that the school is placing demands on the child – for focused learning, organizing, sustained effort, and getting along with others – that may not be nearly as intense at home. This presents another opportunity for adults to stop pointing and start identifying lagging skills and unsolved problems."
    },
    {
      question: "In Lost at School, you say that this model doesn’t require that adults suspend all of their expectations so a child won’t exhibit challenging behavior. Care to say more about that?",
      answer: "Sure thing. It would be impossible to teach, parent, or help childs without having expectations.  CPS Model does not involve dropping all expectations. But since you can’t fix everything at once, it makes sense to eliminate some low priority expectations (in other words, use Plan C) so the child is more “available” to work on the higher priority expectations and problems that remain.  Just because you’re eliminating a given expectation now doesn’t mean you won’t come back to it once some higher priority expectations have been met. You will want to consider whether your expectations for each child are truly realistic, and grade level and chronological age typically are not great indicators of a child’s developmental readiness for a particular expectation.  We often place expectations on childs that we know they can’t meet, and then punish them when they handle our expectations as poorly as we suspected they would.  An unrealistic expectation is a challenging behavior waiting to happen."
    },
    {
      question: "Do you believe in holding childs accountable for their actions?",
      answer: "It depends on what you mean by “accountable.”  For some folks, holding a child accountable for his actions simply means making sure he pays the price for his challenging behavior.  In the Dr. Greene&#8217;s model, holding a child accountable means that the child is participating in a process in which he’s identifying and articulating his own concerns or perspectives, taking yours into account, and working toward a realistic and mutually satisfactory solution.  One could make the case that Plan B is actually more effective at holding a child accountable than Plan A, since the child is participating in and actually thinking about a plan to reduce his challenging behavior (and taking your concerns into account) rather than merely being on the receiving end of imposed adult will and endless adult ingenuity."
    },
    {
      question: "Shouldn’t I still be using consequences for challenging behavior – even if I don’t think they’re working – so the other childs know I’m taking the challenging behavior seriously?",
      answer: "It’s your choice, but you don’t need to use consequences for the other childs to notice that you’re taking the problem seriously.  They need to see that you’ve got a handle on the challenging child’s lagging skills and unsolved problems and that, slowly but surely, his challenging behaviors are decreasing.  You don’t improve your credibility by continuing to intervene in a way that isn’t working or is making things worse.  Consequences are useful for two things:  (1) teaching basic lessons about right and wrong and (2) giving childs the incentive to do well.  You’ll want to use consequences if you think one or both of these things are coming into play.  But childs with behavioral challenges already know the basic lessons about right and wrong and, because childs do well if they can, they already have the incentive to do well."
    },
    {
      question: "Is it really fair to expect teachers – who are not trained as mental health professionals – to solve problems collaboratively?",
      answer: "I don’t know what’s fair. I do know that teachers already have a lot on their plates.  I know that an astounding number of challenging childs are needlessly slipping through the cracks and losing their futures.  And I know that a mental health degree is not a prerequisite for solving problems collaboratively. Teachers have always taught non-academic skills to their students, skills related to handling life’s social, emotional, and behavioral challenges.  It’s just that some childs and some challenges require that teachers have a different mind-set and skill-set.  What are the key qualifications for helping childs with behavioral challenges?  An open mind, a willingness to reflect on one’s current practices and try on new lenses, the courage to experiment with new practices, and the patience and resolve to become comfortable assessing lagging skills and unsolved problems and using Plan B.  If it makes you feel any better, most mental health professionals don’t have training in solving problems collaboratively either."
    },
    {
      question: "It seems like you think teachers should be all things to all childs.",
      answer: "Not so, but childs with social, emotional, and behavior challenges could really use your help."
    },
    {
      question: "Aren’t there some challenging childs who need meds?",
      answer: "Yes, though nowhere near as many as are actually on meds.  The over-medicating of childs flows from an over-emphasis on diagnoses, the ease with which medications are prescribed, a lack of awareness of the true factors underlying childs’ challenging behavior, the failure to achieve a comprehensive understanding of a child’s challenges, and a lack of knowledge of Plan B.  That said, there are some childs for whom psychotropic medication is an indispensable component of treatment and whose participation in Plan B is impossible without medication.  It’s crucial to differentiate between the things psychotropic medicine does well and the things psychotropic medicine does not do well lest, as is commonly the case, medicine be prescribed for things medicine does not do well.  Medicine is effective at reducing hyperactivity and poor impulse control; improving attention span; enhancing mood; reducing obsessive-compulsive behaviors and general anxiety; reducing tics; inducing sleep; and helping volatile, aggressive childs be less reactive.  Medicine does not teach skills.  Medicine does not help childs solve problems.  But it can help childs be more “available” to learn skills and solve problems."
    },
    {
      question: "In the research literature, training cognitive skills to childs with challenging behavior often hasn’t fared very well. How is this model different?",
      answer: "In the research literature (and in real life) cognitive skills training has often been conducted outside the environments in which a child is having the greatest difficulty and by people the child isn’t having difficulty with; for example, in the office of a guidance counselor, principal, or mental health professional; or in a researcher’s lab.  Skills taught in these artificial environments often haven’t generalized to the environments in which the child was having difficulty.  In addition, the training has been done in a rote, circumscribed fashion using skills-training modules or curriculum that were not tailored to the specific lagging skills or unsolved problems of individual childs."
    },
    {
      question: "Does this model help with childs on the autism spectrum?",
      answer: "It’s often assumed that this model has no application to these childs, and that well-known applied behavior analysis methodology is really the only option. I beg to differ. “Autism spectrum” doesn’t say anything about the child’s general cognitive functioning, and unless you’re ready to throw in the towel on teaching the child lagging skills or helping him learn to solve problems – and hopefully, you’re not – then this model may well have a role to play. The most common obstacle is linguistic skills. As described above, you’ll want to focus first on helping the child develop the skills to communicate his concerns (often through pictures or hand signals) in a very rudimentary manner. Then, if possible, you’ll want to focus (if it’s feasible) on helping the child express these same concerns verbally. Along the way, you’ll be watching closely to see if there is some mechanism for the child to participate in generating solutions."
    },
    {
      question: "How does this model differ from other crisis management programs?",
      answer: "While this model can help defuse a crisis, it’s not primarily a crisis management program. It’s a crisis prevention program. In other words, it’s good to know how to defuse and de-escalate during a crisis, but it’s far better to know how to prevent crises from occurring in the first place. No other learning disability is handled in crisis mode, and a crisis is clearly not the best time to address the lagging skills and unsolved problems underlying social, emotional, and behavioral challenges."
    },
    {
      question: "How do poverty and culture impact the effectiveness of CPS Model?",
      answer: "At the risk of seeming insensitive, I think poverty is over-rated as an explanation for challenging behavior in childs (in his seminal book, Schools Without Failure, Dr. William Glasser agreed). There are childs from impoverished circumstances who succeed. There are childs from wealthy backgrounds who don’t. Those who come from wealth often have parents who will stop at nothing to access good care and have the resources and wherewithal to find and pay for it. Some receive very poor care anyway. Data suggest that socioeconomic status is not a predictor of success with the model. I do think that people from similar backgrounds sometimes have an easier time connecting with and communicating with each other. But I’ve yet to run into an ethnic group whose members don’t value having their concerns heard and addressed. In fact, look any place in the world where there’s conflict right now and you’ll see one people whose concerns are being disregarded and another imposing its will. It’s very reliable."
    },
    {
      question: "Does the this model apply to childs who shoot people in our schools?",
      answer: "Childs who act on the idea of shooting people at school are clearly having difficulty coming up with more adaptive solutions to problems they’ve been unable to solve. In many instances where childs have resorted to extreme violence, people were surprised that the child went to such extremes. But we all have what might be called a “threshold of adversity,” and we all have different levels of skill in dealing with adversity. When a person’s threshold of adversity exceeds their skills, the likelihood of violence is heightened. That’s why it’s crucial to keep the lines of communication open with every child so you’re aware of his lagging skills and unsolved problems. Create a helping relationship. Work collaboratively toward solving the problems so the child learns the skills."
    }
  ];


  return {
    getStep1Help: function(callback) {
      callback(step1Help);
    },
    getStep2Help: function(callback) {
      callback(step2Help);
    },
    getStep3Help: function(callback) {
      callback(step3Help);
    },
    getFAQs: function(callback) {
      callback(faq);
    }
  };
});
