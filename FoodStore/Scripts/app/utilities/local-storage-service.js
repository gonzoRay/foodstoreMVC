"use strict";

(function () {
    angular
        .module('foodstore')
        .factory('LocalStorageService', LocalStorageService);

    LocalStorageService.$inject = [];

    function LocalStorageService() {
        ////
        // Fields
        ////

        ////
        // API
        ////
        var _service = {
            Get: get,
            Put: put,
            Empty: empty
        };
        return _service;

        ////
        // Functions
        ////
        function get(storageKey) {
            return JSON.parse(localStorage.getItem(storageKey));
        }

        function put(storageKey, items) {
            localStorage.setItem(storageKey, JSON.stringify(items));
        }

        function empty(storageKey) {
            localStorage.removeItem(storageKey);
        }
    }
})();



