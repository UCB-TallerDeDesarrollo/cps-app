angular.module('starter.controllers')
.controller('AlsupCtrl', function($scope, AppTools) {

  $scope.browserInstance = {};
  $scope.browserInstance = AppTools.newBrowser({
    scope: $scope,
    animation: 'slide-in-right'
  });

  $scope.alsupHelpDir = [
    {
      title: "Audio: How to use the ALSUP",
      url:"http://www.blogtalkradio.com/drrosswgreene/2012/01/23/collaborative-problem-solving-at-school"
    },
    {
      title: "Copy of the ALSUP",
      url:"http://livesinthebalance.org/sites/default/files/ALSUP%20Rev%2011-12-12%20pdf%20%282%29_1.pdf"
    },
    {
      title: "ALSUP Guide",
      url:"http://livesinthebalance.org/sites/default/files/ALSUP%20Guide%209-16-14_1.pdf"
    },
    {
      title: "Help with the wording of unsolved problems [1]",
      url:"http://www.blogtalkradio.com/dr-ross-greene/2012/10/15/parenting-your-challenging-child"
    },
    {
      title: "Help with the wording of unsolved problems [2]",
      url:"http://www.blogtalkradio.com/dr-ross-greene/2012/05/15/parenting-your-challenging-child"
    },
    {
      title: "Video of ALSUP meeting",
      url:"http://www.livesinthebalance.org/ALSUP-meeting#overlay-context=walking-tour-parents"
    }
  ];
});
