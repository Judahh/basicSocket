import * as io from 'socket.io-client';
import { BasicSocket } from './basicSocket';
import { Journaly } from 'journaly';
const IV_LENGTH = 16; // For AES, this is always 16

export class Socket {
    private basicSocket: BasicSocket;
    private key;
    private journaly: Journaly;

    constructor(socket?) {
        let _self = this;
        if(socket)
            _self.basicSocket = new BasicSocket(socket);
        else
            _self.basicSocket = new BasicSocket(io());
        _self.journaly = new Journaly(true);
        
        _self.basicSocket.on('regularMessage', (data) => {
            _self.publish(data.subscribers, data.data);
        });
    }

    public getBasicSocket() {
        return this.basicSocket;
    }

    public subscribe(subscribers, callback) {
        this.journaly.subscribe(subscribers,callback);
    }

    public unsubscribe(subscribers, callback) {
        this.journaly.unsubscribe(subscribers, callback);
    }

    public emit(subscribers, data){
        this.basicSocket.emit('regularMessage', {subscribers, data})
    }

    private publish(subscribers, data) {
        this.journaly.publish(subscribers, data);
    }
}
