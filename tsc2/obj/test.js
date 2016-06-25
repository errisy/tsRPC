var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Hello = (function () {
    function Hello() {
    }
    Hello.prototype.propertyFunction = function (name) {
        return '';
    };
    Object.defineProperty(Hello.prototype, "value", {
        get: function () {
            return 'nono';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        deco
    ], Hello.prototype, "propertyFunction", null);
    return Hello;
}());
function standaloneFunction(input) {
}
function deco(target, // The prototype of the class
    propertyKey //,  The name of the method
    ) {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}
