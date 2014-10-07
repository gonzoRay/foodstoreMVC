"use strict";

(function () {
    angular.module('foodstore')
        .filter('unsafe', function($sce) {
           return function(val) {
               return $sce.trustAsHtml(val);
           }
        });
})();


