import {Dog} from "../app/dog.ts";
import {rpcService, rpcMember} from './rpc.ts';

@rpcService
export class Demo {
    public Dogs(hello:string): Dog[] {
        let list: Dog[] = [];
        {
            let c: number = 20;
            let d = new Dog(); 
            d.Name = 'labrador';
            list.push(d);
        }
        {
            let d = new Dog();
            d.Name = 'golden retriever';
            list.push(d);
            let c = '2243344';
        }
        return list;
    }
    @rpcMember
    public test(): string {
        return 'hello';
    }
    @rpcMember
    public tom(): Dog {
        return new Dog();
    }
}