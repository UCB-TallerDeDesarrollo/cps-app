var app = angular.module('starter.controllers', ['pascalprecht.translate']);
app
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.views.swipeBackEnabled(false);
})

.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', $translations_en);
    $translateProvider.translations('es', $translations_es);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSQLite, $ionicPopup, $state, ChildrenFactory, UnsolvedProblemFactory, $translate,$http, $ionicSideMenuDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.firstTimeHelp = false;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.user_name = localStorage.getItem("user_name");
    $scope.$watch(function () {
        return $ionicSideMenuDelegate.isOpenLeft();
       },
       function (isOpen) {
         if (isOpen){
            $scope.user_name = localStorage.getItem("user_name");
         } else{
         }
      });
    $scope.isUserLogged = function(){
        if(localStorage.getItem("auth_token") !== null ){
            return false;
        }else 
        return true;     
    }
    $scope.logout = function(){
        $translate([
            "SuccessTitle",
            "LogoutSuccessfull",
            "LogoutTitle",
            "ConfirmationToLogout",
            "YesMessage",
            "NoMessage"
          ]).then(function(translations) {
            var confirmPopup = $ionicPopup.confirm({
                title: translations.LogoutTitle,
                template: translations.ConfirmationToLogout,
                cancelText: translations.NoMessage,
                okText: translations.YesMessage
            });
    
            confirmPopup.then(function(res) {
                if (res) {
                    localStorage.removeItem("auth_token");
                    localStorage.removeItem("email");
                    localStorage.removeItem("user_name");
                    
                    window.plugins.OneSignal.sendTag("User_Id", "");
                    var alertForAccountCreated = $ionicPopup.alert({
                        title: translations.SuccessTitle,
                        template: translations.LogoutSuccessfull
                    });
                }
            });
        })
    };
    $scope.activeChild = { first_name: "" };
    $scope.getActiveChild = function() {
        $scope.activeChild = { first_name: "" };
        ChildrenFactory.active(function(active_child) {
            $scope.activeChild = active_child;
        });
    };

    //Changes the language of translation
    $scope.ChangeLanguage = function(lang){
        $translate.use(lang);
    }

    //Modal for language options
    $ionicModal.fromTemplateUrl('templates/languageOptionsModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.languageOptionsModal = modal;
    });

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

.controller('LaggingSkillsCtrl', function($scope, LaggingSkills, $cordovaSQLite, $state, $ionicListDelegate, ChildrenFactory, $ionicModal, $http) {
    $scope.activeLaggingSkill = {};
    ChildrenFactory.active(function(active_child) {
        $scope.activeChild = active_child;
        LaggingSkills.all($scope.activeChild.id, function(res) {
            $scope.laggingSkills = res;
        });
    });
    $scope.checkLaggingSkill = function(laggingskillId,child_id) {
        LaggingSkills.check([laggingskillId], [child_id]);
        $state.go('app.laggingSkills');
        console.log("Controller Child id:" + child_id);
        $ionicListDelegate.closeOptionButtons();
        LaggingSkills.all($scope.activeChild.id, function(res) {
            $scope.laggingSkills = res;
        });
        //$scope.uploadLaggingSkill($scope.laggingSkills,laggingskillId);
        if (typeof analytics !== 'undefined') {
            analytics.trackEvent('Lagging Skill', 'check');
        } else {
            console.log("Google Analytics Unavailable");
        }
    };
    $scope.uncheckLaggingSkill = function(laggingskillId,child_id) {
        LaggingSkills.uncheck([laggingskillId], [child_id]);
        $state.go('app.laggingSkills');
        console.log("Controller out Child id:" + child_id);
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

    $scope.uploadLaggingSkill = function(laggingskillList,laggingskillId){
        $scope.activeLaggingSkill = LaggingSkills.get(laggingskillList,laggingskillId);
        console.log($scope.activeLaggingSkill.checked);
        console.log("paso la carga");
        var link = "http://cpsapi.herokuapp.com/createLaggingSkill";
        var data = {
           description: $scope.activeLaggingSkill.description,
           checked: $scope.activeLaggingSkill.checked,
           child_id: $scope.activeChild.id
        };
        $http({
          method: 'POST',
          url: link,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: data
        })
        .then(function(response) {
          console.log(response.data.message);
        //   var alertForAccountCreated = $ionicPopup.alert({
        //       title: 'Success!',
        //       template: 'LaggingSkill uploaded.'
        //   });
        },
        function(response) {
          console.log(response.data.message);
        });      
      };
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

    .controller('TutorialCtrl', function($scope, $state, $ionicSlideBoxDelegate, $cordovaSQLite, $ionicPopup,$ionicHistory) {

        $scope.startApp = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('app.home');
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

function signupFieldsAreEmpty(name, last_name, phone, email, password, password_confirmation) {
    name_is_empty = inputFieldIsEmpty(name);
    last_name_is_empty = inputFieldIsEmpty(last_name);
    phone_is_empty = inputFieldIsEmpty(phone);
    email_is_empty = inputFieldIsEmpty(email);
    password_is_empty = inputFieldIsEmpty(password);
    password_confirmation_is_empty = inputFieldIsEmpty(password_confirmation);
    return (name_is_empty || last_name_is_empty || phone_is_empty || email_is_empty || password_is_empty || password_confirmation_is_empty);
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
