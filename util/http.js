import axios from "axios";

const BECKEND_URL = 'https://react-native-c1ca8-default-rtdb.firebaseio.com'

export async function storeExpence(expenseData) {
    const response = await axios.post(BECKEND_URL + '/expenses.json', expenseData);//firebase specific
    const id = response.data.name;
    return id;




}

export async function fetchExpenses() {
    try {
        const response = await axios.get(`${BECKEND_URL}/expenses.json`);

        // Check if data exists
        if (!response.data) {
            throw new Error('No data returned from server');
        }

        // Convert data into an array of expense objects
        const expenses = Object.entries(response.data).map(([key, expenseData]) => ({
            id: key,
            amount: expenseData.amount,
            date: new Date(expenseData.date),
            description: expenseData.description,
        }));

        return expenses;
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        throw error;
    }
}

export function updateExpense(id, expenseData) {
    return axios.put(`${BECKEND_URL}/expenses/${id}.json`, expenseData)
        .then(response => {
            console.log('Expense updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating expense:', error);
            throw error; // Re-throw the error if you want to handle it further up the call stack
        });
}

export async function deleteExpense(id) {
    try {
        const response = await axios.delete(`${BECKEND_URL}/expenses/${id}.json`);
        console.log('Expense deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
}