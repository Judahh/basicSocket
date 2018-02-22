import * as io from 'socket.io-client';
import { BasicSocket } from './basicSocket';
const IV_LENGTH = 16; // For AES, this is always 16

export class UniqueSocket {
    private static instance: UniqueSocket;
    private basicSocket: BasicSocket;
    private key;
    // private subscribers: Array<any>;

    public static getInstance(): UniqueSocket {
        if (!UniqueSocket.instance) {
            UniqueSocket.instance = new UniqueSocket();
        }
        return UniqueSocket.instance;
    }

    constructor() {
        this.basicSocket = new BasicSocket(io());
        // this.subscribers = new Array<any>();
    }

    public getBasicSocket() {
        return this.basicSocket;
    }
}
