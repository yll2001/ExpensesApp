import { View } from "react-native";
import { Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Input({ invalid, label, textInputConfig, style }) {
    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);

    }
    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )

}
export default Input;//object for props that we dont write all of them

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,



    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4

    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700

    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },



    invalidLabel: {

        color: GlobalStyles.colors.error500


    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }

})