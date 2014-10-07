"use strict";

(function () {
    angular.module('foodstore')
        .controller('CategoriesController',
        [
            '$http',
            '$location',
            'LocalStorageService',
            'FunctionsService',
            CategoriesController
        ]);

    function CategoriesController($http, $location, localStorage, func) {
        var vm = this;
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        initScope();

        function initScope() {
            vm.newCategory = '';
            vm.categories = localStorage.Get(categoryStorageKey);
            vm.existingCategoryId = -1;
            vm.redirectAddCategories = function() {
                $location.path('/categories/add');
            };

            if (vm.categories === null || vm.categories.length < 1) {
                $http.get('/Content/data/categories.json')
                    .success(function (data) {
                        vm.categories = data;

                        if(vm.categories !== null && vm.categories.length > 0) {
                            //Save initial data to localStorage "cache"
                            localStorage.Put(categoryStorageKey, vm.categories);
                        }
                    })
                    .error(function (error) {
                        console.log('Error getting categories list: ', error);
                    });
            }
        }

        vm.addCategory = function () {
            var newCategory = vm.newCategory.trim();

            //Check for empty
            if (newCategory.length === 0) {
                return;
            }

            //Check for existing item w/ same name
            vm.existingCategoryId = func.Array.IndexWhere(vm.categories, function(value) {
               return newCategory === value.categoryName;
            });

            if(vm.existingCategoryId > -1) {
                console.log('category: ', newCategory, ' already exists');
                return;
            }

            //Add new category to our categories array
            var lastId = vm.categories[vm.categories.length - 1].id;
            vm.categories.push({
                id: ++lastId,
                categoryName: newCategory
            });

            //Persist products array
            localStorage.Put(categoryStorageKey, vm.categories);
            vm.newCategory = '';
        };

        vm.clearCacheData = function() {
            localStorage.empty(categoryStorageKey);
        };
    }
})();



