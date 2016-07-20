"use strict";
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var rpc_1 = require('./rpc');
var Hello = (function () {
    function Hello() {
    }
    Hello.prototype.property23Function = function (name, index) {
        return this.http.post('/obj/test.rpc.ts', {}, { name: name }, { name: name }, { index: index }, { index: index });
    };
    return Hello;
}());
exports.Hello = Hello;
get;
value();
Observable_1.Observable < string > {
    return: this.http.post('/obj/test.rpc.ts', {}).map(rpc_1.Converter.convertJsonResponse)
};
set;
globe(value, string);
{
}
set;
blow(value, string);
{
}
var slow;
(function (slow) {
    var joker = (function () {
        function joker() {
        }
        joker.prototype.propertyFunction = function (name) {
            return this.http.post('/obj/test.rpc.ts', {}, { name: name }, { name: name });
        };
        return joker;
    }());
    slow.joker = joker;
    get;
    value();
    Observable_1.Observable < string > {
        return: this.http.post('/obj/test.rpc.ts', {}).map(rpc_1.Converter.convertJsonResponse)
    };
})(slow = exports.slow || (exports.slow = {}));
