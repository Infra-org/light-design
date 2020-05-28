"use strict";
Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        list: {
            type: Array,
            value: []
        },
        scroll: {
            type: Boolean,
            value: false
        },
        vertical: {
            type: Boolean,
            value: false
        },
        column: {
            type: Number,
            value: 3
        },
        zIndex: {
            type: Number,
            value: 100
        }
    },
    data: {
        _visible_dialog_wrap: false,
        _visible_dialog: false,
        _visible_mask: false
    },
    observers: {
        visible: function (new_val) {
            var _that = this;
            if (new_val) {
                _that.setData({ _visible_dialog_wrap: true });
                setTimeout(function () {
                    _that.setData({
                        _visible_dialog: true,
                        _visible_mask: true
                    });
                }, 30);
            }
            else {
                _that.setData({
                    _visible_dialog: false,
                    _visible_mask: false
                });
                setTimeout(function () {
                    _that.setData({ _visible_dialog_wrap: false });
                }, 300);
            }
        },
        vertical: function (new_val) {
            var _that = this;
            if (new_val) {
                _that.setData({ column: 1 });
            }
        }
    },
    methods: {
        catchtouchmove: function () { },
        onActionItem: function (e) {
            var _that = this;
            var index = e.mark.index;
            if (!index)
                return;
            _that.setData({ visible: false });
            _that.triggerEvent('onOption', { index: index });
        },
        onShow: function () {
            var _that = this;
            _that.setData({ visible: true });
            _that.triggerEvent('onShow');
        },
        onClose: function () {
            var _that = this;
            _that.setData({ visible: false });
            _that.triggerEvent('onClose');
        }
    }
});
