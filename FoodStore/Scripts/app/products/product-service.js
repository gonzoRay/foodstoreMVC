"use strict";

(function () {
    angular
        .module('foodstore')
        .factory('ProductService', ProductService);

    ProductService.$inject = [
        '$http',
        'LocalStorageService',
        'FunctionsService'
    ];

    function ProductService($http, localStorage, func) {
        ////
        // Fields
        ////
        var productStorageKey = 'PRODUCT-STORAGE-KEY';
        var existingProductId = -1;

        ////
        // API
        ////
        var _service = {
            //Exposed API methods
            AddProduct: addProduct,
            Exists: doesProductExist,
            RemoveProduct: removeProduct,
            GetAll: getAllProducts,
            LoadFromCabinet: loadProducts

        };
        return _service;

        ////
        // Functions
        ////
        function addProduct(newProduct) {
            var products = getAllProducts();

            //Check for empty
            if (newProduct.length === 0) {
                return;
            }

            //Add new product to our products array
            var lastId = products[products.length - 1].id;
            products.push({
                id: ++lastId,
                productName: newProduct
            });

            //Persist products array
            localStorage.Put(productStorageKey, products);
        }

        function doesProductExist(productName) {
            //Check for existing item w/ same name
            existingProductId = func.Array.IndexWhere(getAllProducts(), function (value) {
                return productName === value.productName;
            });

            if (existingProductId > -1) {
                return true;
            }

            return false;
        }

        function removeProduct(id) {
            console.log('removeProduct not yet implemented');
        }

        function getAllProducts() {
            return localStorage.Get(productStorageKey);
        }

        function loadProducts() {
            var products = {};
            $http.get('/Content/data/products.json')
                .success(function (data) {
                    products = data;

                    if (products !== null && products.length > 0) {
                        //Save initial data to localStorage "cache"
                        localStorage.Put(productStorageKey, products);
                    }
                })
                .error(function (error) {
                    console.log('Error getting product list: ', error);
                });
        }


        ////
        // Initialization (HACK)
        ////
        loadProducts();

    }
})();



