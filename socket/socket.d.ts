import { BasicSocket } from './basicSocket';
export declare class Socket {
    private basicSocket;
    private key;
    private journaly;
    constructor(socket?: any);
    getBasicSocket(): BasicSocket;
    subscribe(subscribers: any, callback: any): void;
    unsubscribe(subscribers: any, callback: any): void;
    emit(subscribers: any, data: any): void;
    private publish;
}
