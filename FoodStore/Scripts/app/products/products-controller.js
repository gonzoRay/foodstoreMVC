"use strict";

(function () {
    angular.module('foodstore')
        .controller('ProductsController',
        [
            '$scope',
            '$http',
            '$location',
            'localStorageService',
            ProductsController
        ]);

    function ProductsController($scope, $http, $location, localStorage) {
        var productStorageKey = 'PRODUCT-STORAGE-KEY';
        initScope();

        function initScope() {
            $scope.newProduct = '';
            $scope.products = localStorage.Get(productStorageKey);
            $scope.redirectAddProducts = function() {
                $location.path('/products/add');
            };


            if ($scope.products === null || $scope.products.length < 1) {

                //Why can't I simply do this?
                //$scope.products = checkCabinet();

                $http.get('/Content/data/products.json')
                    .success(function (data) {
                        $scope.products = data;

                        if($scope.products !== null && $scope.products.length > 0) {
                            //Save initial data to localStorage "cache"
                            localStorage.Put(productStorageKey, $scope.products);
                        }
                    })
                    .error(function (error) {
                        console.log('Error getting product list: ', error);
                    });

                //Save initial data to localStorage "cache"
                localStorage.Put(productStorageKey, $scope.products);
            }
        }

        $scope.addProduct = function () {
            var newProduct = $scope.newProduct.trim();

            //Check for empty
            if (newProduct.length === 0) {
                return;
            }

            //Add new product to our products array
            var lastId = $scope.products[$scope.products.length - 1].id;
            $scope.products.push({
                id: ++lastId,
                productName: newProduct
            });

            //Persist products array
            localStorage.Put(productStorageKey, $scope.products);
            $scope.newProduct = '';
            //$location.path('/products');

        };

        function checkCabinet() {
            var cabinet = [];
            $http.get('/Content/data/products.json')
                .success(function (data) {
                    cabinet = data;
                })
                .error(function (error) {
                    console.log('Error getting product list: ', error);
                });

            return cabinet;
        }
    }
})();



