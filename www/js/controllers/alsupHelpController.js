angular.module('starter.controllers')
.controller('AlsupCtrl', function($scope, $state, $translate, AppTools, $ionicPopup) {
$scope.alert = function(){
  $scope.shownContent = null;
}

  $scope.toggleContent = function(content) {
   localStorage.removeItem("coming_from_hint");
    if($scope.comes_from_help)
    {
      if ((content.title == "Help with the wording of unsolved problems" || content.title == "Ayuda con la redacción de problemas no resueltos")){
        if ($scope.isContentShown(content)) {
          $scope.shownContent = content;
        } else {
          $scope.shownContent = null;
        }
        }
      else
      {
        if ($scope.isContentShown(content)) {
          $scope.shownContent = null;
        } else {
          $scope.shownContent = content;
        }
      }
       $scope.comes_from_help = false;
    }else{
      if ($scope.isContentShown(content)) {
        $scope.shownContent = null;
      } else {
        $scope.shownContent = content;
      }
    }
  };
  $scope.isContentShown = function(content) {

    return $scope.shownContent === content;
  };

  $scope.browserInstance = {};
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'

  });
  $scope.comes_from_help = localStorage.getItem("coming_from_hint");
  $scope.from_help = function(content){
    if($scope.comes_from_help)
    {
      if ((content.title == "Help with the wording of unsolved problems" || content.title == "Ayuda con la redacción de problemas no resueltos")){
        return $scope.shownContent === null;
      }
      else
      {
        return $scope.shownContent === content;
      }
    }else{
      return $scope.shownContent === content;
    }    
  }
  $scope.isIonminus = function(content){
    if($scope.comes_from_help)
    {
      if ((content.title == "Help with the wording of unsolved problems" || content.title == "Ayuda con la redacción de problemas no resueltos")){
        return true;
      }
      else
      {
        return false;
       }
    }else{
      return false;
    }    
  }


  $scope.checkConnection = function(){
    console.log("Entro");
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE)
      {
        var alertNotConnection = $ionicPopup.alert({
          title: 'Required Connection',
          template: "Internet access is required to view this page. Please check your internet settings and try again."
        });
      }else{
        browserInstance.openBrowser(topic.url)
      }
    }
  }

  $scope.checkPlanBVideoConnection = function(){
    if(window.Connection) {
      console.log("Entro");
      if(navigator.connection.type == Connection.NONE)
      {
        var alertNotConnection = $ionicPopup.alert({
          title: 'Required Connection',
          template: "Internet access is required to view this page. Please check your internet settings and try again."
        });
      }else{
        $state.go("app.videoPlanBInAction")
        console.log("Salio");
      }
    }
  }
  $scope.checkPAlsupMeetingVideoConnection = function(url){
    if(window.Connection) {
      console.log("Entro");
      if(navigator.connection.type == Connection.NONE)
      {
        var alertNotConnection = $ionicPopup.alert({
          title: 'Required Connection',
          template: "Internet access is required to view this page. Please check your internet settings and try again."
        });
      }else{
        $state.go(url)
        console.log("Salio");
      }
    }
  }

  $scope.googleAnalyticsView = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView('ALSUP Help view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  }

  $scope.alsupHelpDirEs = [
    {
      title: "Audio: Como usar el ALSUP",
      topics: [
        { content: "Usando la evaluación de las habilidades rezagadas y los problemas no resueltos",
          url:"http://www.blogtalkradio.com/drrosswgreene/2012/01/23/collaborative-problem-solving-at-school"
        }
      ]
    },
    {
      title: "Copia del ALSUP",
      topics: [
        { content: "Evaluación de las habilidades rezagadas y los problemas sin resolver",
          url:"https://docs.google.com/gview?embedded=true&url=http://livesinthebalance.org/sites/default/files/ALSUP%20Rev%2011-12-12%20pdf%20%282%29_1.pdf"
        }
      ]
    },
    {
      title: "Guía del ALSUP",
      topics: [
        { content: "Soluciones Colaborativas y Proactivas - Guía del ALSUP",
          url:"https://docs.google.com/gview?embedded=true&url=http://livesinthebalance.org/sites/default/files/ALSUP%20Guide%209-16-14_1.pdf"
        }
      ]
    },
    {
      title: "Ayuda con la redacción de problemas no resueltos",
      topics: [
        { content: "Precisión en los problemas sin resolver",
          url:"http://www.blogtalkradio.com/dr-ross-greene/2012/10/15/parenting-your-challenging-child"
        },
        { content: "Recién comenzando: identificando problemas sin resolver",
          url:"http://www.blogtalkradio.com/dr-ross-greene/2012/05/15/parenting-your-challenging-child"
        }
      ]
    },
    {
      title: "Video de la reunión ALSUP",
      topics: [
        { content: "Reunión ALSUP (Video)",
          video:"alsupMeetingVideo"
        }
      ]
    }
  ];


  $scope.alsupHelpDirEn = [
    {
      title: "Audio: How to use the ALSUP",
      topics: [
        { content: "Using the Assessment of Lagging Skills and Unsolved Problems",
          url:"http://www.blogtalkradio.com/drrosswgreene/2012/01/23/collaborative-problem-solving-at-school"
        }
      ]
    },
    {
      title: "Copy of the ALSUP",
      topics: [
        { content: "Assessment Of Lagging Skills & Unsolved Problems",
          url:"https://docs.google.com/gview?embedded=true&url=http://livesinthebalance.org/sites/default/files/ALSUP%20Rev%2011-12-12%20pdf%20%282%29_1.pdf"
        }
      ]
    },
    {
      title: "ALSUP Guide",
      topics: [
        { content: "Collaborative & Proactive Solutions - ALSUP Guide",
          url:"https://docs.google.com/gview?embedded=true&url=http://livesinthebalance.org/sites/default/files/ALSUP%20Guide%209-16-14_1.pdf"
        }
      ]
    },
    {
      title: "Help with the wording of unsolved problems",
      topics: [
        { content: "Precision on Unsolved Problems",
          url:"http://www.blogtalkradio.com/dr-ross-greene/2012/10/15/parenting-your-challenging-child"
        },
        { content: "Just Getting Started: Identifying Unsolved Problems",
          url:"http://www.blogtalkradio.com/dr-ross-greene/2012/05/15/parenting-your-challenging-child"
        }
      ]
    },
    {
      title: "Video of ALSUP meeting",
      topics: [
        { content: "ALSUP Meeting (Video)",
          video:"alsupMeetingVideo"
        }
      ]
    }
  ];
});
