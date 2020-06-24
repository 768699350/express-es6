"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    extend: function extend(target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) flag ? target[key] = source[key] : target[key] === void 0 && (target[key] = source[key]);
        }
        return target;
    }
};