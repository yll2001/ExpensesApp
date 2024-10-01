
import ExpencesOutput from "../components/ExpensesOutput/ExpencesOutput";
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useState } from "react";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);


    useEffect(() => {
        async function getExpenses() { //cant turn async in useEffect so we create a function 
            try {
                setIsFetching(true)
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Coud not fetch expenses');
            }
            setIsFetching(false);

        }
        getExpenses();

    }, [])


    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />

    }


    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7daysAgo && expense.date <= today;
    })



    return (
        <ExpencesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallBackText='No expences register for the last 7 days' />
    )

}

export default RecentExpenses;