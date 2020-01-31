import React from 'react';

import { KeyboardAvoidingView, Dimensions, Keyboard} from 'react-native';
import { Form, Item, Input, Icon } from "native-base";

import { connect } from "react-redux";
import api from '../api';
import axios from 'axios';

class NewMessage extends React.Component {
    
    static navigationOptions = {
        title: "New Message",
    };

    state = {
        keyboardOffset: 200,
        receipientUsername: "",
        message: ""
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    _keyboardDidShow = event => { //where does event originate from ? 
        this.setState({keyboardOffset: event.endCoordinates.screenY + 50});
    }

    _keyboardDidHide = event => {
        this.setState({keyboardOffset: 200})
    }

    async sendMessage() {
        try {
            const response = await axios.get(api.getUserId, {
                params: {
                    username: this.state.receipientUsername
                }
            });
            if (response.data.userId) {
                this.props.socket.newMessage(response.data.userId, this.state.message);
                this.props.navigation.navigate("MessageList");
            }
        }
        catch (error) {
            alert("Invalid receipient. Please try again");
        }
    }

    render() {
        var {height, width} = Dimensions.get("screen")
        return(
            <KeyboardAvoidingView>
                <Form>
                    <Item>
                    <Input
                    placeholder="Receipient"
                    returnKeyType="done"
                    onChangeText={(text) => this.setState({receipientUsername: text.toLowerCase()})}
                    />
                    </Item>
                    <Item style={{marginTop: height - this.state.keyboardOffset}}>
                        <Input
                            placeholder="can type"
                            returnKeyType='send'
                            onChangeText={(text) => this.setState({message: text})}
                            onSubmitEditing={() => this.sendMessage()}
                        />
                    </Item>
                </Form>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket
    }
}

export default connect(mapStateToProps)(NewMessage);