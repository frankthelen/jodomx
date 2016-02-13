"use strict";

/**
 * @ngdoc function
 * @name jodomxApp.controller:StartWortCtrl
 * @description
 * Controller of the jodomxApp
 */
angular.module("jodomxApp")
    .controller("StartWortCtrl",
    ["$scope", "$log", "$location", "$sessionStorage", "OpenThesaurus",
    function($scope, $log, $location, $sessionStorage, OpenThesaurus) {

        $scope.player1 = $sessionStorage.player1;
        $scope.player2 = $sessionStorage.player2;

        $scope.startwort = ""; // reset

        $scope.startplayer = Math.random() < 0.5 ? $scope.player1 : $scope.player2;

        $sessionStorage.startplayer = $scope.startplayer;

        $scope.player1Counter = $sessionStorage.player1Counter;
        $scope.player2Counter = $sessionStorage.player2Counter;

        $scope.start = function() {
            $sessionStorage.startwort = $scope.startwort; // save
            $scope.loading = true;
            OpenThesaurus.getSynonyms($scope.startwort).then(
                function successCallback(synonyms) {
                    $scope.loading = false;
                    $scope.synonyms = synonyms;
                    if ($scope.synonyms.length < 5) {
                        $scope.error = "TOO-FEW-WORDS";
                    } else {
                        $location.path("/play");
                    }
                }, function errorCallback(error) {
                    $scope.loading = false;
                    $log.error(error);
                    // TODO: handle error
                }
            );
        };

    }])
;
