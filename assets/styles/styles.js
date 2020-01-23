import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    newMessageContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",    
        height: '100%'
    },
    recipientField: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "blue"
    }
})

export default styles;