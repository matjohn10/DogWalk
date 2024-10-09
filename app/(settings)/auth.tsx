import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, useColorScheme } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import KeyboardDismiss from "@/components/KeyboardDismiss";

const auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useColorScheme() ?? "light";
  return (
    <KeyboardDismiss>
      <View style={{ backgroundColor: Colors[theme].background }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Feather name="minus" size={24} color={Colors[theme].text} />
        </View>
        {isLogin ? (
          <Login setState={setIsLogin} />
        ) : (
          <Register setState={setIsLogin} />
        )}
      </View>
    </KeyboardDismiss>
  );
};

export default auth;
