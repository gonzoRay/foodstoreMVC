"use strict";
(function () {
    angular
        .module('foodstore')
        .factory('FunctionsService', FunctionsService);

    FunctionsService.$inject = [];

    function FunctionsService() {
        ////
        // Fields
        ////

        ////
        // API
        ////
        var _service = {
            Array: arrayFunctions()
        };

        return _service;

        ////
        // Functions
        ////
        function arrayFunctions() {
            return {
                IndexWhere: function (arr, condition, ctx) {
                    if (!(arr instanceof Array)) {
                        return;
                    }
                    if (typeof condition !== 'function') {
                        return;
                    }
                    var index = -1;
                    for (var i = 0; i < arr.length; i++) {
                        if (condition.call(ctx, arr[i], i)) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                }
            }
        }
    }
})();