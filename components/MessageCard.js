import React from 'react';
import {ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';

import api from "../api";


class MessageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastMessageSentTime: null,
             otherParticipantUsername: null
        }
    }

    async getOtherParticipantName(userId) {
        const getUsernameResponse = await axios.get(api.getUsername, {
            params: {
                userId: userId
            }
        });
        if (getUsernameResponse.data.username) {
            return getUsernameResponse.data.username;
        } else {
            return userId; //fallback to user id if username not found 
        }

    }

    determineOtherParticipant(conversation) {
        if (conversation.sender == this.props.userId) {
            return conversation.receiver;
        } else {
            return conversation.sender;
        }
    }

    async componentDidMount() {
        const conversation = this.props.conversation;
        const lastMessageDate = new Date(conversation.lastMessageDate);
        const otherParticipant = await this.determineOtherParticipant(conversation);
        this.setState({lastMessageSentTime: lastMessageDate.getHours() + ":" + lastMessageDate.getMinutes()});
        this.setState({otherParticipantUsername: await this.getOtherParticipantName(otherParticipant)})
    }

    render() {
        const conversation = this.props.conversation;
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail source={require("../assets/images/avatar.png")} small={true}/>
                </Left>
                <Body>
                    <Text> {this.state.otherParticipantUsername} </Text>
                    <Text note> {conversation.lastMessage}</Text>
                </Body>
                <Right>
                   <Text note> 
                    {this.state.lastMessageSentTime}
                    </Text>
                </Right>
            </ListItem>
        )
    }
}


function mapStateToProps(state) {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(MessageCard);