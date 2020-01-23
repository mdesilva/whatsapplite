import Socket from "../socket";

const initialState = {
    token: "",
    userId: null,
    username: null,
    authenticated: false,
    socket: null,
    conversations: [],
    messages: [],
    currentReceiverId: "",
    currentReceiverName: ""
  };
  
function rootReducer(state=initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                token: action.payload.token,
                authenticated: true,
                socket: new Socket(action.payload.token),
                userId: action.payload.userId,
                username: action.payload.username
            }
        case 'CONVERSATION_GET_SUCCESS':
            return {
                conversations: action.payload,
                token: state.token,
                authenticated: state.authenticated,
                socket: state.socket,
                messages: state.messages,
                userId: state.userId,
                username: state.username
            }
        case 'THREAD_GET_SUCCESS': 
            return {
                conversations: state.conversations,
                token: state.token,
                authenticated: state.authenticated,
                socket: state.socket,
                userId: state.userId,
                username: state.username,
                messages: action.payload.messages,
                currentReceiverId: action.payload.receiverId,
                currentReceiverName: action.payload.receiverName

            }
        case 'UPDATE_MESSAGES':
            const updatedMessages = [...state.messages, action.payload]; //Create a new messages object with the updated message
            return {
                conversations: state.conversations,
                token: state.token,
                authenticated: state.authenticated,
                socket: state.socket,
                userId: state.userId,
                username: state.username,
                messages: updatedMessages,
                currentReceiverId: state.currentReceiverId,
                currentReceiverName: state.currentReceiverName,
            }
        default:
            return state;
    }
};
  
export default rootReducer;