"use strict";

/**
 * @ngdoc function
 * @name johannaApp.controller:StartWortCtrl
 * @description
 * Controller of the johannaApp
 */
angular.module("johannaApp")
    .controller("StartWortCtrl",
        ["$scope", "$rootScope", "$location", "$sessionStorage", "OpenThesaurus",
        function ($scope, $rootScope, $location, $sessionStorage, OpenThesaurus) {

        $scope.player1 = $sessionStorage.player1;
        $scope.player2 = $sessionStorage.player2;

        $scope.startwort = "";

        $scope.startplayer =
            Math.random() < 0.5 ? $scope.player1 : $scope.player2;

        $sessionStorage.startplayer = $scope.startplayer;

        $scope.start = function() {
            $sessionStorage.startwort = $scope.startwort; // save
            OpenThesaurus.getSynonyms($scope.startwort, [$scope.startwort]).then(
                function successCallback(synonyms) {
                    $scope.synonyms = synonyms;
                    if ($scope.synonyms.length < 5) {
                        $scope.error = "TOO-FEW-WORDS";
                    } else {
                        $location.path("/play");
                    }
                }, function errorCallback(/* response */) {
                    // handle error
                }
            );
        };

    }])
;
