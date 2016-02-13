"use strict";

/**
 * @ngdoc function
 * @name johannaApp.controller:StartCtrl
 * @description
 * Controller of the johannaApp
 */
angular.module("johannaApp")
    .controller("StartCtrl", ["$scope", "$rootScope", "$location", "$sessionStorage", function ($scope, $rootScope, $location, $sessionStorage) {

        $scope.player1 = $sessionStorage.player1;
        $scope.player2 = $sessionStorage.player2;

        $scope.start = function() {
            $sessionStorage.player1 = $scope.player1;
            $sessionStorage.player2 = $scope.player2;
            $sessionStorage.player1Counter = 0;
            $sessionStorage.player2Counter = 0;
            $location.path("/startwort");
        };

    }])
;
