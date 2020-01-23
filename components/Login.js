import React from "react";
import { Button, Text, TextInput, View} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';

import api from "../api";

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    // This needs work to be able to be used with non-trivial payloads
    urlEncode(data){
        var urlEncodedString = "";
        Object.keys(data).forEach(function(key){
            urlEncodedString += (key + "=" + encodeURIComponent(data[key]) + "&"); 
        })
        return urlEncodedString.slice(0,-1); //remove the trailing '&'
    }

    async triggerLoginSuccess(token, userId, username = null) {
        if (!username) {
            username = await SecureStore.getItemAsync("whatsapplite-user");
        }
        this.props.loginSuccess(token, userId, username);
        this.props.navigation.navigate("MessageList");
    }
    /*
    * Get token if it is saved, verify it with server, and then login successfully. 
    * If unable to verify with server, request a new token. 
    * If the token does not exist, then user must login on their own
    */
    async componentDidMount(){
        const token = await SecureStore.getItemAsync("whatsapplite-token");
        if (token) {
            const verifyTokenResponse = await axios.post(api.verifyToken, this.urlEncode({token: token}));
            if (verifyTokenResponse.data.status == 200) {
                this.triggerLoginSuccess(token, verifyTokenResponse.data.userId);
            }
            else {
                //Handle invalid tokens. Can request a new token with existing credentials (username and password in keychain), or have the user re-enter their password.
                const savedUsername = await SecureStore.getItemAsync("whatsapplite-user")
                const savedPassword = await SecureStore.getItemAsync("whatsapplite-password")
                this.setState({username: savedUsername, password: savedPassword}); //Warning: Set state operations not guaranteed to take place immediately https://reactjs.org/docs/react-component.html#setstate
                if (this.state.username && this.state.password) {
                    const requestNewTokenResponse = await axios.post(api.login, this.urlEncode(this.state));
                    if (requestNewTokenResponse.data.token) {
                        SecureStore.setItemAsync("whatsapplite-token", requestNewTokenResponse.data.token);
                        this.triggerLoginSuccess(requestNewTokenResponse.data.token, requestNewTokenResponse.data.userId, savedUsername);
                    }
                    else {
                        console.log("Server did not send token. User must login first.")
                    }
                }
            }
        }
        else {
            console.log("Token not found in keychain. User must login first");
        }

    }

    login() {
        axios.post(api.login, this.urlEncode(this.state)).then(response => {
            //Upon successful login, store token, username, and password in keychain and token in the store
            if (response.data.token) {
                SecureStore.setItemAsync("whatsapplite-token", response.data.token);
                SecureStore.setItemAsync("whatsapplite-user", this.state.username);
                SecureStore.setItemAsync("whatsapplite-password", this.state.password);
                this.triggerLoginSuccess(response.data.token, response.data.userId, this.state.username);
            }
        })

    }

    render() {
        //blur event not working
        return (
            <View>
                <Text> Login </Text>
                <TextInput textContentType="username" style={{height:50}} placeholder="Username:" onChangeText={text => this.setState({username: text})}/>
                <TextInput textContentType="password" secureTextEntry={true} placeholder="Password:" onChangeText={text => this.setState({password: text})}/>
                <Button title="Login" onPress={() => this.login()}/>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (token, userId, username) => dispatch({ type: 'LOGIN_SUCCESS', payload: {token: token, userId: userId, username: username}})
    }
} 

export default connect(null, mapDispatchToProps)(Login)
