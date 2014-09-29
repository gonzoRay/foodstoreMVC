"use strict";
(function () {
    angular.module('foodstore', ['ngRoute', 'ngResource', 'recipeControllers'])
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5mode = true;
            $routeProvider
                .when('/', {
                    templateUrl: '/Content/templates/index.html'
                })
                .when('/products', {
                    templateUrl: '/Content/templates/products/products.html',
                    controller: 'ProductsController'
                })
                .when('/categories', {
                    templateUrl: '/Content/templates/categories/categories.html',
                    controller: 'CategoriesController'
                })
                .when('/recipes', {
                    templateUrl: '/Content/templates/recipes/recipes.html',
                    controller: 'RecipeListController'
                })
                .when('/products/add', {
                    templateUrl: '/Content/templates/products/addproduct.html',
                    controller: 'ProductsController'
                })
                .when('/categories/add', {
                    templateUrl: '/Content/templates/categories/addcategory.html',
                    controller: 'CategoriesController'
                })
                .when('/recipes/add', {
                    templateUrl: '/Content/templates/recipes/addrecipe.html',
                    controller: 'RecipeListController'
                })
                .when('/resetdata', {
                    templateUrl: 'Content/templates/admin/resetdata.html',
                    controller: 'AdminController'
                })
                .when('/recipes/:id', {
                    templateUrl: 'Content/templates/recipes/viewrecipe.html',
                    controller: 'RecipeDetailController'
                })
                .otherwise({ redirectTo: '/' });
        });
})();