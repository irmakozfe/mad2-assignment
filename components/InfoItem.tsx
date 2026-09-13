import { StyleSheet, Text, View } from "react-native";

type InfoItemProps = {
  label: string;
  value: string;
};

export default function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    color: "#F0E7D5",
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    color: "#F0E7D5",
    fontSize: 22,
    fontWeight: "600",
  },
});
