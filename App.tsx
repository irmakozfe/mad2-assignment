import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import Timer from "./screens/Timer";

export type RootStackParamList = {
  Home: undefined;
  Timer: { title: string; seconds: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Timer"
              component={Timer}
              options={{
                headerShown: true,
                title: "Back to Home",
                headerStyle: { backgroundColor: "#422D28" },
                headerTintColor: "#F0E7D5",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
