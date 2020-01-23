import React from "react";
import { Button, Text, TextInput, View} from "react-native";
import { connect } from "react-redux";


//Example component demonstrating to manipulate data within the store

class Counter extends React.Component {

    render() {
        return (
            <View>
                <Text> Count: {this.props.count} </Text>
                <Button onPress={this.props.increment} title="Increment"> </Button>
                <Button onPress={this.props.decrement} title="Decrement"> </Button>
                <Button onPress={() => this.props.setCount(22)} title="Set"></Button>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        setCount: (value) => dispatch({ type: 'SET', payload: value})
    }
}

//as the function name states, this function maps state to props
function mapStateToProps(state){
    return {
        count: state.count
    }
};

//connect is a higher order function that returns a function when you call it, and calling that function returns a wrapped component
export default connect(mapStateToProps, mapDispatchToProps)(Counter)