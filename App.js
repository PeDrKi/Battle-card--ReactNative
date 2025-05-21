import React                    from "react";

import { NavigationContainer }  from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen               from "./src/screens/HomeScreen";
import GameScreen               from "./src/screens/GameScreen";
import AddCardScreen            from "./src/screens/AddCardScreen";
import AboutScreen              from "./src/screens/About";
import AllCardsScreen           from "./src/screens/AllCardsScreen";
import EditCardScreen           from "./src/screens/EditCardScreen";
import AuthScreen               from "./src/screens/AuthScreen";
import SlotMachineScreen        from './src/screens/SlotMachineScreen';
import HowToPlayScreen          from './src/screens/HowToPlayScreen';
import LoreScreen               from './src/screens/LoreScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="In"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="In"             component={AuthScreen}        />
        <Stack.Screen name="Home"           component={HomeScreen}        />
        <Stack.Screen name="Game"           component={GameScreen}        />
        <Stack.Screen name="AddCardScreen"  component={AddCardScreen}     />
        <Stack.Screen name="AboutUsScreen"  component={AboutScreen}       />
        <Stack.Screen name="AllCard"        component={AllCardsScreen}    />
        <Stack.Screen name="Edit"           component={EditCardScreen}    />
        <Stack.Screen name="SlotMachine"    component={SlotMachineScreen} />
        <Stack.Screen name="HowToPlay"      component={HowToPlayScreen}   />
        <Stack.Screen name="Lore"           component={LoreScreen}        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
