import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./app/navigations/BeerNavigation";
export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
