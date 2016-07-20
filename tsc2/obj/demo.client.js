"use strict";
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var rpc_1 = require('./rpc');
var Demo = (function () {
    function Demo() {
    }
    Demo.prototype.test = function () {
        return this.http.post('/obj/demo.rpc.ts', {}).map(rpc_1.Converter.convertJsonResponse);
    };
    Demo.prototype.tom = function () {
        return this.http.post('/obj/demo.rpc.ts', {}).map(rpc_1.Converter.convertJsonResponse);
    };
    return Demo;
}());
exports.Demo = Demo;
