const serverAddr = "http://155.41.125.220";
const port = "3000";

const url = serverAddr + ":" + port + "/";

export default api = {
    login: url + "login",
    verifyToken: url + "verifyToken",
    getConversations: url + "api/conversations/",
    getMessages: url + "api/messages/get/",
    getUsername: url + "api/getUsername"
}