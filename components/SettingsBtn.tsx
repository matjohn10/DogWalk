import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

interface props {
  disabled?: boolean;
}

const SettingsBtn = ({ disabled }: props) => {
  const styles = StyleSheet.create({
    main: {
      position: "absolute",
      top: "8%",
      right: "5%",
      backgroundColor: "white",
      padding: 5,
      borderRadius: 10,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.main}
      onPress={() => router.navigate("/(settings)")}
    >
      <MaterialIcons name="settings" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SettingsBtn;
