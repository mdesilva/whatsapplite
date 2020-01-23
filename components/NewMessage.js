import React from 'react';

import { KeyboardAvoidingView, Dimensions, Keyboard} from 'react-native';
import { Form, Item, Input, Icon } from "native-base";

import { connect } from "react-redux";

class NewMessage extends React.Component {
    
    static navigationOptions = {
        title: "New Message",
    };

    state = {
        keyboardOffset: 200,
        receipient: "emslade23@bu.edu",
        message: "test"
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

    sendMessage(){
        //send the message, and then return to messages list. Eventually, go right to the conversation page with the receipient
        //receipient must be lowercased
        this.props.socket.startNewConversation(this.state.receipient, this.state.message);
        this.props.navigation.navigate("MessageList");
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
                    onChangeText={(text) => this.setState({receipient: text.toLowerCase()})}
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