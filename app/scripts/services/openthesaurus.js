"use strict";

/**
 * @ngdoc function
 * @name jodomxApp.controller:OpenThesaurus
 * @description
 * Controller of the jodomxApp
 */
angular.module("jodomxApp")
    .service("OpenThesaurus", ["$http", "$q", function($http, $q) {

        this.getSynonyms = function(wort) {

            var deferred = $q.defer();

            $http({
                method: "JSONP",
                url: "http://www.openthesaurus.de/synonyme/search?q=" + wort + "&format=application/json&mode=all&callback=JSON_CALLBACK"
            }).then(
                function successCallback(response) {
                var synonyms = [];
                response.data.synsets.forEach(function(synset) {
                    synset.terms.forEach(function(term) {
                        synonyms.push(term.term);
                    });
                });
                deferred.resolve(synonyms);
            }, function errorCallback(error) {
                deferred.reject(error);
            });

            return deferred.promise;

        };

    }])
;
