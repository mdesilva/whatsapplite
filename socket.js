import io from './socket.io';
const apiBaseUrl = "34.238.245.189";

class Socket {
    socket = null;

    constructor(token){
        this.socket = io(`http://${apiBaseUrl}:3050`);
        this.user = token;
        this.socket.emit('newConnection', {token: token});
    }

    newMessage(receipient, message){
        console.log("emit");
        this.socket.emit('newMessage', {senderToken: this.user, receiverId: receipient, message: message});
    }


}
export default Socket;