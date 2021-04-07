import TodayScreen from "../../src/screen/TodayScreen";
import WeekScreen from "../../src/screen/WeekScreen";
import SettingScreen from "../../src/screen/SettingScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import React from "react";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";

const MainNavigator = createBottomTabNavigator(
  {
    Today: {
      screen: TodayScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "today" : "today-outline"} size={30} />
        ),
      },
    },

    Week: {
      screen: WeekScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "md-sunny-sharp" : "md-sunny-outline"}
            size={30}
          />
        ),
      },
    },

    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "settings" : "settings-outline"}
            size={30}
          />
        ),
      },
    },
  },
  {
    headerMode: `screen`,
    mode: `modal`,
    // tabBarOptions: {
    //   showLabel: false,
    // },
  }
);

export default createAppContainer(MainNavigator);
