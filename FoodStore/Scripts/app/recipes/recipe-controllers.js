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
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';
        initScope();

        function initScope() {
            $scope.newRecipe = {};
            $scope.recipes = localStorage.Get(recipeStorageKey);

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



