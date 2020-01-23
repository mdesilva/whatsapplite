import React from 'react';
import { connect } from "react-redux";

import { Container, Content, List, Text} from 'native-base';

import NewMessageButton from "./buttons/NewMessageButton";
import MessageCard from "./MessageCard";

import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from "../api";

class MessageList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
    }
    static navigationOptions =  ({navigation}) => {
        return {
        title: "Messages",
        headerRight: () => (
            <NewMessageButton navigation={navigation}/>
        )
        }
    }

    updateConversationsList() {
        if (this.props.token) {
            axios.get(api.getConversations, {params: {token: this.props.token}}).then((response,error) => {
                if (error) {
                    console.warn(error);
                }
                else {
                    this.props.updateConversations(response.data);
                }
            })
        }
    }
    
    componentDidMount() {
        //Refreshes conversations on back navigation
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.updateConversationsList();
            }

        )
    }

    
    render() {
        if (this.props.socket != null) {
            var socket = this.props.socket.socket
            socket.on("InvalidToken", () => {
                alert("Invalid token detected. Redirect to login.");
            })
            
        }
        if (this.props.conversations) {
            return(
                <Container>
                    <Content>
                    <List>
                    {
                        this.props.conversations.map((conversation,index) => 
                            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("ConversationThread", {conversationId: conversation._id})}>
                            <MessageCard key={index} conversation={conversation}/>
                            </TouchableOpacity>
                        )
                    }
                    </List>
                    </Content>
                </Container>
            )
        } 
        else {
            return(<Container><Content><Text>none</Text></Content></Container>)
        }
       }
}

const mapDispatchToProps = dispatch => {
    return {
        updateConversations: (conversations) => {
            dispatch({type: "CONVERSATION_GET_SUCCESS", payload: conversations}) 
        }
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authenticated,
        token: state.token,
        socket: state.socket,
        conversations: state.conversations
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);