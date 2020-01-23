import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

const MaterialHeaderButton = () => {
    <HeaderButton IconComponent={MaterialIcons} iconSize={22} color="black"/>
}

export const MaterialHeaderButtons = () => {
    return (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}/>
    )
}

export { Item } from "react-navigation-header-buttons";