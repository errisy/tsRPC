"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dog_ts_1 = require("../app/dog.ts");
var rpc_ts_1 = require('./rpc.ts');
var Demo = (function () {
    function Demo() {
    }
    Demo.prototype.Dogs = function () {
        var list = [];
        {
            var c = 20;
            var d = new dog_ts_1.Dog();
            d.Name = 'labrador';
            list.push(d);
        }
        {
            var d = new dog_ts_1.Dog();
            d.Name = 'golden retriever';
            list.push(d);
            var c = '2243344';
        }
        return list;
    };
    Demo.prototype.test = function () {
        return 'hello';
    };
    Demo.prototype.tom = function () {
        return new dog_ts_1.Dog();
    };
    __decorate([
        rpc_ts_1.rpcMember
    ], Demo.prototype, "test", null);
    __decorate([
        rpc_ts_1.rpcMember
    ], Demo.prototype, "tom", null);
    Demo = __decorate([
        rpc_ts_1.rpcService
    ], Demo);
    return Demo;
}());
exports.Demo = Demo;
