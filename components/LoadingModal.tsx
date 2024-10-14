import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";

interface props {
  visible: boolean;
}

const LoadingModal = ({ visible }: props) => {
  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      width: "70%",
      backgroundColor: Colors[theme].background,
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      gap: 5,
      alignSelf: "center",
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: Colors[theme].text,
    },
  });
  return (
    <Modal isVisible={visible}>
      <View style={styles.main}>
        <Text style={styles.title}>Setting Up your Location</Text>
        <ActivityIndicator color={Colors[theme].text} size="small" />
      </View>
    </Modal>
  );
};

export default LoadingModal;
