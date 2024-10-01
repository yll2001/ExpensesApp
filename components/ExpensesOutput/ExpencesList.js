import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import EpxencesItem from "./ExpencesItem";


function renderExpenseItem(itemData) {
    return <EpxencesItem {...itemData.item} />
}


function ExpencesList({ expenses }) {
    return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />

}

export default ExpencesList;

const style = StyleSheet.create({

})