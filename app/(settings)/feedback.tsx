import KeyboardDismiss from "@/components/KeyboardDismiss";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { useSendFeedback } from "@/queries/feedback-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const feedback = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { session } = useAuth();
  const { mutateAsync: sendFeedback, isPending } = useSendFeedback();

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      padding: 20,
      gap: 40,
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: Colors[theme].text,
    },
    header: {
      fontSize: 18,
      fontWeight: "500",
      color: Colors[theme].text,
      textAlign: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      color: Colors[theme].text,
      textAlign: "center",
    },
    feedback: {
      alignItems: "flex-start",
      gap: 25,
      width: "100%",
    },
    feedbackBlock: {
      alignItems: "flex-start",
      gap: 5,
      width: "100%",
    },
    subjectInput: {
      width: "100%",
      borderRadius: 8,
      padding: 10,
      color: Colors[theme].text,
      borderWidth: 0.5,
      borderColor: Colors[theme].shade,
    },
    bodyInput: {
      aspectRatio: 1.3,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: Colors[theme].text,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "400",
      color: Colors[theme].background,
    },
  });

  const handleSend = () => {
    sendFeedback({ subject, body, sender: !!session ? session.user.id : null });
    setSubject("");
    setBody("");
    router.back();
  };

  return (
    <KeyboardDismiss>
      <View style={styles.main}>
        <Text style={styles.title}>Feedback</Text>
        <View style={styles.feedback}>
          <View style={styles.feedbackBlock}>
            <Text style={styles.header}>Subject:</Text>
            <TextInput
              style={styles.subjectInput}
              placeholder="Subject"
              maxLength={75}
              value={subject}
              onChangeText={setSubject}
            />
          </View>
          <View style={styles.feedbackBlock}>
            <Text style={styles.header}>Body:</Text>
            <TextInput
              placeholder="Write your feedback or question here..."
              style={{ ...styles.subjectInput, ...styles.bodyInput }}
              value={body}
              onChangeText={setBody}
              maxLength={750}
              multiline
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSend}
            disabled={!subject || !body || isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Sending" : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardDismiss>
  );
};

export default feedback;
