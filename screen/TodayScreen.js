import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TodayScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TodayScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
export default TodayScreen;
