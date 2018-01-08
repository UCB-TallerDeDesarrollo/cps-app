angular.module('starter.controllers')
    .controller('HeatMomentCtrl', function($scope, AppTools, $ionicPopup) {

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
            if (typeof analytics !== 'undefined') {
                analytics.trackView('In the heat of the moment view');
            } else {
                console.log("Google Analytics Unavailable");
            }
        };

        $scope.checkConnection = function(url){
            if(window.Connection) {
                console.log("Entro");
                if(navigator.connection.type == Connection.NONE){
                    var alertNotConnection = $ionicPopup.alert({
                        title: 'Required Connection',
                        template: "Internet access is required to view this page. Please check your internet settings and try again."
                    });
                }else{
                    $scope.browserInstance.openBrowser(url);
                    console.log("Salio");
                }   
            } 
           
        }

        $scope.heatMomentsEn = [{
                title: "Breathe so that you can get curious."
            },
            {
                title: "Remember that, in order to help, you need to first understand.",
                topics: [
                    { content: "Emergency Plan B: You seem upset about ________. What's up?" },
                    { content: "Add reassurance: \n- I'm not mad at you. \n- You are not in trouble. \n- I'm just trying to understand." }
                ]
            },
            {
                title: "The Heat Of The Moment 01/25",
                url: "http://www.blogtalkradio.com/dr-ross-greene/2016/01/25/the-heat-of-the-moment"
            },
            {
                title: "The Heat Of The Moment 03/30",
                url: "http://www.blogtalkradio.com/dr-ross-greene/2015/03/30/the-heat-of-the-moment"
            }
        ];
        $scope.heatMomentsEs = [{
            title: "Respira para que puedas sentirte curioso."
        },
        {
            title: "Recuerde que, para ayudar, primero debe comprender.",
            topics: [
                { content: "Emergencia Plan B: Pareces molesto por ________. ¿Que pasa?" },
                { content: "Añade seguridad: \n- No estoy enojado contigo. \n- No estás en problemas. \n- Solo trato de entender." }
            ]
        },
        {
            title: "El calor del momento 01/25",
            url: "http://www.blogtalkradio.com/dr-ross-greene/2016/01/25/the-heat-of-the-moment"
        },
        {
            title: "El calor del momento  03/30",
            url: "http://www.blogtalkradio.com/dr-ross-greene/2015/03/30/the-heat-of-the-moment"
        }
    ];
    });