"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('ClearData', ClearData);

    ClearData.$inject = [
        '$scope',
        'LocalStorageService',
        'ModalsService'
    ];

    function ClearData($scope, localStorage, modals) {
        var vm = this;
        init();

        function init() {
            vm.clearCompleted = false;
            vm.cacheItems = [
                { name: 'Product', key: 'PRODUCT-STORAGE-KEY', checked: false },
                { name: 'Category', key: 'CATEGORY-STORAGE-KEY', checked: false },
                { name: 'Recipe', key: 'RECIPE-STORAGE-KEY', checked: false }
            ];
        }

        ////
        // Controller actions
        ////
        vm.clearData = function () {
            var modalOptions = {
                prompt: 'Are you sure you wish to clear these cache items?',
                useOverlay: true,
                callback: function (proceed) {
                    if (proceed) {
                        for (var i = 0; i < vm.cacheItems.length; i++) {
                            if (vm.cacheItems[i].checked) {
                                localStorage.Empty(vm.cacheItems[i].key);
                            }
                        }

                        vm.clearCompleted = true;
                        $scope.$apply();
                    }
                }
            };

            modals.ShowConfirm(modalOptions);
        };
    }
})();


