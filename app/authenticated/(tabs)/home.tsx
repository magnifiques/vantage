import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const { transactions, balance, runTransaction, clearTransaction } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: 200,
      date: new Date(),
      title: "Added Money",
    });
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton title="Add Money" onPress={onAddMoney} icon={"add"} />
        <RoundButton title="Exchange" onPress={onAddMoney} icon={"refresh"} />
        <RoundButton title="Details" onPress={onAddMoney} icon={"list"} />
        <RoundButton
          title="More"
          onPress={onAddMoney}
          icon={"ellipsis-horizontal"}
        />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No Transactions Yet
          </Text>
        )}

        {transactions.map((transaction) => {
          const parsedDate = new Date(transaction.date);

          // Check if the date is valid and format it
          const formattedDate = !isNaN(parsedDate.getTime())
            ? parsedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Invalid Date";

          return (
            <View
              key={transaction.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
              }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500" }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {formattedDate}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: `${transaction.amount > 0 ? "#358106" : "red"}`,
                  }}
                >
                  {transaction.amount}$
                </Text>
              </View>
            </View>
          );
        })}
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
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "white",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
