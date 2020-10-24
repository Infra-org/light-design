"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var default_styles = "\n      left: '';\n      top: '';\n      opacity: 0.8;\n      transform: translate(-50%, -50%);\n";
Component({
    properties: {
        color: {
            type: String,
            value: 'rgba(0, 0, 0, 0.2)'
        },
        radius: {
            type: Number,
            value: 8
        }
    },
    data: {
        visible: false,
        styles: ''
    },
    methods: {
        getRect: function () {
            var _that = this;
            return new Promise(function (resolve) {
                _that
                    .createSelectorQuery()
                    .select('#ripple')
                    .boundingClientRect(function (_a) {
                    var width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                    resolve({ width: width, height: height, left: left, top: top });
                })
                    .exec();
            });
        },
        trigger: function (e) {
            var _this = this;
            var _that = this;
            if (_that.data.visible)
                return;
            if (!e.detail.x || !e.detail.y)
                return;
            if (!e || typeof e !== 'object')
                return;
            if (!e.currentTarget.offsetLeft || !e.currentTarget.offsetTop)
                return;
            _that.setData({ visible: true }, function () {
                _this.setStyle(e);
            });
        },
        setStyle: function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _that, _a, left, top, _b, width, height, offset_x, offset_y, limit_x, limit_y, limit, scale, duration_ratio, duration_time, styles, timer_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _that = this;
                            _a = e.currentTarget, left = _a.offsetLeft, top = _a.offsetTop;
                            return [4, _that.getRect()];
                        case 1:
                            _b = _c.sent(), width = _b.width, height = _b.height;
                            offset_x = e.detail.x - left;
                            offset_y = e.detail.y - top;
                            limit_x = Math.max(offset_x, width - offset_x);
                            limit_y = Math.max(offset_y, height - offset_y);
                            limit = Math.max(limit_x, limit_y);
                            scale = limit / 6;
                            duration_ratio = Math.floor(Math.max(width, height) / 81);
                            duration_time = 0.3 + duration_ratio * 0.1;
                            styles = "\n\t\t\t\tleft: " + offset_x + "px;\n\t\t\t\ttop: " + offset_y + "px;\n                        opacity: 0.25;\n                        transition-duration: " + (e.type === 'longpress'
                                ? duration_time * 3
                                : duration_time) + "s;\n                        transform: translate(-50%, -50%) scale(" + scale + ");\n\t\t\t";
                            _that.setData({ styles: styles });
                            if (e.type === 'tap') {
                                timer_1 = setTimeout(function () {
                                    _that.reset();
                                    clearTimeout(timer_1);
                                }, duration_time * 1000);
                            }
                            return [2];
                    }
                });
            });
        },
        reset: function () {
            this.setData({
                styles: default_styles,
                visible: false
            });
        }
    }
});
