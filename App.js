import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodayScreen from "./screen/TodayScreen";
import WeekScreen from "./screen/WeekScreen";
import SettingScreen from "./screen/SettingScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="TodayScreen" component={TodayScreen} />
        <Tab.Screen name="WeekScreen" component={WeekScreen} />
        <Tab.Screen name="SettingScreen" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
