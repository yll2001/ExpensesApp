import { View, StyleSheet, Text } from "react-native"
import Button from './Button'
import { GlobalStyles } from "../../constants/style"

function ErrorOverlay({ message }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.ttitle]}>An error accured!</Text>
            <Text style={styles.text}>{message}</Text>

        </View>
    )

}

export default ErrorOverlay


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary700

    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    ttitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    message: {
        fontSize: 14
    }

})