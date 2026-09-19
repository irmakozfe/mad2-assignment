import { RouteProp, useRoute } from "@react-navigation/native";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Divider } from "react-native-paper";
import { RootStackParamList } from "../App";
import brewDetailsData from "../data/brewDetails.json";
import countriesData from "../data/countries.json";

const IMAGES = {
  colombia: require("../assets/colombia.png"),
  brazil: require("../assets/brazil.png"),
  guatemala: require("../assets/guatemala.png"),
  ethiopia: require("../assets/ethiopia.png"),
  kenya: require("../assets/kenya.png"),
} as const;

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

export default function Details() {
  const { id } = useRoute<DetailsRouteProp>().params;

  const coffee = countriesData.find((c) => c.id === id)!;
  const brew = brewDetailsData.find((d) => d.id === id)!;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={IMAGES[id as keyof typeof IMAGES]}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{coffee.title}</Text>
        <Text style={styles.description}>{coffee.description}</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Roast level</Text>
          <Text style={styles.rowValue}>{brew.roastLevel}</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Process</Text>
          <Text style={styles.rowValue}>{brew.process}</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Altitude</Text>
          <Text style={styles.rowValue}>{brew.altitude}</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Recommended grind</Text>
          <Text style={styles.rowValue}>{brew.recommendedGrind}</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Water temperature</Text>
          <Text style={styles.rowValue}>{brew.waterTempC}°C</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Coffee : water ratio</Text>
          <Text style={styles.rowValue}>{brew.ratio}</Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Flavor notes</Text>
          <Text style={styles.rowValue}>{brew.flavorNotes.join(", ")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2c100e" },
  content: { alignItems: "center", padding: 24 },
  image: { width: 140, height: 140, marginBottom: 16 },
  title: {
    color: "#F0E7D5",
    fontSize: 30,
    fontStyle: "italic",
    textAlign: "center",
  },
  description: {
    color: "#F0E7D5",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    opacity: 0.85,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowLabel: { color: "#F0E7D5", opacity: 0.7, fontSize: 13 },
  rowValue: {
    color: "#F0E7D5",
    fontSize: 14,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },
  divider: {
    width: "100%",
    backgroundColor: "#F0E7D5",
    opacity: 0.25,
  },
});
