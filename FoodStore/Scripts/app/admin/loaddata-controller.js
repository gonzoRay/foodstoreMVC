"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('LoadData', LoadData);

    LoadData.$inject = [
        '$scope',
        'ProductService',
        'CategoryService',
        'RecipeService'
    ];

    function LoadData($scope, product, category, recipe) {
        var vm = this;
        init();

        function init() {
            vm.loadCompleted = false;
            vm.cacheItems = [
                { name: 'Product', checked: false },
                { name: 'Category', checked: false },
                { name: 'Recipe', checked: false }
            ];
        }

        ////
        // Controller actions
        ////
        vm.loadData = function() {
            for (var i = 0; i < vm.cacheItems.length; i++) {
                if (vm.cacheItems[i].checked) {
                    var dataCacheName = vm.cacheItems[i].name.trim().toLowerCase();
                    reloadData(dataCacheName);
                }
            }

            vm.loadCompleted = true;
            //$scope.$apply();
        };

        function reloadData(cacheName) {
            var cache = eval(cacheName);
            if(typeof cache === 'object') {
                cache.Empty();
                cache.LoadFromCabinet();
            } else {
                console.log('could not evaluate cacheName');
            }
        }
    }
})();


