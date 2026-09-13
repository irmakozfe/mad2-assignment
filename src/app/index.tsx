import { useRouter } from "expo-router";
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
import { Button } from "react-native-paper";
import MainCard from "../../components/MainCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.68;
const CARD_SPACING = 10;

const IMAGES = {
  colombia: require("../../assets/colombia.png"),
  brazil: require("../../assets/brazil.png"),
  guatemala: require("../../assets/guatemala.png"),
  ethiopia: require("../../assets/ethiopia.png"),
  kenya: require("../../assets/kenya.png"),
} as const;

type CountryKey = keyof typeof IMAGES;

type CoffeeModule = {
  id: CountryKey;
  title: string;
  description: string;
  brewSeconds: number;
};

const MODULES: CoffeeModule[] = [
  {
    id: "colombia",
    title: "Colombia",
    description:
      "Grown on volcanic slopes in the Andes at 1,200-2,000m. Washed process, medium roast. Notes of red apple, caramel and a clean, mild acidity.",
    brewSeconds: 180,
  },
  {
    id: "brazil",
    title: "Brazil Santos",
    description:
      "Sourced from the Cerrado plateau's low-altitude farms. Natural (dry) processed, giving it a heavy body, low acidity and notes of roasted nuts and dark chocolate.",
    brewSeconds: 240,
  },
  {
    id: "guatemala",
    title: "Guatemala",
    description:
      "Antigua Valley beans grown in mineral-rich volcanic soil at 1,500m+. Full-bodied with notes of cocoa, smoke and a subtle spice on the finish.",
    brewSeconds: 210,
  },
  {
    id: "ethiopia",
    title: "Ethiopia",
    description:
      "Considered the birthplace of coffee, from the Yirgacheffe and Sidamo highlands. Heirloom varietals, light roast. Floral, citrusy, and often compared to fine wine.",
    brewSeconds: 150,
  },
  {
    id: "kenya",
    title: "Kenya",
    description:
      "High-altitude beans (1,700m+) from the slopes near Mount Kenya. Double-fermented washed process yields a bright, wine-like acidity with blackcurrant and berry notes.",
    brewSeconds: 200,
  },
];

export default function Index() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<CountryKey>("colombia");
  const selectedCoffee = MODULES.find((m) => m.id === selectedId)!;

  const handleBrew = () => {
    router.push({
      pathname: "/timer",
      params: {
        title: selectedCoffee.title,
        seconds: String(selectedCoffee.brewSeconds),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
    paddingTop: 24,
  },
  header: {
    color: "#F0E7D5",
    fontSize: 45,
    fontStyle: "italic",
    fontFamily: Platform.select({ ios: "Helvetica", android: "sans-serif" }),
    textAlign: "center",
    paddingHorizontal: 16,
    marginTop: 40,
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
    marginBottom: 40,
    borderRadius: 100,
  },
});
