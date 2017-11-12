angular.module('starter.controllers')
.controller('planBHelpCtrl', function($scope, AppTools, $stateParams, $ionicPopup){
  $scope.searchWord = '';
  $scope.step2helpsEn = [
    {
      title:"DEFINE THE PROBLEM STEP | INGREDIENT/GOAL",
      topics: [
        { content:"Enter the concern of the second party (often the adult) into consideration" }
      ]
    },
    {
      title:"WORDS | Initial Inquiry (neutral observation)",
      topics: [
        { content:"The thing is (insert adult concern)… or My concern is (insert adult concern)…" }
      ]
    },
    {
      title:"WHAT YOU'RE THINKING",
      topics: [
        { content:"Have I been clear about my concern? Does the child understand what I have said?" }
      ]
    },
    {
      title:"DON'T",
      topics: [
        { content:"Start talking about solutions yet. Sermonize, judge, lecture, use sarcasm" }
      ]
    },
    {
      title:"Help Topics",
      topics: [
        {
          title: "I’m not sure how to word my concern",
          content: "Most adult concerns fall into one of two categories:\n1. How the problem is affecting the child.\n2. How the problem is affecting others"
        },
        {
          title: "My child is having difficulty hearing my concerns",
          url: "http://www.blogtalkradio.com/dr-ross-greene/2011/04/12/parenting-challenging-kids-collaborative-problem-solving-at-home"
        }
      ]
    }
  ];

  $scope.step2helpsEs = [
    {
      title:"ETAPA DE LA DEFINICIÓN DEL PROBLEMA | INGREDIENTE/OBJETIVO",
      topics: [
        { content:"Tomar en cuenta la preocupación de la segunda persona (por lo general el adulto)" }
      ]
    },
    {
      title:"PALABRAS | Consulta Inicial (observación neutral)",
      topics: [
        { content:"Lo que ocurre es que (insertar la preocupación del adulto)… ó lo que me preocupa es que (insertar la preocupación del adulto)…" }
      ]
    },
    {
      title:"LO QUE USTED PIENSA",
      topics: [
        { content:"¿He sido lo suficientemente claro en lo que respecta a mi preocupación?  ¿Entiende el niño lo que he dicho ?" }
      ]
    },
    {
      title:"USTED NO DEBE",
      topics: [
        { content:"Empezar a hablar primero de soluciones. Sermonear, juzgar, aleccionar, usar el sarcasmo. " }
      ]
    },
    {
      title:"Ayuda sobre el tema",
      topics: [
        {
          title: "No estoy seguro de cómo expresar mi preocupación",
          content: "La mayor parte de las preocupaciones de los adultos se reúnen en dos categorías :\n1. Cómo afecta el problema al niño.\n2. Cómo afecta el problema a los demás "
        },
        {
          title: "Mi hijo tiene dificultades para escuchar mis preocupaciones",
          url: "http://www.blogtalkradio.com/dr-ross-greene/2011/04/12/parenting-challenging-kids-collaborative-problem-solving-at-home"
        }
      ]
    }
  ];

  $scope.searchInit = function(){
    if($stateParams.searchWord){
      $scope.searchWord = $stateParams.searchWord;
    }
  };

  $scope.isContentShown = function(content) {
    return $scope.shownContent === content;
  };

  $scope.toggleContent = function(content) {
    if ($scope.isContentShown(content)) {
      $scope.shownContent = null;
    }
    else {
      $scope.shownContent = content;
    }
  };

  $scope.browserInstance = {};
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'
  });

  $scope.checkConnection = function(){
    console.log("Entro");
    if(window.Connection) {
    if(navigator.connection.type == Connection.NONE)
    { 
      var alertNotConnection = $ionicPopup.alert({
        title: 'Required Connection',
        template: "Internet access is required to view this page. Please check your internet settings and try again."
      });
     
    }}
}
  $scope.googleAnalyticsView = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView('Help Adult Concerns step view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  };

  $scope.searchInit();
});
