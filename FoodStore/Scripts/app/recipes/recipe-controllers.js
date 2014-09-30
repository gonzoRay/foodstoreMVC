"use strict";

(function () {
    angular.module('recipeControllers', [])
        .controller('RecipeListController',
        [
            '$scope',
            '$http',
            '$location',
            'localStorageService', RecipeListController
        ]);

    function RecipeListController($scope, $http, $location, localStorage) {
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        var productStorageKey = 'PRODUCT-STORAGE-KEY';
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';

        initScope();

        function initScope() {
            $scope.newRecipe = {};
            $scope.selectedCategory = {};
            $scope.recipes = localStorage.Get(recipeStorageKey);

            $scope.availableCategories = localStorage.Get(categoryStorageKey);
            $scope.availableProducts = localStorage.Get(productStorageKey);

            if ($scope.recipes === null || $scope.recipes.length < 1) {

                $http.get('/Content/data/recipes.json')
                    .success(function (data) {
                        $scope.recipes = data;

                        if($scope.recipes !== null && $scope.recipes.length > 0) {
                            //Save initial data to localStorage "cache"
                            localStorage.Put(recipeStorageKey, $scope.recipes);
                        }
                    })
                    .error(function (error) {
                        console.log('Error getting recipes list: ', error);
                    });
            }
        }

        $scope.addCategory = function() {
            var selection = $scope.selectedCategory;
            if(selection !== null && selection.categoryName.indexOf('--') === -1) {
                if($scope.newRecipe.categories === undefined) {
                    $scope.newRecipe.categories = [];
                }
                var itemIndex = indexWhere($scope.newRecipe.categories, function(value) {
                    return selection.$$hashKey === value.$$hashKey;
                });

                if(itemIndex === -1) {
                    $scope.newRecipe.categories.push(selection);
                }
            }
        }

        function indexWhere(arr, condition, ctx) {
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

    angular.module('recipeControllers')
        .controller('RecipeDetailController',
        [
            '$scope',
            '$location',
            '$routeParams',
            'localStorageService',
            RecipeDetailController
        ]);

    function RecipeDetailController($scope, $location, $routeParams, localStorage) {
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';

        initScope();

        function initScope() {
            var recipeId = $routeParams.id;
            $scope.currentRecipe = getRecipeById(recipeId);
        }

        function getRecipeById(id) {
            var allRecipes = localStorage.Get(recipeStorageKey);

            if(allRecipes === null || allRecipes.length < 1) {
                console.log('No recipes found');
                return;
            }

            for (var r = 0; r < allRecipes.length; r++) {
                if (allRecipes[r].id === +id) {
                    return allRecipes[r];
                }
            }
        }
    }
})();



