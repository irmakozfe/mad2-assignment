import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type MainCardProps = {
  image: any;
  title: string;
  description: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function MainCard({
  image,
  title,
  description,
  selected,
  onPress,
}: MainCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, selected && styles.cardSelected]}>
        <Image source={image} style={styles.cardImage} resizeMode="contain" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B6CFE4",
    borderRadius: 20,
    padding: 18,
    aspectRatio: 0.7,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: "#422D28",
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#422D28",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  cardDescription: {
    color: "#422D28",
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
