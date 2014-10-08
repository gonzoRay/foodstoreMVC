"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('RecipeDetail', RecipeDetail);

    RecipeDetail.$inject = [
        '$scope',
        '$routeParams',
        '$location',
        'RecipeService',
        'ModalsService'
    ];

    function RecipeDetail($scope, $routeParams, $location, recipe, modals) {
        var vm = this;

        init();

        function init() {
            var recipeId = $routeParams.id;
            vm.currentRecipe = recipe.GetById(recipeId);
        }

        ////
        // Controller actions
        ////
        vm.removeRecipe = function () {
            var modalOptions = {
                prompt: 'Are you sure you wish to remove this recipe?',
                useOverlay: true,
                affirmative: 'FUCK YEAH BITCH',
                negative: 'HELLS NO',
                callback: function (proceed) {
                    if (proceed) {
                        if (recipe.Remove(vm.currentRecipe.id)) {
                            $location.path('/recipes');
                            $scope.$apply();
                        }
                    }
                }
            };
            modals.ShowConfirm(modalOptions);
        };

        vm.recipeNameExists = function() {
            return recipe.Exists(vm.newRecipe.recipeName);
        }

        vm.returnToRecipes = function () {
            $location.path('/recipes');
        };
    }
})();


