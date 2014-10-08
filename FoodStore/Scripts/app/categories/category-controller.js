"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('Category', Category);

    Category.$inject = [
        '$location',
        'CategoryService'
    ];

    function Category($location, category) {
        var vm = this;

        init();

        function init() {
            vm.newCategoryName = '';
            vm.categories = category.GetAll() || category.LoadFromCabinet() || [];
            vm.categoryExists = false;
            vm.redirectAddCategories = function () {
                $location.path('/categories/add');
            };
            vm.addCategory = function () {
                var newCategory = vm.newCategoryName.trim();
                vm.categoryExists = category.Exists(newCategory);
                if (vm.categoryExists) {
                    console.log(newCategory, ' already exists');
                    vm.lastTakenCategoryName = vm.newCategoryName;
                    vm.newCategoryName = '';
                    return;
                }
                category.AddCategory(newCategory);
                vm.newCategoryName = '';
                vm.categories = category.GetAll();
            };
        }
    }
})();



