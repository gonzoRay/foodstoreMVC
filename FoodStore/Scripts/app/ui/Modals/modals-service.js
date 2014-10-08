"use strict";
(function () {
    angular.module('foodstore.ui', [])
        .factory('ModalsService', ModalsService);

    ModalsService.$inject = [];

    function ModalsService() {
        ////
        // Fields
        ////
        var _modalId = -1;

        ////
        // API
        ////
        var _service = {
            ShowModal: showModal,
            ShowConfirm: showConfirm
            /*BlockPage: blockPage, //Default behavior
            BlockElement: blockElement,
            Unblock: unblock,
            UnblockAll: unblockAll*/
        };
        return _service;

        ////
        // Functions
        ////
        function showModal(options) {
            var modal = new msi.modal(options);
            modal.show();
        }
        function showConfirm(options) {
            var modal = new msi.modal.confirmAndProceed(options);
            modal.show();
        }

        function blockPage() {
            console.log('blockPage');
        }

        function blockElement(selector, element) {
            //blocks only specified element OR selector
            //if selector.leng() > 1 make empty objects (hashtable?) using ++i
            //first use each to apply block to all elements
            //if using element, and parents don't use any positioning, must set relative positioning on modal.
        }

        function unblock(selector) {

        }

        function unblockAll() {
            //unblock all registered blocking elements matching id^='modalBlock'

            //Using angular.forEach()
            angular.forEach(angular.element("[class=modal-element]"), function(el) {
                el.remove();
            });

        }
    }

})();
