import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import InfoItem from "../../components/InfoItem";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function Timer() {
  const router = useRouter();
  const { title, seconds } = useLocalSearchParams<{
    title: string;
    seconds: string;
  }>();

  const brewSeconds = Number(seconds) || 180;
  const [timeLeft, setTimeLeft] = useState(brewSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const isDone = timeLeft <= 0;
  const progress = isDone ? 1 : 1 - timeLeft / brewSeconds;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {isDone ? "Coffee is ready!" : "Brewing..."}
      </Text>

      <InfoItem label="Coffee" value={title ?? "Your coffee"} />
      <InfoItem
        label="Time left"
        value={isDone ? "0:00" : formatTime(timeLeft)}
      />

      <ProgressBar
        progress={progress}
        color="#B6CFE4"
        style={styles.progressBar}
      />

      <View style={styles.buttonRow}>
        {!isDone && (
          <Button
            mode="contained"
            onPress={() => setIsRunning((prev) => !prev)}
            buttonColor="#B6CFE4"
            textColor="#422D28"
          >
            {isRunning ? "Pause" : "Resume"}
          </Button>
        )}
        <Button
          mode="outlined"
          textColor="#F0E7D5"
          onPress={() => router.back()}
        >
          Back
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#422D28",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    color: "#F0E7D5",
    flex: 0.05,
    fontSize: 28,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 30,
  },
  progressBar: {
    width: "80%",
    height: 10,
    flex: 0.05,
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
});
