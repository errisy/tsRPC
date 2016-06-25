export function rpcMember(
    target: Object, // The prototype of the class
    propertyKey: string//,  The name of the method
    //descriptor: TypedPropertyDescriptor<any>
): void {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}
export function rpcService(target: Object) {

}