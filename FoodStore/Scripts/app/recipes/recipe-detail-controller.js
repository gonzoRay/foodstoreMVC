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

            vm.removeRecipe = function () {
                var modalOptions = {
                    prompt: 'Are you sure you wish to remove this recipe?',
                    useOverlay: true,
                    callback: function (proceed) {
                        if (proceed) {
                            if (recipe.Remove(recipeId)) {
                                $location.path('/recipes');
                                $scope.$apply();
                            }
                        }
                    }
                };
                modals.ShowConfirm(modalOptions);
            };

            vm.returnToRecipes = function () {
                $location.path('/recipes');
            };
        }
    }
})();


