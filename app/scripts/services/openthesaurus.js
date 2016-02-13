"use strict";

/**
 * @ngdoc function
 * @name johannaApp.controller:OpenThesaurus
 * @description
 * Controller of the johannaApp
 */
angular.module("johannaApp")
    .service("OpenThesaurus", ["$http", "$q", function($http, $q) {

        this.getSynonyms = function(wort, exclude) {

            exclude = exclude || [];

            var deferred = $q.defer();

            $http({
                method: 'JSONP',
                url: "http://www.openthesaurus.de/synonyme/search?q=" + wort + "&format=application/json&mode=all&callback=JSON_CALLBACK"
            }).then(
                function successCallback(response) {
                var synonyms = [];
                response.data.synsets.forEach(function(synset) {
                    synset.terms.forEach(function(term) {
                        var t = term.term;
                        if (exclude.indexOf(t) < 0) {
                            synonyms.push(t);
                        }
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
