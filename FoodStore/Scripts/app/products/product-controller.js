"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('Product', Product);

    Product.$inject = [
        '$location',
        'ProductService'
    ];

    function Product($location, product) {
        var vm = this;

        init();

        function init() {
            vm.newCategoryName = '';
            vm.products = product.GetAll() || [];
            vm.productExists = false;
        }

        ////
        // Controller actions
        ////
        vm.redirectAddProducts = function () {
            $location.path('/products/add');
        };

        vm.addProduct = function () {
            var newProduct = vm.newProductName ? vm.newProductName.trim() : '';

            //Check if empty
            if(!newProduct || newProduct.length < 1) {
                console.log('empty product name');
                return;
            }

            vm.productExists = product.Exists(newProduct);
            if (vm.productExists) {
                console.log(newProduct, 'already exists');
                vm.lastTakenProductName = newProduct;
                vm.newProductName = '';
                return;
            }
            product.Add(newProduct);
            vm.newProductName = '';
            vm.products = product.GetAll();
        };
    }
})();



