"use strict";

(function () {

    angular.module('foodstore')
        .controller('RecipeDetailController',
        [
            '$scope',
            '$routeParams',
            '$location',
            'localStorageService',
            'functionsService',
            RecipeDetailController
        ]);

    function RecipeDetailController($scope, $routeParams, $location, localStorage, func) {
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';

        initScope();

        function initScope() {
            var recipeId = $routeParams.id;
            $scope.currentRecipe = getRecipeById(recipeId);

            $scope.removeRecipe = function() {
                var recipes = localStorage.Get(recipeStorageKey);
                var itemIndex = func.Array.IndexWhere(recipes, function(value) {
                    return $scope.currentRecipe.id === value.id;
                });

                recipes.splice(itemIndex, 1);
                localStorage.Put(recipeStorageKey, recipes);
                $location.path('/recipes');

            };
        }

        function getRecipeById(id) {
            var allRecipes = localStorage.Get(recipeStorageKey);

            if(allRecipes === null || allRecipes.length < 1) {
                console.log('No recipes found');
                return;
            }

            /*for (var r = 0; r < allRecipes.length; r++) {
                if (allRecipes[r].id === +id) {
                    return allRecipes[r];
                }
            }*/

            var recipeIndex = func.Array.IndexWhere(allRecipes, function(recipe) {
                return +id === recipe.id;
            });

            return allRecipes[recipeIndex];
        }
    }
})();


