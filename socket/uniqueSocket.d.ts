import { Socket } from './socket';
export declare class UniqueSocket extends Socket {
    private static instance;
    static getInstance(socket?: any): UniqueSocket;
    constructor(socket?: any);
}
