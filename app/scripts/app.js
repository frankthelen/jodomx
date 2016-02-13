"use strict";

/**
 * @ngdoc overview
 * @name jodomxApp
 * @description
 * # jodomxApp
 *
 * Main module of the application.
 */
angular
  .module("jodomxApp", [
    "ngAnimate",
    "ngRoute",
    "ngTouch",
    "ngStorage",
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when("/start", {
        templateUrl: "views/start.html",
        controller: "StartCtrl"
      })
      .when("/startwort", {
        templateUrl: "views/startwort.html",
        controller: "StartWortCtrl"
      })
      .when("/play", {
        templateUrl: "views/play.html",
        controller: "PlayCtrl"
      })
      .otherwise({
        redirectTo: "/start"
      });
  });
