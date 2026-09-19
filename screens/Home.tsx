import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import { RootStackParamList } from "../App";
import MainCard from "../components/MainCard";
import countriesData from "../data/countries.json";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.68;
const CARD_SPACING = 10;

const IMAGES = {
  colombia: require("../assets/colombia.png"),
  brazil: require("../assets/brazil.png"),
  guatemala: require("../assets/guatemala.png"),
  ethiopia: require("../assets/ethiopia.png"),
  kenya: require("../assets/kenya.png"),
} as const;

type CountryKey = keyof typeof IMAGES;

type CoffeeModule = {
  id: CountryKey;
  title: string;
  description: string;
  brewSeconds: number;
};

const MODULES = countriesData as CoffeeModule[];

type NavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavProp>();
  const [selectedId, setSelectedId] = useState<CountryKey>("colombia");
  const selectedCoffee = MODULES.find((m) => m.id === selectedId)!;

  const handleBrew = () => {
    navigation.navigate("Timer", {
      title: selectedCoffee.title,
      seconds: String(selectedCoffee.brewSeconds),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar} elevated={false}>
        <Appbar.Content title="" />
        <Appbar.Action
          icon="account-circle"
          color="#F0E7D5"
          onPress={() => navigation.navigate("Login")}
        />
      </Appbar.Header>

      <Text style={styles.header}>Welcome to your local brewery.</Text>
      <Text style={styles.secondaryheader}>
        Choose your favourite coffee bean and brew it already!{" "}
      </Text>
      <Animated.FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        contentContainerStyle={styles.list}
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{ width: CARD_WIDTH, transform: [{ scale }] }}
            >
              <MainCard
                image={IMAGES[item.id]}
                title={item.title}
                description={item.description}
                selected={item.id === selectedId}
                onPress={() => setSelectedId(item.id)}
              />
            </Animated.View>
          );
        }}
      />
      <Text style={styles.footer}>Freshly roasted, just for you!</Text>
      <Button
        mode="contained"
        onPress={handleBrew}
        buttonColor="#B6CFE4"
        textColor="#422D28"
        style={styles.brewButton}
      >
        Brew {selectedCoffee.title}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#422D28",
    flex: 1,
    alignItems: "center",
  },
  appbar: {
    backgroundColor: "#422D28",
    width: "100%",
  },
  header: {
    color: "#F0E7D5",
    fontSize: 45,
    fontStyle: "italic",
    fontFamily: Platform.select({ ios: "Helvetica", android: "sans-serif" }),
    textAlign: "center",
    paddingHorizontal: 16,
  },
  secondaryheader: {
    color: "#F0E7D5",
    textAlign: "center",
    fontFamily: Platform.select({ ios: "Helvetica", android: "sans-serif" }),
    fontSize: 13,
    paddingHorizontal: 24,
    marginTop: 15,
    marginBottom: -10,
  },
  list: {
    marginTop: 70,
    flexGrow: 0,
  },
  footer: {
    color: "#F0E7D5",
    fontSize: 13,
    textAlign: "center",
    marginTop: "auto",
    opacity: 0.7,
  },
  brewButton: {
    marginTop: 16,
    marginBottom: 65,
    borderRadius: 100,
  },
});
