import { Socket } from './socket';

export class UniqueSocket extends Socket{
    private static instance: UniqueSocket;

    public static getInstance(): UniqueSocket {
        if (!UniqueSocket.instance) {
            UniqueSocket.instance = new UniqueSocket();
        }
        return UniqueSocket.instance;
    }

    constructor() {
        super();
    }
}
