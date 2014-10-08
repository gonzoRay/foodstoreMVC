"use strict";
(function () {
    angular
        .module('foodstore', [
            'ngRoute',
            'ngResource',
            'foodstore.ui'
        ])
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5mode = true;
            $routeProvider
                .when('/', {
                    templateUrl: '/Content/templates/index.html'
                })
                .when('/products', {
                    templateUrl: '/Content/templates/products/products.html',
                    controller: 'Product',
                    controllerAs: 'vm'
                })
                .when('/categories', {
                    templateUrl: '/Content/templates/categories/categories.html',
                    controller: 'Category',
                    controllerAs: 'vm'
                })
                .when('/recipes', {
                    templateUrl: '/Content/templates/recipes/recipes.html',
                    controller: 'RecipeList',
                    controllerAs: 'vm'
                })
                .when('/products/add', {
                    templateUrl: '/Content/templates/products/addproduct.html',
                    controller: 'Product',
                    controllerAs: 'vm'
                })
                .when('/categories/add', {
                    templateUrl: '/Content/templates/categories/addcategory.html',
                    controller: 'Category',
                    controllerAs: 'vm'
                })
                .when('/recipes/add', {
                    templateUrl: '/Content/templates/recipes/addrecipe.html',
                    controller: 'RecipeList',
                    controllerAs: 'vm'
                })
                .when('/cleardata', {
                    templateUrl: 'Content/templates/admin/cleardata.html',
                    controller: 'ClearData',
                    controllerAs: 'vm'
                })
                .when('/loaddata', {
                    templateUrl: 'Content/templates/admin/loaddata.html',
                    controller: 'LoadData',
                    controllerAs: 'vm'
                })
                .when('/recipes/:id', {
                    templateUrl: 'Content/templates/recipes/viewrecipe.html',
                    controller: 'RecipeDetail',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });
        });
})();