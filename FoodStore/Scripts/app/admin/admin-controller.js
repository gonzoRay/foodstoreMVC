"use strict";

(function () {
    angular
        .module('foodstore')
        .controller('Admin', Admin);

    Admin.$inject = [
        '$scope',
        'LocalStorageService',
        'ModalsService'
    ];

    function Admin($scope, localStorage, modals) {
        var vm = this;
        init();

        function init() {
            vm.resetCompleted = false;
            vm.cacheItems = [
                { name: 'Product', key: 'PRODUCT-STORAGE-KEY', checked: false },
                { name: 'Category', key: 'CATEGORY-STORAGE-KEY', checked: false },
                { name: 'Recipe', key: 'RECIPE-STORAGE-KEY', checked: false }
            ];
        }

        vm.resetData = function () {
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

                        vm.resetCompleted = true;
                        $scope.$apply();
                    }
                }
            };

            modals.ShowConfirm(modalOptions);
        };
    }
})();


