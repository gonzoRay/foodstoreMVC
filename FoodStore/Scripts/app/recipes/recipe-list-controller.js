"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('RecipeList', RecipeList);

    RecipeList.$inject = [
        '$location',
        '$routeParams',
        'LocalStorageService',
        'FunctionsService',
        'RecipeService',
        'ProductService',
        'CategoryService'
    ];

    function RecipeList($location, $routeParams, localStorage, func, recipe, product, category) {
        var vm = this;
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        var productStorageKey = 'PRODUCT-STORAGE-KEY';
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';

        init();

        function init() {
            vm.newRecipe = {};
            vm.selectedCategories = {};
            vm.recipes = recipe.GetAll() || [];
            vm.availableCategories = category.GetAll();
            vm.availableProducts = product.GetAll();

            vm.redirectAddRecipe = function () {
                $location.path('/recipes/add');
            };

            vm.addRecipe = function () {
                var newRecipe = vm.newRecipe;
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

            //Load recipes from data storage if specified
            //if($routeParams.$$url !== undefined && $routeParams.$$url.indexOf('load') > -1) {
            if ($routeParams.load === true) {
                recipe.LoadFromCabinet();
            }
        }
    }
})();



