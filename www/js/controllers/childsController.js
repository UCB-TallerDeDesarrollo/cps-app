angular
  .module("starter.controllers")
  .controller("ChildsCtrl", function(
    $scope,
    $cordovaSQLite,
    $state,
    $window,
    $ionicActionSheet,
    $ionicListDelegate,
    $ionicPopup,
    $ionicModal,
    $stateParams,
    $filter,
    $timeout,
    $cordovaFileTransfer,
    UnsolvedProblemFactory,
    ChildrenFactory,
    $translate,
    $http,
    LaggingSkills,
    AdultConcernFactory,
    ChildConcernFactory
  ) {



    $scope.child = {};
    $scope.child.first_name = "";
    $scope.child.gender = "Female";
    $scope.child.birthday = new Date();
    ChildrenFactory.all(function(children) {
      $scope.childs = children;
    });
    $scope.activeChild = { first_name: "" };
    $ionicModal
      .fromTemplateUrl("templates/child/create-child-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        $scope.modalCreate = modal;
        $scope.modalCreate.hide();
      });
    $scope.openModalCreate = function() {
      $scope.modalCreate.show();
      if (typeof analytics !== "undefined") {
        analytics.trackView("Create child view");
      } else {
        console.log("Google Analytics Unavailable");
      }
    };

    $scope.closeModalCreate = function() {
      $scope.modalCreate.hide();
      $scope.child.first_name = "";
      $scope.child.gender = "Female";
      $scope.child.birthday = new Date();
      $ionicListDelegate.closeOptionButtons();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on("$destroy", function() {
      $scope.modalCreate.remove();
    });
    // Execute action on hide modal
    $scope.$on("modal.hidden", function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on("modal.removed", function() {
      // Execute action
    });

    $ionicModal
      .fromTemplateUrl("templates/child/edit-child-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        $scope.modalEdit = modal;
        $scope.modalEdit.hide();
      });
    $scope.openModalEdit = function() {
      $scope.modalEdit.show();
    };
    $scope.closeModalEdit = function() {
      $scope.modalEdit.hide();
      $ionicListDelegate.closeOptionButtons();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on("$destroy", function() {
      $scope.modalEdit.remove();
    });
    // Execute action on hide modal
    $scope.$on("modalEdit.hidden", function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on("modalEdit.removed", function() {
      // Execute action
    });

    $scope.convertStringToDate = function(dateToConvert) {
      return new Date(dateToConvert);
    };


    $scope.createChild = function() {
      if (!inputFieldIsEmpty($scope.child.first_name)) {
        ChildrenFactory.insert($scope.child, function() {
          $scope.child.first_name = "";
          $scope.child.gender = "Female";
          $scope.child.birthday = new Date();
          $scope.closeModalCreate();
          if (typeof analytics !== "undefined") {
            analytics.trackEvent("Child", "Create");
          } else {
            console.log("Google Analytics Unavailable");
          }
          ChildrenFactory.all(function(children) {
            $scope.childs = children;
            var lastChild = children.pop();
            createLaggingSkills($cordovaSQLite, [lastChild.id]);
            ChildrenFactory.activate(lastChild.id, function() {
              ChildrenFactory.active(function(active_child) {
                $scope.activeChild = active_child;
                ChildrenFactory.all(function(children) {
                  $scope.childs = children;
                });
              });
            });
          });
        });
      }
    };

    $scope.updateChild = function() {
      if (!inputFieldIsEmpty($scope.editableChild.first_name)) {
        ChildrenFactory.update($scope.editableChild);
        $scope.editableChild.first_name = "";
        $scope.editableChild.gender = "Female";
        $scope.editableChild.birthday = new Date();
        $scope.closeModalEdit();
        ChildrenFactory.all(function(children) {
          $scope.childs = children;
        });
        if (typeof analytics !== "undefined") {
          analytics.trackEvent("Child", "Edit");
        } else {
          console.log("Google Analytics Unavailable");
        }
      }
    };

    $ionicModal.fromTemplateUrl('templates/child/sync-child-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.syncChildModal = modal;
    });

    $scope.showSyncModal = function(child){
        $scope.child = child;
        $scope.syncChildModal.show();
        LaggingSkills.all($scope.child.id, function(res) {
          $scope.laggingSkills = res;
        });
    };
    $scope.uploadData = function(){
      $scope.uploadChild();
    };

    $scope.downloadData = function(){
      $scope.downloadChild();
      $scope.downloadUnsolvedProblems();
      $scope.downloadLaggingSkill();
      $scope.downloadChildConcerns();
      $scope.downloadAdultConcern();
    }
    $scope.uploadChild = function(){
      var user_id = localStorage.getItem("user_id");
      $scope.formattedDate =   $filter('date')($scope.child.birthday, "yyyy-MM-dd");
      $http.post( $link_root +"/users/"+user_id+"/children",
      {
        //id: $scope.child.id,
        child_id: $scope.child.id,
        name: $scope.child.first_name,
        gender: $scope.child.gender,
        birthday: $scope.formattedDate
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
      })
      .then(data => {
        console.log($scope.child.id);
        console.log("Child created");
        var alertForAccountCreated = $ionicPopup.alert({
            title: 'Success!',
            template: 'Child uploaded.'
        });
        $scope.uploadUnsolvedProblem();
        $scope.uploadLaggingSkill();
      },
      function(response) {
        console.log(response.data.message);
      });

    };

    $scope.downloadChild = function(){
      var user_id = localStorage.getItem("user_id")
      var link =  $link_root +"/users/"+user_id+"/children/";
      var data = {
      };
      $http.get(link+$scope.child.id).then(data => {
        $scope.s_child = data.data;
        console.log($scope.s_child.child_id);
        var query = "UPDATE childs SET first_name = ?, gender = ? , birthday = ? where id = ?";
        var params = [$scope.s_child.name, $scope.s_child.gender,$scope.s_child.birthday, $scope.s_child.child_id];
        console.log("Nombre: "+ $scope.s_child.name);
        $cordovaSQLite.execute(db, query, params);
        ChildrenFactory.all(function(children){
          $scope.childs = children;
        });
        console.log("Child updated");
        // location.reload();
        $scope.syncChildModal.hide();

        })
      };

      $scope.uploadUnsolvedProblem = function() {
        var user_id = localStorage.getItem("user_id")
        var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem";
        $scope.unsolvedProblems = {};
        UnsolvedProblemFactory.all($scope.child.id,function(result){
          var data = result;
          console.log(data);
          var user_id = localStorage.getItem("user_id");

        $http.post(link,
        {
          data: angular.toJson(data),
          user_id: user_id
        },
        {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
        })
        .then(data => {
            $scope.uploadAdultConcern();
            $scope.uploadChildConcern();
        },
          function(response) {
            console.log(response.data.message);
        });
        $timeout(function() { $scope.displayErrorMsg = false;}, 3000);

        });
      };

      $scope.downloadUnsolvedProblems = function(){
        var user_id = localStorage.getItem("user_id")
        var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem";
        $scope.unsolvedProblems ;
        $http.get(link).then(data => {
          $scope.unsolvedProblems = data.data;
          angular.forEach($scope.unsolvedProblems, function(value, key){
            var query = "UPDATE unsolved_problems SET description = ?, unsolved_order = ? where id = ?";
            var params = [value.description, value.unsolved_order, value.unsolved_problem_id_app];
            console.log(value)
            $cordovaSQLite.execute(db, query, params);
         });
         var alertForAccountCreated = $ionicPopup.alert({
          title: " Success!",
          template: "Child's unsovled problems downloaded"
        });
        console.log("Child's unssolved problems downloaded");
          })
      };

      $scope.uploadLaggingSkill = function(){
        var user_id = localStorage.getItem("user_id");
        var data = [];
        data = LaggingSkills.getChecked($scope.laggingSkills);
        console.log(data);

        $http.post( $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/lagging_skill",
        {
          data: angular.toJson(data)
        },
        {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
        })
        .then(data => {
          console.log("LaggingSkill uploated");
        },
          function(response) {
            console.log(response.data.message);
        });
        $timeout(function() { $scope.displayErrorMsg = false;}, 4000);
      };

      $scope.downloadLaggingSkill  = function(){
        var user_id = localStorage.getItem("user_id")
        var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/getLaggingSkills";
        var data = {
        };
        $http.get(link).then(data => {
          $scope.list = data.data;
          console.log($scope.list);

            angular.forEach($scope.list,function(laggingSkill){
              var query = "UPDATE lagging_skills SET description = ?, checked = ? , child_id = ? where id = ?";
              var params = [laggingSkill.description, laggingSkill.checked,$scope.child.id, laggingSkill.id];
              $cordovaSQLite.execute(db, query, params);
            })

            console.log("LaggingSkills Updated");
          })
        }

        $scope.uploadAdultConcern = function() {

          $scope.unsolvedProblems = {};
          UnsolvedProblemFactory.all($scope.child.id,function(result){
            var dataUP = result;
            var user_id = localStorage.getItem("user_id");

            angular.forEach(dataUP,function(unsolvedProblem){
              var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem/"+unsolvedProblem.id+"/adult_concern";
              AdultConcernFactory.all(unsolvedProblem.id,function(result){
                var data = result;
                console.log(data)

                $http.post(link,
                  {
                    data: angular.toJson(data)
                  },
                  {
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                              var str = [];
                              for(var p in obj)
                              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                              return str.join("&");
                          },
                  })
                  .then(data => {
                    console.log(data)
                    console.log("Adult Concern uploated")
                  },
                  function(response) {
                    console.log(response.data.message);
                });
                $timeout(function() { $scope.displayErrorMsg = false;}, 3000);
              })

            });

          });

          $timeout(function() { $scope.displayErrorMsg = false;}, 4000);
        };

        $scope.downloadAdultConcern = function(){
          var user_id = localStorage.getItem("user_id")

          var linkUPData =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem";

          $scope.unsolvedProblems ;
          $http.get(linkUPData).then(data => {
            $scope.unsolvedProblems = data.data;
            angular.forEach($scope.unsolvedProblems, function(valueUP, key){
              var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem/"+valueUP.id+"/myAdultConcerns";
              $http.get(link).then(data => {
                $scope.adultConcerns = data.data;
                angular.forEach($scope.adultConcerns, function(value, key){
                  var query = "UPDATE adults_concerns SET description = ?, unsolved_problem_id = ? where id = ?";
                  var params = [value.description, value.unsolved_problem_id, value.id];
                  console.log(value)
                  $cordovaSQLite.execute(db, query, params);
               });

                console.log("AdultConcerns from UnsolvedProblem downloaded");
              })
           });

            console.log("Unsolved problems downloaded");
          })
        };
        $scope.uploadChildConcern = function() {
          $scope.unsolvedProblems = {};
          UnsolvedProblemFactory.all($scope.child.id,function(result){
            var dataUP = result;
            console.log(dataUP);
            var user_id = localStorage.getItem("user_id");
            angular.forEach(dataUP,function(unsolvedProblem){
              var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem/"+unsolvedProblem.id+"/child_concern";
              console.log(link);
              ChildConcernFactory.all(unsolvedProblem.id,function(result){
                var data = result;
                console.log(data)
                $http.post(link,
                  {
                    data: angular.toJson(data)
                  },
                  {
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                              var str = [];
                              for(var p in obj)
                              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                              return str.join("&");
                          },
                  })
                  .then(data => {
                    console.log(data)
                  },
                  function(response) {
                    console.log(response.data.message);
                });
                $timeout(function() { $scope.displayErrorMsg = false;}, 3000);
              })
            });

          });

          $timeout(function() { $scope.displayErrorMsg = false;}, 4000);
        };


        $scope.downloadChildConcerns = function(){
          var user_id = localStorage.getItem("user_id")
          var linkUPData =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem";
          $scope.unsolvedProblems ;
          $http.get(linkUPData).then(data => {
            $scope.unsolvedProblems = data.data;
            angular.forEach($scope.unsolvedProblems, function(valueUP, key){
              var link =  $link_root +"/users/"+user_id+"/children/"+$scope.child.id+"/unsolved_problem/"+valueUP.id+"/getChildConcern";
              $http.get(link).then(data => {
                $scope.childConcerns = data.data;
                angular.forEach($scope.childConcerns, function(value, key){
                  var query = "UPDATE childs_concerns SET description = ?, unsolved_order =? , unsolved_problem_id = ? where id = ?";
                  var params = [value.description, value.order, value.unsolved_problem_id, value.id];
                  console.log(value)
                  $cordovaSQLite.execute(db, query, params);
              });

                console.log("ChildConcerns from UnsolvedProblem downloaded");
              })
          });

            console.log("Unsolved problems downloaded");
          })
        };

    $scope.showActionsheet = function(child) {
      $translate([
        "EditChildTitle",
        "CancelOption",
        "DeleteChildTitle"
      ]).then(function(translations) {
        $ionicActionSheet.show({
          buttons: [{ text: translations.EditChildTitle }],
          cancelText: translations.CancelOption,
          cancel: function() {
            $ionicListDelegate.closeOptionButtons();
          },
          destructiveText: translations.DeleteChildTitle,
          destructiveButtonClicked: function() {
            $scope.showConfirm(child);
            return true;
          },
          buttonClicked: function(index) {
            if (index === 0) {
              $scope.editableChild = angular.copy(child);
              $scope.editableChild.birthday = $scope.convertStringToDate(
                child.birthday
              );
              $scope.openModalEdit();
            }
            $ionicListDelegate.closeOptionButtons();

            return true;
          }
        });
      });
    };
    $scope.activateChild = function(item) {
      ChildrenFactory.activate(item.id, function() {
        ChildrenFactory.all(function(children) {
          $scope.childs = children;
          ChildrenFactory.active(function(active_child) {
            $scope.activeChild = active_child;
            UnsolvedProblemFactory.all($scope.activeChild.id, function(result) {
              $scope.problems = result;
            });
          });
        });
      });
    };

    ChildrenFactory.active(function(active_child) {
      $scope.activeChild = active_child;
      UnsolvedProblemFactory.all($scope.activeChild.id, function(result) {
        $scope.problems = result;
      });
    });

    $scope.goTo = function(route) {
      $state.go(route);
    };

    $scope.UpButtonConfirm = function(child) {
      if (child.unsolved_problems > 0 && child.lagging_skills_check > 0) {
        return 0;
      } else {
        return 1;
      }
    };

    $scope.UnsolvedProblemsCount = function(child) {
      UnsolvedProblemFactory.all(child.id, function(result) {
        child.unsolvedProblemsCounter = result.length;
        $scope.child.push(child);
      });
    };

    $scope.UPbutton = function(child) {
      if (child.active === 0) {
        $scope.activateChild(child);
      }
      var confirmPopup = $ionicPopup.confirm({
        template: "Are you finished with the ALSUP?",
        cancelText: "No",
        okText: "Yes"
      });

      confirmPopup.then(function(res) {
        if (res) {
          $state.go("app.newUnsolvedProblem");
        } else {
          $state.go("app.laggingSkills");
        }
      });
    };

    $scope.deleteChild = function(child) {
      if (child.active === 1) {
        $scope.activeChild = { first_name: "" };
      }
      ChildrenFactory.delete(child, function() {
        $scope.childs.splice($scope.childs.indexOf(child), 1);
        ChildrenFactory.active(function(active_child) {
          $scope.activeChild = active_child;
        });
      });
      if (typeof analytics !== "undefined") {
        analytics.trackEvent("Child", "Delete");
      } else {
        console.log("Google Analytics Unavailable");
      }
    };
    $scope.showConfirm = function(child) {
      $translate([
        "DeleteChildTitle",
        "ConfirmDeleteChildMessage",
        "YesMessage"
      ]).then(function(translations) {
        var confirmPopup = $ionicPopup.confirm({
          title: translations.DeleteChildTitle,
          template: translations.ConfirmDeleteChildMessage,
          cancelText: "No",
          okText: translations.YesMessage
        });

        confirmPopup.then(function(res) {
          if (res) {
            $scope.deleteChild(child);
            $state.go("app.childs");
          }
        });
      });
    };
    $scope.upload = function() {
      var options = {
        fileKey: "avatar",
        fileName: "image.png",
        chunkedMode: false,
        mimeType: "image/png"
      };
      $cordovaFileTransfer
        .upload(
          "http://localhost:8100",
          "/android_asset/www/img/child.png",
          options
        )
        .then(
          function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
          },
          function(err) {
            console.log("ERROR: " + JSON.stringify(err));
          },
          function(progress) {
            // constant progress updates
          }
        );
    };

    $scope.showIntroductionPage = function() {
      $translate([
        "WelcomeMessage",
        "ChooseAnOptionMessage",
        "ReadyOption"
      ]).then(function(translations) {
        if (
          localStorage.getItem("pop_up_first_time") === null &&
          localStorage.getItem("tutorial_first_time") != null
        ) {
          localStorage.setItem("pop_up_first_time", true);
          var buttonsTemplate =
            '<div class="button-bar">' +
            '<a href="http://livesinthebalance.org/walking-tour-parents" class="button button-assertive">' +
            '<b><font size="2">{{"ParentOption" | translate }}</font></b>' +
            "</a>" +
            '<a href="http://livesinthebalance.org/workshopstraining" class="button ng-binding button-energized">' +
            '<b><font size="2">{{"EducatorOption" | translate }}</font></b>' +
            "</a>" +
            '<a href="https://visitor.constantcontact.com/manage/optin?v=001DFTCDgfTjagIuIbRq2pgrG8ZVHSiKAKz7c-CMCvU_l22aSgjxedUQV-Irm8JNXt17JXGXj5O1MaEkvyw53H3fs3le1gcsNGw" class="button ng-binding button-calm">' +
            '<b><font size="2">{{"SignInOption" | translate }}</font></b>' +
            "</a>" +
            "<div>";
          var myPopup = $ionicPopup.show({
            title: translations.WelcomeMessage,
            subTitle: translations.ChooseAnOptionMessage,
            template: buttonsTemplate,
            cssClass: "popup-intro",
            buttons: [
              {
                type: "button button-balanced",
                text: translations.ReadyOption,
                onTap: function(e) {
                  myPopup.close();
                }
              }
            ]
          });

          function parentsPage() {
            $window.open("", "_system", "location=yes");
          }

          $scope.educatorPage = function() {
            $window.open("", "_system", "location=yes");
          };

          $scope.sign_inPage = function() {
            $window.open("", "_system", "location=yes");
          };
        }
      });
    };

    $scope.showTutorialFirstTime = function() {
      $scope.showIntroductionPage();
      if (localStorage.getItem("tutorial_first_time") === null) {
        localStorage.setItem("tutorial_first_time", true);
        $state.go("app.tutorial");
      }
    };

    $scope.googleAnalyticsView = function() {
      if (typeof analytics !== "undefined") {
        analytics.trackView("Manage Children view");
      } else {
        console.log("Google Analytics Unavailable");
      }
    };
  });

function createLaggingSkills(cordovaSQLite, child_id) {
  var sqlLaggingSkills = [
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_1",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_2",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_3",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_4",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_5",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_6",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_7",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_8",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_9",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_10",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_11",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_12",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_13",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_14",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_15",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_16",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_17",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_18",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_19",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_20",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_21",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_22",0,?)',
    'INSERT INTO lagging_skills (description,checked,child_id) VALUES ("LaggingSkill_23",0,?)'
  ];
  sqlLaggingSkills.forEach(function(item) {
    cordovaSQLite.execute(db, item, [child_id]);
  });
}
