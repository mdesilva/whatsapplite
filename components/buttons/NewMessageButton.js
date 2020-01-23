import React from 'react';
import { Button } from 'react-native';
import { MaterialHeaderButtons, Item } from "./DefaultHeaderButtons";

class NewMessageButton extends React.Component {

    render() {
        return(
            /* 
            In order to use bundled icons, need to add icon fonts to Xcode proj  
            https://github.com/oblador/react-native-vector-icons#bundled-icon-sets 
            <MaterialHeaderButtons>
                <Item title="new" iconName="create"></Item>
            </MaterialHeaderButtons>
            */
           <Button title="New" onPress={() => this.props.navigation.navigate('NewMessage')} />
        )
    }
}

export default NewMessageButton;