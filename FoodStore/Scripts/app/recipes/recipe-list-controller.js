"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('RecipeList', RecipeList);

    RecipeList.$inject = [
        '$location',
        'FunctionsService',
        'RecipeService',
        'ProductService',
        'CategoryService'
    ];

    function RecipeList($location, func, recipe, product, category) {
        var vm = this;

        init();

        function init() {
            vm.newRecipe = {};
            vm.selectedCategories = {};
            vm.selectedIngredients = {};
            vm.recipes = recipe.GetAll() || [];
            vm.availableCategories = category.GetAll() || [];
            vm.availableProducts = product.GetAll() || [];
            vm.availableUnits = [
                {
                    unit: 'cup(s)'
                },
                {
                    unit: 'tbsp(s)'
                },
                {
                    unit: 'tsp(s)'
                },
                {
                    unit: 'pinch(es)'
                }

            ];
        }

        ////
        // Controller actions
        ////
        vm.redirectAddRecipe = function () {
            $location.path('/recipes/add');
        };

        vm.addRecipe = function () {
            var newRecipe = vm.newRecipe;

            //Check if recipe already exists
            vm.recipeNameExists = recipe.Exists(newRecipe.recipeName);

            if (vm.recipeNameExists) {
                console.log(newRecipe.recipeName, 'already exists');
                return;
            }

            recipe.Add(newRecipe);

            vm.newRecipe = {};
            vm.selectedCategories = {};

            $location.path('/recipes');
        };

        vm.addCategory = function () {
            var selection = vm.selectedCategories;
            if (selection !== null && selection.categoryName.indexOf('--') === -1) {
                if (vm.newRecipe.categories === undefined) {
                    vm.newRecipe.categories = [];
                }
                var itemIndex = func.Array.IndexWhere(vm.newRecipe.categories, function (value) {
                    return selection.categoryName === value;
                });

                if (itemIndex === -1) {
                    vm.newRecipe.categories.push(selection.categoryName);
                }
            }
        };

        vm.addIngredient = function() {
            var selection = vm.selectedIngredients;
            if (selection !== null && selection.productName.indexOf('--') === -1) {
                if (vm.newRecipe.ingredients === undefined) {
                    vm.newRecipe.ingredients = [];
                }
                var itemIndex = func.Array.IndexWhere(vm.newRecipe.ingredients, function (value) {
                    return selection.productName === value.name;
                });

                if(itemIndex > -1) {
                    return;
                }

                //Add to newRecipe.ingredients array
                vm.newRecipe.ingredients.push({
                    name: selection.productName,
                    quantity: vm.quantity,
                    unit: vm.unit
                });

            }
        };
    }
})();



