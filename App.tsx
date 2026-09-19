import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Details from "./screens/Details";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Timer from "./screens/Timer";

export type RootStackParamList = {
  Home: undefined;
  Timer: { title: string; seconds: string };
  Login: undefined;
  Details: { id: string };
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
                headerStyle: {
                  backgroundColor: "#422D28",
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: "#F0E7D5",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: true,
                title: "Back to Home",
                headerStyle: {
                  backgroundColor: "#422D28",
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: "#F0E7D5",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerShown: true,
                title: "Back",
                headerStyle: {
                  backgroundColor: "#422D28",
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: "#F0E7D5",
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
