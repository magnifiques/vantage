import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";

const Home = () => {
  const balance = 1420;

  const onAddMoney = () => {};
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton title="Add Money" onPress={onAddMoney} icon={"add"} />
        <RoundButton title="Exchange" onPress={onAddMoney} icon={"refresh"} />
        <RoundButton title="Details" onPress={onAddMoney} icon={"list"} />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 60,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 50,
    fontWeight: "300",
  },
  actionRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
  },
});

export default Home;
