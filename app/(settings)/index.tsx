import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const settings = () => {
  return (
    <View>
      <Text>settings</Text>
      <TouchableOpacity
        onPress={() => router.navigate("/auth")}
        style={{ backgroundColor: "white" }}
      >
        <Text>Auth</Text>
      </TouchableOpacity>
    </View>
  );
};

export default settings;
