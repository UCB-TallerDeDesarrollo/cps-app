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
    ChildConcernFactory,
    PossibleSolutionFactory,
    AppTools
  ) {
    $scope.friendShareID;
    $scope.user_friend = { id: "" };
    $scope.user_friend.id = "";
    $scope.child = {};
    $scope.child.first_name = "";
    $scope.sharedAlsups;

    ChildrenFactory.all(function(children) {
      $scope.childs = children;
    });
    $scope.activeChild = { first_name: "" };
    $scope.secondActiveChild = { first_name: "" };
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

    $scope.createPair = function(idSolutionAlfin) {
      if (!inputFieldIsEmpty($scope.pair.description)) {
        PossibleSolutionFactory.insertPair($scope.pair, idSolutionAlfin);
        $scope.pair.description = "";
      }
    };

    $scope.closeModalCreate = function() {
      $scope.modalCreate.hide();
      $scope.child.first_name = "";
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

    $ionicModal
      .fromTemplateUrl("templates/child/share-child-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        $scope.modalShare = modal;
        $scope.modalShare.hide();
      });

    $scope.openModalEdit = function() {
      $scope.modalEdit.show();
    };

    $scope.openModalShare = function() {
      $scope.modalShare.show();
    };
    $scope.closeModalEdit = function() {
      $scope.modalEdit.hide();
      $ionicListDelegate.closeOptionButtons();
    };

    $scope.closeModalShare = function() {
      $scope.modalShare.hide();
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

    // Cleanup the modal when we're done with it!
    $scope.$on("$destroy", function() {
      $scope.modalShare.remove();
    });
    // Execute action on hide modal
    $scope.$on("modalShare.hidden", function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on("modalShare.removed", function() {
      // Execute action
    });

    $scope.convertStringToDate = function(dateToConvert) {
      return new Date(dateToConvert);
    };

    $scope.createChild = function() {
      if (!inputFieldIsEmpty($scope.child.first_name)) {
        ChildrenFactory.insert($scope.child, function() {
          $scope.child.first_name = "";
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

    $scope.shareChildForm = function(friend_id) {
      $scope.uploadData();
      child_id = $scope.child.id;
      var user_id = localStorage.getItem("user_id");
      $http
        .post(
          $link_root +
            "/users/" +
            user_id +
            "/children/" +
            child_id +
            "/alsup_share",
          {
            friend_id: friend_id
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function(obj) {
              var str = [];
              for (var p in obj)
                str.push(
                  encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
              return str.join("&");
            }
          }
        )
        .then(data => {
          console.log("Datos: ");
          console.log(data.data);
          var alertForAcceptedRequest = $ionicPopup.alert({
            title: "Result",
            template: data.data.message
          });
        })
        .catch(error => {
          console.log(error.status);
        });
      $scope.modalShare.hide();
    };

    $scope.getFriendShared = function(child_id) {
      var user_id = localStorage.getItem("user_id");
      $http
        .get(
          $link_root +
            "/users/" +
            user_id +
            "/children/" +
            child_id +
            "/showShered",
          {
            headers: { Authorization: localStorage.getItem("auth_token") }
          }
        )
        .then(data => {
          if (data.data == false) {
            $scope.friendName = "";
          } else {
            $scope.friendName = data.data;
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    };

    $scope.getSharedAlsups = function() {
      var user_id = localStorage.getItem("user_id");
      $http
        .get($link_root + "/users/" + user_id + "/alsup_share", {
          headers: { Authorization: localStorage.getItem("auth_token") }
        })
        .then(data => {
          $scope.sharedAlsups = data.data;
        })
        .catch(error => {
          console.log(error.message);
        });
    };

    $scope.sharedChildId;
    $scope.getSharedChildId = function(shareChildId) {
      $scope.sharedChildId = shareChildId;
      console.log($scope.sharedChildId);
    };

    $scope.confirmStopSharedAlsup = function(friend) {
      var alertForStopSharedAlsup = $ionicPopup.confirm({
        title: "Stop sharing ALSUP",
        cancelText: "No",
        template:
          "Are you sure you want to stop share this ALSUP with your friend " +
          friend.name +
          " " +
          friend.last_name +
          "?",
        okText: "Yes"
      });
      alertForStopSharedAlsup.then(function(res) {
        if (res) {
          console.log(friend.id);
          $scope.stopSharedAlsup(friend.id);
        }
      });
    };

    $scope.stopSharedAlsup = function(friend_id) {
      var user_id = localStorage.getItem("user_id");
      $http
        .delete(
          $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.sharedChildId +
            "/alsup_share_delete",
          {
            headers: { Authorization: localStorage.getItem("auth_token") }
          }
        )
        .then(
          data => {
            var alertForSentRequest = $ionicPopup.alert({
              title: data.data.status,
              template: data.data.message
            });
            $state.go($state.current, {}, { reload: true });
          },
          function(response) {
            console.log(response.data.message);
          }
        );
    };

    $ionicModal
      .fromTemplateUrl("templates/child/sync-child-modal.html", {
        scope: $scope
      })
      .then(function(modal) {
        $scope.syncChildModal = modal;
      });

    $scope.checkConnection = function() {
      console.log("Entro");
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          var alertNotConnection = $ionicPopup.alert({
            title: "Required Connection",
            template:
              "Internet access is required to view this page. Please check your internet settings and try again."
          });
        }
      }
    };
    $scope.showSyncModal = function(child) {
      $scope.child = child;
      $scope.syncChildModal.show();
      LaggingSkills.all($scope.child.id, function(res) {
        $scope.laggingSkills = res;
      });
    };
    $scope.uploadData = function() {
      $scope.uploadChild();
    };

    $scope.downloadData = function() {
      $scope.downloadChild();
      $scope.downloadUnsolvedProblems();
      $scope.downloadLaggingSkill();
      $scope.downloadChildConcerns();
      $scope.downloadAdultConcern();
      $scope.downloadPosibleSolutions();
      $scope.downloadSolutionComentary();
      $scope.downloadPairSolution();
    };
    $scope.uploadChild = function() {
      var user_id = localStorage.getItem("user_id");
      $http
        .post(
          $link_root + "/users/" + user_id + "/children",
          {
            //id: $scope.child.id,
            child_id: $scope.child.id,
            name: $scope.child.first_name
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function(obj) {
              var str = [];
              for (var p in obj)
                str.push(
                  encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
              return str.join("&");
            }
          }
        )
        .then(
          data => {
            console.log($scope.child.id);
            console.log("Child created");
            $scope.uploadUnsolvedProblem();
          },
          function(response) {
            console.log(response.data.message);
          }
        );
    };

    $scope.downloadChild = function() {
      var user_id = localStorage.getItem("user_id");
      var link = $link_root + "/users/" + user_id + "/children/";
      var data = {};
      $http.get(link + $scope.child.id).then(data => {
        $scope.s_child = data.data;
        console.log($scope.s_child.child_id);
        var query = "UPDATE childs SET first_name = ? where id = ?";
        var params = [$scope.s_child.name, $scope.s_child.child_id];
        console.log("Nombre: " + $scope.s_child.name);
        $cordovaSQLite.execute(db, query, params);
        ChildrenFactory.all(function(children) {
          $scope.childs = children;
        });
        console.log("Child updated");
        // location.reload();
        $scope.syncChildModal.hide();
      });
    };

    $scope.uploadUnsolvedProblem = function() {
      var user_id = localStorage.getItem("user_id");
      var link =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";
      $scope.unsolvedProblems = {};
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var data = result;
        console.log(data);
        var user_id = localStorage.getItem("user_id");

        $http
          .post(
            link,
            {
              data: angular.toJson(data),
              user_id: user_id
            },
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                  str.push(
                    encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                  );
                return str.join("&");
              }
            }
          )
          .then(
            data => {
              $scope.uploadAdultConcern();
            },
            function(response) {
              console.log(response.data.message);
            }
          );
        $timeout(function() {
          $scope.displayErrorMsg = false;
        }, 3000);
      });
    };

    $scope.downloadUnsolvedProblems = function() {
      var user_id = localStorage.getItem("user_id");
      var link =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";
      $scope.unsolvedProblems;
      $http.get(link).then(data => {
        $scope.unsolvedProblems = data.data;
        angular.forEach($scope.unsolvedProblems, function(value, key) {
          var query =
            "UPDATE unsolved_problems SET description = ?, unsolved_order = ? where id = ?";
          var params = [
            value.description,
            value.unsolved_order,
            value.unsolved_problem_id_app
          ];
          console.log(value);
          $cordovaSQLite.execute(db, query, params);
        });
        var alertForAccountCreated = $ionicPopup.alert({
          title: " Success!",
          template: "Child's unsovled problems downloaded"
        });
        console.log("Child's unssolved problems downloaded");
      });
    };

    $scope.uploadLaggingSkill = function() {
      var user_id = localStorage.getItem("user_id");
      var data = [];
      data = LaggingSkills.getChecked($scope.laggingSkills);
      console.log(data);

      $http
        .post(
          $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/lagging_skill",
          {
            data: angular.toJson(data)
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function(obj) {
              var str = [];
              for (var p in obj)
                str.push(
                  encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
              return str.join("&");
            }
          }
        )
        .then(
          data => {
            console.log("LaggingSkill uploated");
            var alertForAccountCreated = $ionicPopup.alert({
              title: "Success!",
              template: "Child uploaded."
            });
          },
          function(response) {
            console.log(response.data.message);
          }
        );
      $timeout(function() {
        $scope.displayErrorMsg = false;
      }, 4000);
    };

    $scope.downloadLaggingSkill = function() {
      var user_id = localStorage.getItem("user_id");
      var link =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/getLaggingSkills";
      var data = {};
      $http.get(link).then(data => {
        $scope.list = data.data;
        console.log($scope.list);

        angular.forEach($scope.list, function(laggingSkill) {
          var query =
            "UPDATE lagging_skills SET description = ?, checked = ? , child_id = ? where id = ?";
          var params = [
            laggingSkill.description,
            laggingSkill.checked,
            $scope.child.id,
            laggingSkill.lagskill_id
          ];
          $cordovaSQLite.execute(db, query, params);
        });

        console.log("LaggingSkills Updated");
      });
    };

    $scope.uploadAdultConcern = function() {
      $scope.unsolvedProblems = {};
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var dataUP = result;
        var user_id = localStorage.getItem("user_id");

        angular.forEach(dataUP, function(unsolvedProblem) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            unsolvedProblem.id +
            "/adult_concern";
          AdultConcernFactory.all(unsolvedProblem.id, function(result) {
            var data = result;
            console.log(data);

            $http
              .post(
                link,
                {
                  data: angular.toJson(data)
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                      str.push(
                        encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                      );
                    return str.join("&");
                  }
                }
              )
              .then(
                data => {
                  console.log(data);
                  console.log("Adult Concern uploated");

                  $scope.uploadChildConcern();
                },
                function(response) {
                  console.log(response.data.message);
                }
              );
            $timeout(function() {
              $scope.displayErrorMsg = false;
            }, 5000);
          });
        });
      });

      $timeout(function() {
        $scope.displayErrorMsg = false;
      }, 4000);
    };

    $scope.downloadAdultConcern = function() {
      var user_id = localStorage.getItem("user_id");

      var linkUPData =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";

      $scope.unsolvedProblems;
      $http.get(linkUPData).then(data => {
        $scope.unsolvedProblems = data.data;
        angular.forEach($scope.unsolvedProblems, function(valueUP, key) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            valueUP.id +
            "/myAdultConcerns";
          $http.get(link).then(data => {
            $scope.adultConcerns = data.data;
            angular.forEach($scope.adultConcerns, function(value, key) {
              var query =
                "UPDATE adults_concerns SET description = ?, unsolved_problem_id = ? where id = ?";
              var params = [
                value.description,
                value.unsolved_problem_id,
                value.concern_id
              ];
              console.log(value);
              $cordovaSQLite.execute(db, query, params);
            });

            console.log("AdultConcerns from UnsolvedProblem downloaded");
          });
        });

        console.log("Unsolved problems downloaded");
      });
    };
    $scope.uploadChildConcern = function() {
      $scope.unsolvedProblems = {};
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var dataUP = result;
        console.log(dataUP);
        var user_id = localStorage.getItem("user_id");
        angular.forEach(dataUP, function(unsolvedProblem) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            unsolvedProblem.id +
            "/child_concern";
          console.log(link);
          ChildConcernFactory.all(unsolvedProblem.id, function(result) {
            var data = result;
            console.log(data);
            $http
              .post(
                link,
                {
                  data: angular.toJson(data)
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                      str.push(
                        encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                      );
                    return str.join("&");
                  }
                }
              )
              .then(
                data => {
                  console.log(data);
                  $scope.uploadSolution();
                },
                function(response) {
                  console.log(response.data.message);
                }
              );
            $timeout(function() {
              $scope.displayErrorMsg = false;
            }, 8000);
          });
        });
      });

      $timeout(function() {
        $scope.displayErrorMsg = false;
      }, 8000);
    };

    $scope.downloadChildConcerns = function() {
      var user_id = localStorage.getItem("user_id");
      var linkUPData =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";
      $scope.unsolvedProblems;
      $http.get(linkUPData).then(data => {
        $scope.unsolvedProblems = data.data;
        angular.forEach($scope.unsolvedProblems, function(valueUP, key) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            valueUP.id +
            "/getChildConcern";
          $http.get(link).then(data => {
            $scope.childConcerns = data.data;
            angular.forEach($scope.childConcerns, function(value, key) {
              var query =
                "UPDATE childs_concerns SET description = ?, unsolved_order =? , unsolved_problem_id = ? where id = ?";
              var params = [
                value.description,
                value.order,
                value.unsolved_problem_id,
                value.concern_id
              ];
              console.log(value);
              $cordovaSQLite.execute(db, query, params);
            });

            console.log("ChildConcerns from UnsolvedProblem downloaded");
          });
        });

        console.log("Unsolved problems downloaded");
      });
    };

    $scope.uploadSolution = function() {
      var user_id = localStorage.getItem("user_id");
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var dataUP = result;
        angular.forEach(dataUP, function(unsolvedProblem) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            unsolvedProblem.id +
            "/posible_solution";
          PossibleSolutionFactory.all(unsolvedProblem.id, function(result) {
            var data = result;
            console.log("All UP app:");
            console.log(data);
            $http
              .post(
                link,
                {
                  data: angular.toJson(data),
                  user_id: user_id,
                  child_id: $scope.child.id,
                  unsolved_problem_id: unsolvedProblem.id
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                      str.push(
                        encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                      );
                    return str.join("&");
                  }
                }
              )
              .then(
                data => {
                  console.log(data);
                  $scope.uploadSolutionComentary();
                  $scope.uploadPairSolution();
                  $scope.uploadLaggingSkill();
                },
                function(response) {
                  console.log(response.data.message);
                }
              );
            $timeout(function() {
              $scope.displayErrorMsg = false;
            }, 3000);
          });
        });
      });

      $timeout(function() {
        $scope.displayErrorMsg = false;
      }, 4000);
    };

    $scope.downloadPosibleSolutions = function() {
      var user_id = localStorage.getItem("user_id");
      var linkUPData =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";
      $scope.unsolvedProblems;
      $http.get(linkUPData).then(data => {
        $scope.unsolvedProblems = data.data;
        angular.forEach($scope.unsolvedProblems, function(valueUP, key) {
          var link =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            valueUP.unsolved_problem_id_app +
            "/posible_solution";
          $http.get(link).then(data => {
            $scope.possibleSolution = data.data;
            console.log("All UP API:");
            console.log(($scope.possibleSolution = data.data));
            angular.forEach($scope.possibleSolution, function(value, key) {
              var query =
                "UPDATE solutions SET description = ?, rating =? where id = ? ";
              var params = [
                value.description,
                value.rating,
                value.posible_solution_id
              ];
              console.log(value);
              $cordovaSQLite.execute(db, query, params);
            });
            console.log("Posibble Solutions downloaded");
          });
        });
      });
    };

    $scope.uploadSolutionComentary = function() {
      var user_id = localStorage.getItem("user_id");
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var dataUP = result;
        angular.forEach(dataUP, function(unsolvedProblem) {
          PossibleSolutionFactory.all(unsolvedProblem.id, function(result) {
            var dataSolutions = result;
            angular.forEach(dataSolutions, function(solutions) {
              var link =
                $link_root +
                "/users/" +
                user_id +
                "/children/" +
                $scope.child.id +
                "/unsolved_problem/" +
                unsolvedProblem.id +
                "/posible_solution/" +
                solutions.id +
                "/solution_commentary";
              PossibleSolutionFactory.getComments(solutions.id, function(
                result
              ) {
                var data = result;
                console.log("All commentaries:");
                console.log(data);
                $http
                  .post(
                    link,
                    {
                      data: angular.toJson(data),
                      user_id: user_id,
                      child_id: $scope.child.id,
                      unsolved_problem_id: unsolvedProblem.id,
                      solution_id: solutions.id
                    },
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                          str.push(
                            encodeURIComponent(p) +
                              "=" +
                              encodeURIComponent(obj[p])
                          );
                        return str.join("&");
                      }
                    }
                  )
                  .then(
                    data => {
                      console.log(data);
                    },
                    function(response) {
                      console.log(response.data.message);
                    }
                  );
                $timeout(function() {
                  $scope.displayErrorMsg = false;
                }, 3000);
              });
            });
          });
        });
      });

      $timeout(function() {
        $scope.displayErrorMsg = false;
      }, 4000);
    };

    $scope.downloadSolutionComentary = function() {
      var user_id = localStorage.getItem("user_id");
      var unsolvedProblemsLink =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem";
      $scope.unsolvedProblems;
      $scope.possibleSolutions;
      $http.get(unsolvedProblemsLink).then(data => {
        $scope.unsolvedProblems = data.data;
        angular.forEach($scope.unsolvedProblems, function(
          unsolvedProblem,
          key
        ) {
          var possibleSolutionsLink =
            $link_root +
            "/users/" +
            user_id +
            "/children/" +
            $scope.child.id +
            "/unsolved_problem/" +
            unsolvedProblem.unsolved_problem_id_app +
            "/posible_solution";
          $http.get(possibleSolutionsLink).then(data => {
            $scope.possibleSolutions = data.data;
            angular.forEach($scope.possibleSolutions, function(
              possibleSolution,
              key
            ) {
              var commentariesLink =
                $link_root +
                "/users/" +
                user_id +
                "/children/" +
                $scope.child.id +
                "/unsolved_problem/" +
                unsolvedProblem.unsolved_problem_id_app +
                "/posible_solution/" +
                possibleSolution.posible_solution_id +
                "/solution_commentary";
              $http.get(commentariesLink).then(data => {
                $scope.commentaries = data.data;
                angular.forEach($scope.commentaries, function(value, key) {
                  var query =
                    "UPDATE solution_comments SET description = ?, commented_at =? where id = ? ";
                  var params = [
                    value.description,
                    value.updated_at,
                    value.solution_commentary_id_app
                  ];
                  $cordovaSQLite.execute(db, query, params);
                });
              });
            });
            console.log("Commentaries Downloaded");
          });
        });
      });
    };
    $scope.uploadPairSolution = function() {
      var user_id = localStorage.getItem("user_id");
      UnsolvedProblemFactory.all($scope.child.id, function(result) {
        var dataUP = result;
        angular.forEach(dataUP, function(unsolvedProblem) {
          PossibleSolutionFactory.all(unsolvedProblem.id, function(result) {
            var dataSolutions = result;
            angular.forEach(dataSolutions, function(solutions) {
              var link =
                $link_root +
                "/users/" +
                user_id +
                "/children/" +
                $scope.child.id +
                "/unsolved_problem/" +
                unsolvedProblem.id +
                "/posible_solution/" +
                solutions.id +
                "/solution_pairs";
              PossibleSolutionFactory.allPairs(solutions.id, function(result) {
                var data = result;
                console.log("All pairs:");
                console.log(data);
                $http
                  .post(
                    link,
                    {
                      data: angular.toJson(data),
                      user_id: user_id,
                      child_id: $scope.child.id,
                      unsolved_problem_id: unsolvedProblem.id,
                      solution_id: solutions.id
                    },
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                          str.push(
                            encodeURIComponent(p) +
                              "=" +
                              encodeURIComponent(obj[p])
                          );
                        return str.join("&");
                      }
                    }
                  )
                  .then(
                    data => {
                      console.log(data);
                      $timeout(function() {
                        $scope.displayErrorMsg = false;
                      }, 3000);
                    },
                    function(response) {
                      console.log(response.data.message);
                    }
                  );
              });
            });
          });
        });
      });
    };
    $scope.downloadPairSolution = function() {
      console.log("entra a pares");
      var user_id = localStorage.getItem("user_id");
      var solution_pairs_link =
        $link_root +
        "/users/" +
        user_id +
        "/children/" +
        $scope.child.id +
        "/unsolved_problem/1/posible_solution/1/solution_pairs";
      $http
        .get(solution_pairs_link, {
          headers: { Authorization: localStorage.getItem("auth_token") }
        })
        .then(data => {
          $scope.solution_pairs = data.data;
          angular.forEach($scope.solution_pairs, function(value, key) {
            var query =
              "UPDATE pair_childConcerntoadultConcern SET description = ?, description2 = ? where id = ? ";
            var params = [
              value.description,
              value.description2,
              value.solution_id
            ];
            $cordovaSQLite.execute(db, query, params);
            console.log("Solutions pairs Downloaded");
          });
        });
    };
    $scope.showActionsheet = function(child) {
      $translate([
        "EditChildTitle",
        "CancelOption",
        "DeleteChildTitle",
        "ShareALSUP",
        "unShareALSUP"
      ]).then(function(translations) {
        // Link para factorizar ionicActionSheet: https://www.ghadeer.io/ionicactionsheet-example/
        var buttons = [{ text: translations.EditChildTitle }];
        //var buttons = [{ text: translations.EditChildTitle },{text: translations.ShareALSUP} ];
        $scope.getFriendShared(child.id);
        $ionicActionSheet.show({
          buttons: buttons,
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
              $scope.openModalEdit();
            }
            if (index === 1) {
              $scope.child = angular.copy(child);
              $scope.openModalShare();
            }
            $ionicListDelegate.closeOptionButtons();

            return true;
          }
        });
      });
    };

    $scope.getUserFriends = function() {
      var user_id = localStorage.getItem("user_id");
      $http
        .get($link_root + "/users/" + user_id + "/contacts", {
          headers: { Authorization: localStorage.getItem("auth_token") }
        })
        .then(data => {
          $scope.userFriends = data.data;
        })
        .catch(error => {
          console.log(error.message);
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
        var beforeIndex;
        var beforeItem;
        var sizeOfList = $scope.childs.length;
        if (sizeOfList > 1) {
          beforeIndex = $scope.childs.indexOf(child) - 1;
          beforeItem = $scope.childs[beforeIndex];
          console.log(sizeOfList);
          console.log(beforeIndex);
          console.log(beforeItem);
          if (sizeOfList > beforeIndex + 2) {
            active_child = {
              first_name: $scope.childs[sizeOfList - 1].first_name
            };
            $scope.activateChild($scope.childs[sizeOfList - 1]);
          } else if (beforeIndex >= 0) {
            active_child = { first_name: beforeItem.first_name };
            console.log(beforeItem.first_name);
            $scope.activateChild(beforeItem);
          } else {
            active_child = { first_name: "" };
          }

          console.log(active_child);
        } else {
          active_child = { first_name: "" };
        }
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

    $scope.noConnection = function (){
      var alertNotConnection = $ionicPopup.alert({
        title: "Required Connection",
        template:
          "Internet access is required to view this page. Please check your internet settings and try again.",
        buttons: [
          {
            type: "button button-positive",
            text: "OK",
            onTap: function(e) {
              alertNotConnection.close();
              $scope.openMyPopup();
            }
          }
        ]
      });
    };

    $scope.openMyPopup = function(){
$translate([
          "WelcomeMessage",
          "ChooseAnOptionMessage",
          "launchApp",
          "tellMeMoreCps"
        ]).then(function(translations) {
      var myPopup = $ionicPopup.show({
            title: translations.WelcomeMessage,
            buttons: [
              {
                type: "button button-energized",
                text: translations.tellMeMoreCps,
                onTap: function(e)  {
                  console.log("Entro");
                  if (window.Connection) {
                    console.log("Conexion");
                    if (navigator.connection.type == Connection.NONE) {
                      myPopup.close();
                      $scope.noConnection();
                    } else {
                      myPopup.close();
                      $state.go("app.welcomeBrowser");
                      console.log("Salio");
                    }
                  }
                }
              },
              {
                type: "button button-balanced",
                text: translations.launchApp,
                onTap: function(e) {
                  myPopup.close();
                }
              }
            ]
          });
});
    };

    $scope.showIntroductionPage = function() {
      if (
        localStorage.getItem("pop_up_first_time") === null &&
        localStorage.getItem("tutorial_first_time") != null
      ) {
        localStorage.setItem("pop_up_first_time", true);
        

          $scope.openMyPopup();
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
    };

    $scope.showTutorialFirstTime = function() {
      if (localStorage.getItem("tutorial_first_time") === null) {
        localStorage.setItem("tutorial_first_time", true);
        $state.go("app.tutorial");
        $scope.showIntroductionPage();
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
