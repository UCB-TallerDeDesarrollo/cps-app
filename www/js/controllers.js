angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.views.swipeBackEnabled(false);
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSQLite, $ionicPopup, $state, ChildrenFactory, UnsolvedProblemFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.firstTimeHelp = false;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.activeChild = { first_name: "" };
    $scope.getActiveChild = function() {
        $scope.activeChild = { first_name: "" };
        ChildrenFactory.active(function(active_child) {
            $scope.activeChild = active_child;
        });
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/defaultUtilities/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.UnsolvedProblemsTutorial = function() {
        if ($scope.activeChild.first_name === '') {
            var alertForNoActiveChild = $ionicPopup.alert({
                title: 'No child registered',
                template: 'You need to register a child to continue.'
            });
            alertForNoActiveChild.then(function(res) {});
        } else {
            ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                UnsolvedProblemFactory.all($scope.activeChild.id, function(unsolvedProblems) {
                    if (unsolvedProblems.length === 0) {
                        $state.go('app.unsolvedTour');
                    } else {
                        $state.go('app.newUnsolvedProblem');
                    }
                });
            });
        }
    };

    $scope.checkActiveToContinue = function(route) {
        if ($scope.activeChild.first_name === '') {
            var alertForNoActiveChild = $ionicPopup.alert({
                title: 'No child registered',
                template: 'You need to register a child to continue.'
            });
            alertForNoActiveChild.then(function(res) {});
        } else {
            $state.go(route);
        }
    };

})

.controller('LaggingSkillsCtrl', function($scope, LaggingSkills, $cordovaSQLite, $state, $ionicListDelegate, ChildrenFactory, $ionicModal) {
    ChildrenFactory.active(function(active_child) {
        $scope.activeChild = active_child;
        LaggingSkills.all($scope.activeChild.id, function(res) {
            $scope.laggingSkills = res;
        });
    });
    $scope.checkLaggingSkill = function(laggingskillId) {
        LaggingSkills.check([laggingskillId]);
        $state.go('app.laggingSkills');
        $ionicListDelegate.closeOptionButtons();
        LaggingSkills.all($scope.activeChild.id, function(res) {
            $scope.laggingSkills = res;
        });
        if (typeof analytics !== 'undefined') {
            analytics.trackEvent('Lagging Skill', 'check');
        } else {
            console.log("Google Analytics Unavailable");
        }
    };
    $scope.uncheckLaggingSkill = function(laggingskillId) {
        LaggingSkills.uncheck([laggingskillId]);
        $state.go('app.laggingSkills');
        $ionicListDelegate.closeOptionButtons();
        LaggingSkills.all($scope.activeChild.id, function(res) {
            $scope.laggingSkills = res;
        });
    };
    $scope.laggingSkillsHint = function() {
        $scope.openModalHint();
    };
    $scope.openModalHint = function() {
        $scope.modalHint.show();
    };
    $ionicModal.fromTemplateUrl('templates/laggingSkills/laggingSkillsHints.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalHint = modal;
    });
    $scope.closeModalHint = function() {
        $scope.modalHint.hide();
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.googleAnalyticsView = function() {
        if (typeof analytics !== 'undefined') {
            analytics.trackView('Lagging Skills view');
        } else {
            console.log("Google Analytics Unavailable");
        }
    }
})

.controller('HelpCategoryCtrl', function($scope, $stateParams) {
    $scope.params = $stateParams;
})

.controller('HelpCategoryTopicsCtrl', function($scope, HelpCategoriesStep1, $stateParams, AppTools) {
    $scope.category = HelpCategoriesStep1.get($stateParams.id_category);
    $scope.browserInstance = {};
    $scope.browserInstance = AppTools.newBrowser({
        scope: $scope,
        animation: 'slide-in-right'
    });
})


.controller('HelpCategoryCtrl', function($scope, HelpCategoriesStep1) {
    $scope.helpCategories = HelpCategoriesStep1.all();
    $scope.googleAnalyticsForHelpCategoriesStep1 = function() {
        if (typeof analytics !== 'undefined') {
            analytics.trackView('Help Categories for step 1 view');
        } else {
            console.log("Google Analytics Unavailable");
        }
    };
})

.controller('HelpCategoryInvitationCtrl', function($scope, AppTools) {
    $scope.toggleHelp = function(topic) {
        if ($scope.isTopicShown(topic)) {
            $scope.shownTopic = null;
        } else {
            $scope.shownTopic = topic;
        }
    };
    $scope.isTopicShown = function(topic) {
        return $scope.shownTopic === topic;
    };

    $scope.browserInstance = {};
    $scope.browserInstance = AppTools.newBrowser({
        scope: $scope,
        animation: 'slide-in-right'
    });

    $scope.googleAnalyticsView = function() {
        if (typeof analytics !== 'undefined') {
            analytics.trackView('Invitation step view');
        } else {
            console.log("Google Analytics Unavailable");
        }
    };

    $scope.helpCategoriesInvitation = [{
            description: "Invitation Step | Ingredient/Goal",
            topics: [{ description: "Generate solutions that are realistic (meaning both parties can do what they are agreeing to) and mutually satisfactory (meaning the solution truly addresses the concerns of both parties)" }]
        },
        {
            description: "Words ",
            topics: [{ description: "Restate the concerns that were identified in the first two steps, usually beginning with “I wonder if there is a way…" }]
        },
        {
            description: "What you're thinking",
            topics: [{ description: "Have I summarized both concerns accurately? Have we truly considered whether both parties can do what they’ve agreed to? Does the solution truly address the concerns of both parties? What’s my estimate of the odds of this solution working?" }]
        },
        {
            description: "Don't",
            topics: [{ description: "Rush through this step either" },
                { description: "Enter this step with preordained solutions" },
                { description: "Sign off on solutions that both parties can’t actually perform" },
                { description: "Sign off on solutions that don’t truly address the concerns of both parties" }
            ]
        },
        {
            description: "Tips!",
            topics: [{ description: "Stick as closely to the concerns that were identified in the first two steps" },
                { description: "While it’s a good idea to give the kid the first opportunity to propose a solution, generating solutions is a team effort" },
                { description: "It’s a good idea to consider the odds of a given solution actually working …if you think the odds are below 60-70 percent, consider what it is that’s making you skeptical and talk about it" },
                { description: "This step always ends with agreement to return to Plan B if the first solution doesn’t stand the test of time " }
            ]
        },
        {
            description: "Help Topics",
            topics: [
                { description: "I'm not getting it", url: "http://www.blogtalkradio.com/dr-ross-greene/2013/09/16/parenting-your-challenging-child" },
                { description: "The solution didn’t work", url: "http://www.blogtalkradio.com/dr-ross-greene/2011/03/15/parenting-challenging-kids-collaborative-problem-solving-at-home" }
            ]
        }
    ];

})

.controller('HelpTopicContentCtrl', function($scope, HelpCategoriesStep1, $stateParams, AppTools) {
    $scope.topic = HelpCategoriesStep1.getContent($stateParams.id_category, $stateParams.id_topic);
    $scope.browserInstance = AppTools.newBrowser({
        scope: $scope,
        animation: 'slide-in-right'
    });
})

.controller('DefineTheProblemCtrl', function($scope, $stateParams) {
        $scope.unsolvedProblem = {
            description: "",
            id: $stateParams.unsolvedProblemId
        };
    })
    .controller('HelpTourCtrl', function($scope, $state, $ionicSlideBoxDelegate, $cordovaSQLite, $ionicPopup, ChildrenFactory, UnsolvedProblemFactory) {
        ChildrenFactory.active(function(active_child) {
            $scope.activeChild = active_child;
        });
        $scope.checkActiveToContinue = function(route) {
            ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                if ($scope.activeChild.first_name === '') {
                    var alertForNoActiveChild = $ionicPopup.alert({
                        title: 'No child registered',
                        template: 'You need to register a child to continue.'
                    });
                    alertForNoActiveChild.then(function(res) {});
                } else {
                    $state.go(route);
                }
            });
        };
        $scope.startApp = function() {
            $state.go('app.tours');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        $scope.helpTutorial = function() {
            ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                UnsolvedProblemFactory.all($scope.activeChild.id, function(unsolvedProblems) {
                    if (unsolvedProblems.length === 0) {
                        $state.go('app.helpTour');
                    } else {
                        $state.go('app.mainHelp');
                    }
                });
            });
        };
    })
    .controller('TourCtrl', function($scope, $state, $ionicSlideBoxDelegate, $cordovaSQLite, $ionicPopup, ChildrenFactory, UnsolvedProblemFactory) {
        ChildrenFactory.active(function(active_child) {
            $scope.activeChild = active_child;
        });
        $scope.checkActiveToContinue = function(route) {
            ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                if ($scope.activeChild.first_name === '') {
                    var alertForNoActiveChild = $ionicPopup.alert({
                        title: 'No child registered',
                        template: 'You need to register a child to continue.'
                    });
                    alertForNoActiveChild.then(function(res) {});
                } else {
                    $state.go(route);
                }
            });
        };
        $scope.startApp = function() {
            $state.go('app.tours');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        $scope.googleAnalyticsViewAppTutorial = function() {
            if (typeof analytics !== 'undefined') {
                analytics.trackView('App Tutorial view');
            } else {
                console.log("Google Analytics Unavailable");
            }
        };

        $scope.UnsolvedProblemsTutorial = function() {
            ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                UnsolvedProblemFactory.all($scope.activeChild.id, function(unsolvedProblems) {
                    if (unsolvedProblems.length === 0) {
                        $state.go('app.unsolvedTour');
                    } else {
                        $state.go('app.newUnsolvedProblem');
                    }
                });
            });
        };
    })

    .controller('TutorialCtrl', function($scope, $state, $ionicSlideBoxDelegate, $cordovaSQLite, $ionicPopup) {

        $scope.startApp = function() {
            $state.go('app.childs');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    });

// OTHER FUNCTIONS


// function getLaggingSkills(cordovaSQLite,child_id){
//   var lagging_skills = [];
//   var query ="SELECT * FROM lagging_skills WHERE child_id = ?";
//   cordovaSQLite.execute(db,query,[child_id]).then(function(result) {
//     var rows = result.rows;
//     if(rows.length) {
//       for(var i=0; i < rows.length; i++){
//         lagging_skills.push(rows.item(i));
//       }
//     }
//     },function(err){
//       console.log(err.message);
//     });
//   return lagging_skills;
// }


// function getSolutions(cordovaSQLite,unsolvedProblemId) {
//   var solutions = [];
//   var query ="SELECT * FROM solutions WHERE unsolved_problem_id = ?";
//   cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
//     var rows = result.rows;
//     if(rows.length) {
//       for(var i=0; i < rows.length; i++){
//         solutions.push(rows.item(i));
//       }
//     }
//   },function(err){console.log(err.message);});
//   return solutions;
// }

// function getSolutions(cordovaSQLite,unsolvedProblemId,callback) {
//   var solutions = [];
//   var query ="SELECT * FROM solutions WHERE unsolved_problem_id = ?";
//   cordovaSQLite.execute(db,query,[unsolvedProblemId]).then(function(result) {
//     var rows = result.rows;
//     if(rows.length) {
//       for(var i=0; i < rows.length; i++){
//         solutions.push(rows.item(i));
//       }
//       callback();
//     }
//   },function(err){console.log(err.message);});
//   return solutions;
// }


function inputFieldIsEmpty(description) {
    return description.length === 0;
}

// function saveSolution(cordovaSQLite,solution){
//   var query ="INSERT INTO solutions(description,unsolved_problem_id,rating) VALUES (?,?,?)";
//   cordovaSQLite.execute(db,query,[solution.description,solution.unsolvedProblemId,solution.rating]);
// }

// function updateSolution($cordovaSQLite, solution){
//   var query = "UPDATE solutions SET description = ? where id = ?";
//   $cordovaSQLite.execute(db, query, [solution.description, solution.id]);
// }

// function uncheckLaggingSkill($cordovaSQLite,params){
//   var query = "UPDATE lagging_skills SET checked = 0 where id = ?";
//   $cordovaSQLite.execute(db,query,params);
// }
// function checkLaggingSkill($cordovaSQLite, params){
//   var query = "UPDATE lagging_skills SET checked = 1 where id = ?";
//   $cordovaSQLite.execute(db,query,params);
// }
