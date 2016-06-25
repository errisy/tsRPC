


class Hello {
    @deco public propertyFunction(name:string) {
        return '';
    }
    get value(): string {
        return 'nono';
    }
}

function standaloneFunction(input: string) {

}


function deco(
    target: Object, // The prototype of the class
    propertyKey: string//,  The name of the method
    //descriptor: TypedPropertyDescriptor<any>
): void {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}