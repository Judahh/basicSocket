/// <reference types="node" />
export declare class BasicSocket {
    protected identification: any;
    protected socket: any;
    private key;
    static generateKey(size: number): Buffer;
    constructor(socket: any);
    getIdentification(): any;
    setIdentification(identification: any): void;
    setSocket(socket: any): void;
    setKey(key: any): void;
    encrypt(object: Object): string;
    decrypt(objectText: string): Object;
    emit(messageName: any, message: any): void;
    on(messageName: any, callback: any): void;
    isFunction(functionToCheck: any): boolean;
}
