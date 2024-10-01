import { View, Text, FlatList, StyleSheet } from 'react-native'
import ExpencesSummary from './ExpencesSummary';
import ExpencesList from './ExpencesList';
import { GlobalStyles } from '../../constants/style';




function ExpencesOutput({ expenses, expensesPeriod, fallBackText }) {

    let content = <Text style={styles.infoText}>{fallBackText}</Text>

    if (expenses.length > 0) {
        content = <ExpencesList expenses={expenses} />
    }
    return (
        <View style={styles.container}>
            <ExpencesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    )

}

export default ExpencesOutput;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32



    }

})