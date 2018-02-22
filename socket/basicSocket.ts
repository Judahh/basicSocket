import * as  uuidv4 from 'uuid/v4';
import * as  crypto from 'crypto';
const IV_LENGTH = 16; // For AES, this is always 16

export class BasicSocket {
    protected identification: any;
    protected socket: any;
    private key;
    // private subscribers: Array<any>;

    public static generateKey(size: number) {
        return crypto.randomBytes(size);
    }

    constructor(socket) {
        this.socket = socket;
        // this.subscribers = new Array<any>();
    }

    public getIdentification() {
        return this.identification;
    }

    public setIdentification(identification) {
        this.identification = identification;
    }

    public setSocket(socket) {
        this.socket = socket;
    }

    public setKey(key) {
        this.key = key;
        // this.publish('key');
    }

    public encrypt(object: Object) {
        // console.log("encrypt");
        let objectText: string = JSON.stringify(object);
        let objectBuffer: Buffer = new Buffer(objectText);
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(this.key), iv);
        let encrypted = cipher.update(objectBuffer);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    public decrypt(objectText: string) {
        // console.log("decrypt");
        let textParts = objectText.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(this.key), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        let object: Object = JSON.parse(decrypted.toString());
        return object;
    }

    public emit(messageName, message) {
        let _self = this;
        if (_self.key === undefined || messageName === 'disconnect') {
            _self.socket.emit(messageName, message);
        } else {
            _self.socket.emit(messageName, _self.encrypt(message));
        }
    }

    public on(messageName, callback) {
        let _self = this;
        this.socket.on(messageName, (message) => {
            if (!this.isFunction(message.split)) {
                _self.key = undefined;
            }
            if (_self.key === undefined || messageName === 'disconnect') {
                callback(message);
            } else {
                callback(_self.decrypt(message));
            }
        });
    }

    public isFunction(functionToCheck) { // temp
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}
