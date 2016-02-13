"use strict";

/**
 * @ngdoc function
 * @name jodomxApp.controller:PlayCtrl
 * @description
 * Controller of the jodomxApp
 */
angular.module("jodomxApp")
    .controller("PlayCtrl",
        ["$scope", "$log", "$location", "$sessionStorage", "OpenThesaurus",
        function($scope, $log, $location, $sessionStorage, OpenThesaurus) {

        $scope.player1 = $sessionStorage.player1;
        $scope.player2 = $sessionStorage.player2;

        $scope.startwort = $sessionStorage.startwort;

        $scope.startplayer = $sessionStorage.startplayer;
        $scope.player = $scope.startplayer === $scope.player1 ? $scope.player2 : $scope.player1;

        $scope.used = [$scope.startwort];

        $scope.player1Counter = $sessionStorage.player1Counter;
        $scope.player2Counter = $sessionStorage.player2Counter;

        $scope.play = function() {
            $scope.loading = true;
            OpenThesaurus.getSynonyms($scope.startwort).then(
                function successCallback(synonyms) {
                    $scope.loading = false;
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
                        if ($scope.player === $scope.player1) {
                            $scope.player2Counter += 15;
                        } else {
                            $scope.player1Counter += 15;
                        }
                    }
                }, function errorCallback(error) {
                    $scope.loading = false;
                    $log.error(error);
                    // TODO: handle error
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
