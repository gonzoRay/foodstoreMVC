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
            vm.products = product.GetAll() || product.LoadFromCabinet() || [];
            vm.productExists = false;
            vm.redirectAddProducts = function () {
                $location.path('/products/add');
            };

            vm.addProduct = function () {
                var newProduct = vm.newProductName.trim();
                vm.productExists = product.Exists(newProduct);
                if (vm.productExists) {
                    console.log(newProduct, 'already exists');
                    vm.lastTakenProductName = newProduct;
                    vm.newProductName = '';
                    return;
                }
                product.AddProduct(newProduct);
                vm.newProductName = '';
                vm.products = product.GetAll();
            };
        }
    }
})();



