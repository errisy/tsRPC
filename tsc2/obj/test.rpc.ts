import {add} from './add.ts';

@rpcService
class Hello {
    @rpcMember public property23Function(name: string, index: number) {
        return '';  ////ss tom job
    }
    @rpcMember 
    get value(): string {
        return 'nono'; 
    }
    @rpcMember
    set globe(value: string) {
        console.log('java');
    } 
    public tom: string;
    static job: string = 'Sos';
    constructor() {

    }
    @rpcMember
    public set blow(value: string) {
    }
}

module slow {
    class joker {
        @rpcMember public propertyFunction(name: string) {
            return '';
        }
        @rpcMember
        get value(): string {
            return 'nono';
        }
        public tom: string;
        static job: string = 'Sos';
        constructor() {

        }
    }
    var jose: number = 0;
}

function rpcMember(
    target: Object, // The prototype of the class
    propertyKey: string//,  The name of the method
    //descriptor: TypedPropertyDescriptor<any>
): void {
    console.log("MethodDecorator called on: ", target, propertyKey);
    //return descriptor;
}
function rpcService(target: Object){

}