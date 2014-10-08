"use strict";

var msi = (function (msi) {
    msi.modal = {};
    msi.modal.base = Modal;
    msi.modal.confirmAndProceed = ConfirmAndProceedModal;

    var _modalId = -1;
    var _eventNamespace = '.__msi_ui_modal_{0}';

    ConfirmAndProceedModal.prototype = Modal.prototype;
    ConfirmAndProceedModal.prototype.constructor = ConfirmAndProceedModal;
    function ConfirmAndProceedModal(options) {
        var self = this;
        Modal.call(self, options);

        _createConfirmAndProceed(self, function(proceed) {
            self.options.callback.call(self, proceed);
            self.hide();
        });
    }

    function Modal(options) {
        var self = this;

        var defaults = {
            parent: $('body'),
            prompt: 'Are you sure?',
            affirmative: 'Yes',
            negative: 'No',
            dimensions: { width: 200, height: 150 },
            useOverlay: true,
            callback: _noop
        };

        self.options = $.extend({}, defaults, options);

        self.id = ++_modalId;
        self.$parent = $(self.options.parent);

        self.init = init;
        self.destroy = destroy;
        self.show = show;
        self.hide = hide;

        init();

        function init() {
            self.$ = _create(self);
            self.$.hide();
            self.$window = self.$.is('.modal-window') ? self.$ : $('.modal-window', self.$);
            _bind(self);
            _attach(self);
            _setPosition(self);
            self.$.show();
        }

        function destroy() {
            self.$.remove();
            _unbind(self);
        }

        function show() {
            self.$.show();
        }

        function hide() {
            self.$.hide();
            destroy();
        }
    }

    function _create(instance) {
        var self = instance;
        var $overlay;

        if(self.options.useOverlay) {
            $overlay = $('<div />')
                .addClass('modal-element')
                .attr('data-modal-id', self.id);
        }
        var $modal = $('<div />')
            .addClass('modal-window');

        return $overlay ? $overlay.append($modal) : $modal;
    }

    function _setPosition(instance) {
        var self = instance;
        var $modal = self.$.is('.modal-window') ? self.$ : $('.modal-window', self.$);
        $modal.css({
            marginTop: -1 * ($modal.outerHeight(true) / 2),
            marginLeft: -1 * ($modal.outerWidth(true) / 2)
        })
    }

    function _bind(instance) {
        var self = instance;
        var namespace = _eventNamespace.replace('{0}', self.id);
        $(document).on('keyup' + namespace, function(e) {
            if(e.which !== 27) {
                return;
            }
            self.hide();
        });
    }

    function _unbind(instance) {
        var self = instance;
        var namespace = _eventNamespace.replace('{0}', self.id);
        $(document).off(namespace);
        //call .off on those button events
        $('*', self.$).off(namespace);
    }

    function _attach(instance) {
        var self = instance;
        if(!self.$parent.is('body')) {
            var parentPosition = getComputedStyle(self.$parent[0]).position;
            if (['relative', 'absolute'].indexOf(parentPosition) === -1) {
                self.$parent.css({
                    position: 'relative'
                });
            }
        }
        self.$parent.append(self.$);
    }

    function _createConfirmAndProceed(instance, callback) {
        var self = instance;

        _addContent(self);
        _addButtons(self, callback);
    }

    function _addContent(instance) {
        var self = instance;

        var $prompt = $('<span />').text(self.options.prompt);

        var $contentContainer = $('<div />')
            .addClass('content-container');

        $contentContainer.append($prompt);

        self.$window.append($contentContainer);
    }

    function _addButtons(instance, callback) {
        var self = instance;
        var namespace = _eventNamespace.replace('{0}', self.id);

        var $deleteButton = $('<button type="button" class="btn-xs btn-primary">' + self.options.affirmative + '</button>');
        $deleteButton.on('click' + namespace, function() {
            callback(true);
        });

        var $cancelButton = $('<button type="button" class="btn-xs btn">' + self.options.negative + '</button>');
        $cancelButton.on('click' + namespace, function() {
            callback(false);
        });

        var $buttonContainer = $('<div />')
            .addClass('button-container');

        $buttonContainer.append($deleteButton, $cancelButton);
        self.$window.append($buttonContainer);
    }

    function _noop() {}

    return msi;
})(window.msi || {});



