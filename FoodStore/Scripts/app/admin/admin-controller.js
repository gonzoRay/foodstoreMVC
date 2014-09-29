"use strict";

(function () {
    angular.module('foodstore')
        .controller('AdminController',
        [
            '$scope',
            'localStorageService',
            AdminController
        ]
    );

    function AdminController($scope, localStorage) {
        initScope();

        function initScope() {
            $scope.resetCompleted = false;
            $scope.cacheItems = [
                { name: 'Product', key: 'PRODUCT-STORAGE-KEY', checked: false },
                { name: 'Category', key: 'CATEGORY-STORAGE-KEY', checked: false },
                { name: 'Recipe', key: 'RECIPE-STORAGE-KEY', checked: false }
            ];
        }

        $scope.resetData = function () {
            for(var i = 0; i < $scope.cacheItems.length; i++) {
                if($scope.cacheItems[i].checked) {
                    localStorage.Empty($scope.cacheItems[i].key);
                }
            }

            //TODO: Find out why this doesn't work
            /*for(var cacheItem in $scope.cacheItems){
                if(cacheItem.checked) {
                    localStorage.Empty(cacheItem.key);
                }
            }*/

            $scope.resetCompleted = true;
        };
    }
})();


