"use strict";

/**
 * @ngdoc function
 * @name johannaApp.controller:PlayCtrl
 * @description
 * Controller of the johannaApp
 */
angular.module("johannaApp")
    .controller("PlayCtrl", ["$scope", "$rootScope", "$location", "$sessionStorage", "OpenThesaurus",
        function ($scope, $rootScope, $location, $sessionStorage, OpenThesaurus) {

        $scope.player1 = $sessionStorage.player1;
        $scope.player2 = $sessionStorage.player2;

        $scope.startwort = $sessionStorage.startwort;

        $scope.startplayer = $sessionStorage.startplayer;
        $scope.player = $scope.startplayer === $scope.player1 ? $scope.player2 : $scope.player1;

        $scope.used = [$scope.startwort];

        $scope.player1Counter = $sessionStorage.player1Counter;
        $scope.player2Counter = $sessionStorage.player2Counter;

        $scope.play = function() {
            OpenThesaurus.getSynonyms($scope.startwort, $scope.used).then(
                function successCallback(synonyms) {
                    $scope.synonyms = synonyms;
                    if ($scope.synonyms.indexOf($scope.wort) >= 0 && $scope.used.indexOf($scope.wort) < 0) {
                        $scope.result = true;
                        if ($scope.player === $scope.player1) {
                            $scope.player1Counter += 10;
                        } else {
                            $scope.player2Counter += 10;
                        }
                        $scope.player = ($scope.player === $scope.player1) ? $scope.player2 : $scope.player1;
                        $scope.startwort = $scope.wort;
                        $scope.used.push($scope.wort);
                        $scope.wort = "";
                    } else {
                        $scope.result = false;
                    }
                }, function errorCallback(/* response */) {
                    // handle error
                }
            );
        };

        $scope.replay = function() {
            $sessionStorage.player1Counter = $scope.player1Counter;
            $sessionStorage.player2Counter = $scope.player2Counter;
            $location.path("/startwort");
        };

    }])
;
