"use strict";

(function () {
    angular
        .module('foodstore')
        .factory('RecipeService', RecipeService);

    RecipeService.$inject = [
        '$http',
        'LocalStorageService',
        'FunctionsService'
    ];

    function RecipeService($http, localStorage, func) {
        ////
        // Fields
        ////
        var recipeStorageKey = 'RECIPE-STORAGE-KEY';
        var existingRecipeId = -1;

        ////
        // API
        ////
        var _service = {
            Add: addRecipe,
            Exists: doesRecipeExist,
            Remove: removeRecipe,
            GetById: getRecipeById,
            GetAll: getAllRecipes,
            LoadFromCabinet: loadRecipes
        };
        return _service;

        ////
        // Functions
        ////
        function addRecipe(newRecipe) {
            if (newRecipe === null || newRecipe === undefined) {
                console.log('newRecipe is null');
                return;
            }

            var recipes = getAllRecipes();

            //Add new recipe to our recipes array
            var lastId = 0;
            if (recipes !== null && recipes.length > 0) {
                lastId = recipes[recipes.length - 1].id;
            }
            newRecipe.id = ++lastId;
            recipes.push(newRecipe);

            //Persist to cache
            localStorage.Put(recipeStorageKey, recipes);
        }

        function doesRecipeExist(recipeName) {
            //Check for existing item w/ same name
            existingRecipeId = func.Array.IndexWhere(getAllRecipes(), function (value) {
                return recipeName === value.recipeName;
            });

            if (existingRecipeId > -1) {
                return true;
            }

            return false;
        }

        function removeRecipe(recipeId) {
            var recipes = localStorage.Get(recipeStorageKey);
            var itemIndex = func.Array.IndexWhere(recipes, function (value) {
                return +recipeId === value.id;
            });


            if (itemIndex > -1) {
                if (recipes.splice(itemIndex, 1).length > 0) {
                    localStorage.Put(recipeStorageKey, recipes);
                    return true;
                }

            } else {
                console.log('Error removing recipe. Recipe not found.');
            }

            return false;
        }

        function getRecipeById(recipeId) {
            var allRecipes = localStorage.Get(recipeStorageKey);

            if (allRecipes === null || allRecipes.length < 1) {
                console.log('No recipes found');
                return;
            }

            var recipeIndex = func.Array.IndexWhere(allRecipes, function (recipe) {
                return +recipeId === recipe.id;
            });

            return allRecipes[recipeIndex];
        }

        function getAllRecipes() {
            return localStorage.Get(recipeStorageKey);
        }

        function loadRecipes() {
            var recipes = {};
            $http.get('/Content/data/recipes.json')
                .success(function (data) {
                    recipes = data;

                    if (recipes !== null && recipes.length > 0) {
                        //Save initial data to localStorage "cache"
                        localStorage.Put(recipeStorageKey, recipes);
                    }
                })
                .error(function (error) {
                    console.log('Error getting recipes list: ', error);
                });
        }

        ////
        // Initialization (HACK)
        ////
        //loadRecipes();
    }
})();


