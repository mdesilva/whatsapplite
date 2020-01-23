import React from 'react';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import axios from "axios";
import { connect } from 'react-redux';
import uuidv1 from "uuid/v1";

import api from "../api";

class ConversationThread extends React.Component {

    static navigationOptions = () => {
        return {
            title: "Conversation"
        }
    }
    
    renderBubble(props) {
        return <Bubble {...props} /> /* ... is a spread operator, and can be used to pass the entire props object without further typings */
    }

    sendMessage(message) {
        message.user = {
            _id: this.props.userId,
            name: this.props.username
        }
        this.props.updateMessages(message);
        this.props.socket.newMessage(this.props.receiverId, message.text)
    }

    componentDidMount() {
        axios.get(api.getMessages, {
            params: {
                token: this.props.token,
                conversationId: this.props.navigation.state.params.conversationId
            }
        }).then(response => {
            messages = [];
            response.data.messages.map(message => {
                var userName; 
                var userId; 
                if (message.sender == response.data.receiverId) {
                    userName = response.data.receiverName;
                    userId = response.data.receiverId;
                } else {
                    userName = this.props.username; 
                    userId = this.props.userId; 
                }
                messageObj = {
                    _id: message._id,
                    text: message.message,
                    createdAt: message.date,
                    user: {
                        _id: userId,
                        name: userName
                    }
                }
                messages.push(messageObj);
            })
            this.props.updateThread(response.data.receiverId, response.data.receiverName, messages);
        })
        this.props.socket.socket.on("message", data => {
            if (data.sender == this.props.receiverId) {
                messageObj = {
                    _id: uuidv1(),
                    text: data.message,
                    createdAt: Date.now(),
                    user: {
                        _id: this.props.receiverId,
                        name: this.props.receiverName
                    }
                }
                this.props.updateMessages(messageObj);
            }
        })
    }

    componentWillUnmount(){
        //Need to cancel listener
        this.props.socket.socket.off();
    }

    render() {
        return (
        
        <GiftedChat
        messages={this.props.messages}
        alignTop={true}
        inverted={false}
        onSend={message => this.sendMessage(message[0])}
        />
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        messages: state.messages,
        socket: state.socket,
        userId: state.userId,
        username: state.username,
        receiverId: state.currentReceiverId,
        receiverName: state.currentReceiverName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateThread: (receiverId, receiverName, messages) => {
            dispatch({type: 'THREAD_GET_SUCCESS', payload: {receiverId: receiverId, receiverName: receiverName, messages: messages}})
        },
        updateMessages: (message) => {
            dispatch({type: 'UPDATE_MESSAGES', payload: message})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationThread);