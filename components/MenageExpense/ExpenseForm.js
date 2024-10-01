import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react";
import { GlobalStyles } from "../../constants/style";
function ExpenseForm({ onCancel, onSubmit, submitButtonlabel, defaultValues }) {


    const [input, setInput] = useState({
        amount:
        {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date:
        {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true,
        },
        description:
        {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        }
    });//if you fetch an imput u will get it as a strinf

    function inputChangeHandler(inputIdentifired, enteredValue) {
        setInput((curInput) => {
            return {
                ...curInput,
                [inputIdentifired]: { value: enteredValue, isValid: true }
            }
        })


    }

    function submitHandler() {
        const expenceData = {
            amount: +input.amount.value,
            date: new Date(input.date.value),
            description: input.description.value
        }
        const ampuntIsVAlid = !isNaN(expenceData.amount) && expenceData.amount > 0;
        const dateIsValid = expenceData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenceData.description.trim().length > 0;


        if (!ampuntIsVAlid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check yout input values')
            setInput((curInput) => {
                return {
                    amount: { value: curInput.amount.value, isValid: ampuntIsVAlid },
                    date: { value: curInput.date.value, isValid: dateIsValid },
                    description: { value: curInput.description.value, isValid: descriptionIsValid }
                }
            })
            return

        }
        onSubmit(expenceData);
    }
    const formIsInvalid = !input.amount.isValid || !input.date.isValid || !input.description.isValid;



    return (

        <View style={styles.form}>

            <Text style={styles.Text}>Your Expense</Text>

            <View style={styles.inputRow}>
                <Input style={styles.rowInput}
                    label="Amount"
                    invalid={!input.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: input.amount.value
                    }} />
                <Input style={styles.rowInput}
                    invalid={!input.date.isValid}
                    label="Date"
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: input.date.value
                    }} />
            </View>
            <Input label="Description"
                invalid={!input.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: input.description.value
                    // autoCapitalize: 'none'

                }}

            />
            {formIsInvalid && < Text style={styles.errorText} >Inalid input values - please check your entered data</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cencel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonlabel}</Button>
            </View>
        </View >)

}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80,


    },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },

    Text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center'

    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'


    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }


})

