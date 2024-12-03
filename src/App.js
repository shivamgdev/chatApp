import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import { ChatProvider } from "./hooks/useChatStore";
import { registerRootComponent } from "expo";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <ChatProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#075E54",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen name="Tribe Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ChatProvider>
    </>
  );
}

registerRootComponent(App);

export default App;
