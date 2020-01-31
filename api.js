const serverAddr = "http://34.238.245.189";
const port = "3000";

const url = serverAddr + ":" + port + "/";

export default api = {
    login: url + "login",
    verifyToken: url + "verifyToken",
    getConversations: url + "api/conversations/",
    getMessages: url + "api/messages/get/",
    getUsername: url + "api/getUsername",
    getUserId: url + "api/getUserId"
}