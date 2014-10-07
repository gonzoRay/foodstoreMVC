"use strict";

(function () {
    angular.module('foodstore')
        .controller('CategoriesController',
        [
            '$scope',
            '$http',
            '$location',
            'localStorageService',
            CategoriesController
        ]);

    function CategoriesController($scope, $http, $location, localStorage) {
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        initScope();

        function initScope() {
            $scope.newCategory = '';
            $scope.categories = localStorage.Get(categoryStorageKey);
            $scope.redirectAddCategories = function() {
                $location.path('/categories/add');
            };

            if ($scope.categories === null || $scope.categories.length < 1) {

                $http.get('/Content/data/categories.json')
                    .success(function (data) {
                        $scope.categories = data;

                        if($scope.categories !== null && $scope.categories.length > 0) {
                            //Save initial data to localStorage "cache"
                            localStorage.Put(categoryStorageKey, $scope.categories);
                        }
                    })
                    .error(function (error) {
                        console.log('Error getting categories list: ', error);
                    });
            }
        }

        $scope.addCategory = function () {
            var newCategory = $scope.newCategory.trim();

            //Check for empty
            if (newCategory.length === 0) {
                return;
            }

            //Add new category to our categories array
            var lastId = $scope.categories[$scope.categories.length - 1].id;
            $scope.categories.push({
                id: ++lastId,
                categoryName: newCategory
            });

            //Persist products array
            localStorage.Put(categoryStorageKey, $scope.categories);
            $scope.newCategory = '';
        };

        $scope.clearCacheData = function() {
            localStorage.empty(categoryStorageKey);
        };
    }
})();



