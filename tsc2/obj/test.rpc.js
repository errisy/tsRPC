"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Hello = (function () {
    function Hello() {
    }
    Hello.prototype.property23Function = function (name, index) {
        return ''; ////ss tom job
    };
    Object.defineProperty(Hello.prototype, "value", {
        get: function () {
            return 'nono';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hello.prototype, "globe", {
        set: function (value) {
            console.log('java');
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
    Hello.job = 'Sos';
    __decorate([
        rpcMember
    ], Hello.prototype, "property23Function", null);
    __decorate([
        rpcMember
    ], Hello.prototype, "value", null);
    __decorate([
        rpcMember
    ], Hello.prototype, "globe", null);
    __decorate([
        rpcMember
    ], Hello.prototype, "blow", null);
    Hello = __decorate([
        rpcService
    ], Hello);
    return Hello;
}());
var slow;
(function (slow) {
    var joker = (function () {
        function joker() {
        }
        joker.prototype.propertyFunction = function (name) {
            return '';
        };
        Object.defineProperty(joker.prototype, "value", {
            get: function () {
                return 'nono';
            },
            enumerable: true,
            configurable: true
        });
        joker.job = 'Sos';
        __decorate([
            rpcMember
        ], joker.prototype, "propertyFunction", null);
        __decorate([
            rpcMember
        ], joker.prototype, "value", null);
        return joker;
    }());
    var jose = 0;
})(slow || (slow = {}));
function rpcMember(target, // The prototype of the class
    propertyKey //,  The name of the method
    ) {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}
function rpcService(target) {
}
