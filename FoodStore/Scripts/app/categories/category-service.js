"use strict";

(function () {
    angular
        .module('foodstore')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = [
        '$http',
        'LocalStorageService',
        'FunctionsService'
    ];

    function CategoryService($http, localStorage, func) {
        ////
        // Fields
        ////
        var categoryStorageKey = 'CATEGORY-STORAGE-KEY';
        var existingCategoryId = -1;

        ////
        // API
        ////
        var _service = {
            //Exposed API methods
            AddCategory: addCategory,
            Exists: doesCategoryExist,
            RemoveCategory: removeCategory,
            GetAll: getAllCategories,
            LoadFromCabinet: loadCategories
        };
        return _service;

        ////
        // Functions
        ////
        function addCategory(newCategory) {
            var categories = getAllCategories();

            //Check for empty
            if (newCategory.length === 0) {
                return;
            }

            //Add new category to our categories array
            var lastId = categories[categories.length - 1].id;
            categories.push({
                id: ++lastId,
                categoryName: newCategory
            });

            //Persist categories array
            localStorage.Put(categoryStorageKey, categories);
        }

        function doesCategoryExist(categoryName) {
            //Check for existing item w/ same name
            existingCategoryId = func.Array.IndexWhere(getAllCategories(), function (value) {
                return categoryName === value.categoryName;
            });

            if (existingCategoryId > -1) {
                return true;
            }

            return false;
        }

        function removeCategory(id) {
            console.log('removeCategory not yet implemented');
        }

        function getAllCategories() {
            return localStorage.Get(categoryStorageKey);
        }

        function loadCategories() {
            var categories = {};
            $http.get('/Content/data/categories.json')
                .success(function (data) {
                    categories = data;

                    if (categories !== null && categories.length > 0) {
                        //Save initial data to localStorage "cache"
                        localStorage.Put(categoryStorageKey, categories);
                    }
                })
                .error(function (error) {
                    console.log('Error getting category list: ', error);
                });
        }

        ////
        // Initialization (HACK)
        ////
        loadCategories();

    }
})();




