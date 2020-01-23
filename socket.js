import io from './socket.io';
const apiBaseUrl = "155.41.125.220";

class Socket {
    socket = null;

    constructor(token){
        this.socket = io(`http://${apiBaseUrl}:3010`);
        this.user = token;
        this.socket.emit('newConnection', {token: token});
    }

    newMessage(receipient, message){
        this.socket.emit('newMessage', {senderToken: this.user, receiverId: receipient, message: message});
    }


}
export default Socket;