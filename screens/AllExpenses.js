import { Text } from "react-native";
import ExpencesOutput from "../components/ExpensesOutput/ExpencesOutput";
import { useContext } from "react";
import { ExpensesContext } from '../store/expenses-context'
function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpencesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallBackText='No registered expences found' />
    )

}

export default AllExpenses;