import React from "react";
import { Icon } from "react-native-elements";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

//Screens
import AllBeersScreen from "../screens/AllBeers";
import BitterBeersScreen from "../screens/BitterBeer";
import MoreAlcoholBeersScreen from "../screens/MoreAlcoholBeers";
import OrganicBeersScreen from "../screens/OrganicBeer";

const AllBeersScreenStack = createStackNavigator({
  AllBeers: {
    screen: AllBeersScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Take a Look To All Those Beers",
      headerTintColor: "#F7B048",
      headerStyle: {
        backgroundColor: "#463C3B"
      }
    })
  }
});

const BitterBeersScreenStack = createStackNavigator({
  BitterBeers: {
    screen: BitterBeersScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Bitter Beers",
      headerTintColor: "#F7B048",
      headerStyle: {
        backgroundColor: "#463C3B"
      }
    })
  }
});

const MoreAlcoholBeersScreenStack = createStackNavigator({
  Search: {
    screen: MoreAlcoholBeersScreen,
    navigationOptions: ({ navigation }) => ({
      title: "More ABV Beers",
      headerTintColor: "#F7B048",
      headerStyle: {
        backgroundColor: "#463C3B"
      }
    })
  }
});

const OrganicBeersScreenStack = createStackNavigator({
  MyAccount: {
    screen: OrganicBeersScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Organic Beers",
      headerTintColor: "#F7B048",
      headerStyle: {
        backgroundColor: "#463C3B"
      }
    })
  }
});

const RootStack = createBottomTabNavigator(
  {
    AllBeers: {
      screen: AllBeersScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "All Beers",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="beer" type="font-awesome" size={22} color={tintColor} />
        )
      })
    },
    BitterBeers: {
      screen: BitterBeersScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Bitter Beers",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="beer"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    MoreAlcoholBeers: {
      screen: MoreAlcoholBeersScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Beers With High ABV",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="bottle-wine"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    OrganicBeers: {
      screen: OrganicBeersScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Organic Beers",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="leaf"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    //Definir la pantalla que se vera primero
    initialRouteName: "AllBeers",
    //Definir orden de pantallas
    order: ["AllBeers", "OrganicBeers", "BitterBeers", "MoreAlcoholBeers"],
    //Definir los colores cuando la pantalla esta activa o inactiva
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#F7B048",
      style: {
        backgroundColor: "#463C3B"
      }
    }
  }
);

export default createAppContainer(RootStack);
