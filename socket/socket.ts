import * as io from 'socket.io-client';
import { BasicSocket } from './basicSocket';
const IV_LENGTH = 16; // For AES, this is always 16

export class Socket {
    private basicSocket: BasicSocket;
    private key;
    private subscribers: any;
    private subscribersOldData: any;

    constructor(socket?) {
        let _self = this;
        if(socket)
            _self.basicSocket = new BasicSocket(socket);
        else
            _self.basicSocket = new BasicSocket(io());
        _self.subscribers = {};
        _self.subscribersOldData = {};
        
        _self.basicSocket.on('regularMessage', (data) => {
            _self.publish(data.subscribers, data.data);
        });
    }

    public getBasicSocket() {
        return this.basicSocket;
    }

    public subscribe(subscribers, callback) {
        this.checkSubscribers(subscribers);
        this.subscribers[subscribers].push(callback);
        this.subscribersOldData[subscribers].forEach((data) => {
            callback(data);
        });
        console.log(callback.name, 'has been subscribed to', subscribers);
    }

    public unsubscribe(subscribers, callback) {
        this.checkSubscribers(subscribers);
        this.subscribers[subscribers] = this.subscribers[subscribers].filter((element) => {
            return element !== callback;
        });
    }

    public emit(subscribers, data){
        this.basicSocket.emit('regularMessage', {subscribers, data})
    }

    private publish(subscribers, data) {
        this.checkSubscribers(subscribers);
        this.subscribers[subscribers].forEach((subscriber) => {
            subscriber(data);
        });
        this.subscribersOldData[subscribers].push(data);
    }

    private checkSubscribers(subscribers) {
        if (this.subscribers[subscribers] === undefined) {
            this.subscribers[subscribers] = new Array<any>();
            this.subscribersOldData[subscribers] = new Array<any>();
        }
    }
}
