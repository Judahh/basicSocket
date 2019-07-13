import { Socket } from './socket';

export class UniqueSocket extends Socket{
    private static instance: UniqueSocket;

    public static getInstance(socket?): UniqueSocket {
        if (!UniqueSocket.instance) {
            UniqueSocket.instance = new UniqueSocket(socket);
        }
        return UniqueSocket.instance;
    }

    constructor(socket?) {
        super(socket);
    }
}
