"use strict";

(function () {
    angular.module('foodstore')
        .controller('RecipeListController',
        [
            '$scope',
            '$http',
            '$location',
            '$routeParams',
            'localStorageService',
            'functionsService',
            RecipeListController
        ]);

    function RecipeListController($scope, $http, $location, $routeParams, localStorage, func) {
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        var productStorageKey = 'PRODUCT-STORAGE-KEY';
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';

        initScope();

        function initScope() {
            $scope.newRecipe = {};
            $scope.selectedCategories = {};
            $scope.recipes = localStorage.Get(recipeStorageKey);
            $scope.redirectAddRecipes = function() {
                $location.path('/recipes/add');
            };

            $scope.availableCategories = localStorage.Get(categoryStorageKey);
            $scope.availableProducts = localStorage.Get(productStorageKey);

            $scope.addRecipe = function() {
                var theNewRecipe = $scope.newRecipe;
                if(theNewRecipe === null || theNewRecipe === undefined) {
                    console.log('newRecipe is null');
                    return;
                }

                //Add new recipe to our recipes array
                var lastId = 0;
                if($scope.recipes !== null && $scope.recipes.length > 0) {
                    lastId = $scope.recipes[$scope.recipes.length - 1].id;
                }
                theNewRecipe.id = ++lastId;
                $scope.recipes.push(theNewRecipe);
                localStorage.Put(recipeStorageKey, $scope.recipes);

                $scope.newRecipe = {};
                $scope.selectedCategories = {};

                $location.path('/recipes');
            };

            //Moved removeRecipe to DetailController

            $scope.addCategory = function() {
                var selection = $scope.selectedCategories;
                if(selection !== null && selection.categoryName.indexOf('--') === -1) {
                    if($scope.newRecipe.categories === undefined) {
                        $scope.newRecipe.categories = [];
                    }
                    var itemIndex = func.Array.IndexWhere($scope.newRecipe.categories, function(value) {
                        return selection.categoryName === value;
                    });

                    if(itemIndex === -1) {
                        $scope.newRecipe.categories.push(selection.categoryName);
                    }
                }
            };

            //Load recipes from data storage if specified
            //if($routeParams.$$url !== undefined && $routeParams.$$url.indexOf('load') > -1) {
            if($routeParams.load === true) {
                loadRecipeData();
            }
        }

        function loadRecipeData() {
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
    }
})();



