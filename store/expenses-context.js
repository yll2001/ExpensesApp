import { createContext } from "react";
import { useReducer } from "react";



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpenses: (expenses) => { },
    updateExpence: (id, { description, amount, date }) => { },
    deleteExpense: (id) => { }

});

function expensesReducer(state, action) {
    switch (action.type) { // {type}
        case 'ADD':

            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return action.payload;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatebleExpense = state[updatableExpenseIndex]
            const updatedItem = { ...updatebleExpense, ...action.payload.data }
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses; // Add this return statement

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }

}

export function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expesesData) {
        dispatch({ type: 'ADD', payload: expesesData });//name it what you want {type}
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }
    function updateExpence(id, expesesData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expesesData } })

    }

    function setExpences(expenses) {
        dispatch({ type: 'SET', payload: expenses })

    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpences,
        addExpense: addExpense,
        updateExpence: updateExpence,
        deleteExpense: deleteExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
