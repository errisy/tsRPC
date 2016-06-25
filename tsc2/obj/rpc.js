"use strict";
function rpcMember(target, // The prototype of the class
    propertyKey //,  The name of the method
    ) {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}
exports.rpcMember = rpcMember;
function rpcService(target) {
}
exports.rpcService = rpcService;
