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
            vm.categories = category.GetAll() || [];
            vm.categoryExists = false;
        }

        ////
        // Controller actions
        ////
        vm.redirectAddCategories = function () {
            $location.path('/categories/add');
        };
        vm.addCategory = function () {
            var newCategory = vm.newCategoryName ? vm.newCategoryName.trim() : '';

            //Check if empty
            if(!newCategory || newCategory.length < 1) {
                console.log('empty category name');
                return;
            }

            vm.categoryExists = category.Exists(newCategory);
            if (vm.categoryExists) {
                console.log(newCategory, ' already exists');
                vm.lastTakenCategoryName = vm.newCategoryName;
                vm.newCategoryName = '';
                //This is not working. Why?
                vm.newCategoryName.$pristine = true;
                return;
            }
            category.Add(newCategory);
            vm.newCategoryName = '';
            vm.categories = category.GetAll();
        };
    }
})();



