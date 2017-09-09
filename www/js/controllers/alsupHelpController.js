angular.module('starter.controllers')
.controller('AlsupCtrl', function($scope, AppTools) {

  $scope.toggleContent = function(content) {
    if ($scope.isContentShown(content)) {
      $scope.shownContent = null;
    } else {
      $scope.shownContent = content;
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
  $scope.googleAnalyticsView = function() {
    if(typeof analytics !== 'undefined') {
      analytics.trackView('ALSUP Help view');
    } else {
        console.log("Google Analytics Unavailable");
    }
  }
  $scope.alsupHelpDir = [
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
          url:"http://livesinthebalance.org/sites/default/files/ALSUP%20Rev%2011-12-12%20pdf%20%282%29_1.pdf"
        }
      ]
    },
    {
      title: "ALSUP Guide",
      topics: [
        { content: "Collaborative & Proactive Solutions - ALSUP Guide",
          url:"http://livesinthebalance.org/sites/default/files/ALSUP%20Guide%209-16-14_1.pdf"
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
          url:"http://www.livesinthebalance.org/ALSUP-meeting#overlay-context=walking-tour-parents"
        }
      ]
    }
  ];
});
