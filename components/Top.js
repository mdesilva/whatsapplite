import React from 'react';
import styles from '../assets/styles/styles';
import {Text, View } from 'react-native';

class Top extends React.Component {
    render() {
        return(
        <View style={styles.top}>
            <Text> Status </Text>
        </View>
        );
    }
}

export default Top;