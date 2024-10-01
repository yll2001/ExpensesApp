import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { GlobalStyles } from "../constants/style";
import IconButton from "../components/UI/IconButton";
import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpenseForm from "../components/MenageExpense/ExpenseForm";
import { deleteExpense, storeExpence, } from "../util/http";
import { updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function MenageExpences({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);



    const expensesCtx = useContext(ExpensesContext);


    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;//boolean convert


    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
            headerTintColor: 'white'
        });
    }, [navigation, isEditing]);




    async function deleteExpenseHandler() {

        setIsSubmitting(true);
        try {

            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();

        } catch (error) {
            setError('Could not delete expense-please try again later');
            setIsSubmitting(false)
        }

    }




    function cancelHandler() {
        navigation.goBack();

    }





    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpence(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpence(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();

        } catch (error) {
            setError('Could not save data-please try again later!');
            setIsSubmitting(false);
        }


    }


    function errorHandler() {
        setError(null)
    }



    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }


    if (isSubmitting) {
        return <LoadingOverlay />
    }



    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} submitButtonlabel={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} defaultValues={selectedExpense} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}

        </View>
    );
}

export default MenageExpences;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },

});
