"use strict";
var Hello = (function () {
    function Hello() {
    }
    Hello.prototype.property23Function = function (name, index) {
    };
    Object.defineProperty(Hello.prototype, "value", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hello.prototype, "globe", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hello.prototype, "blow", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return Hello;
}());
exports.Hello = Hello;
var slow;
(function (slow) {
    var joker = (function () {
        function joker() {
        }
        joker.prototype.propertyFunction = function (name) {
        };
        Object.defineProperty(joker.prototype, "value", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        return joker;
    }());
    slow.joker = joker;
})(slow = exports.slow || (exports.slow = {}));
