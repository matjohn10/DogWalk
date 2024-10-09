import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const Login = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: Colors[theme].background,
      alignItems: "center",
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      color: Colors[theme].text,
      marginBottom: 40,
      marginTop: "10%",
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: Colors[theme].text,
      borderRadius: 25,
      paddingHorizontal: 15,
      marginVertical: 10,
      color: Colors[theme].background,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: Colors[theme].text,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    buttonText: {
      color: Colors[theme].background,
      fontSize: 18,
      fontWeight: "bold",
    },
    utilityText: {
      color: "#aaa",
      fontSize: 14,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Forgot Password pressed")}>
        <Text style={styles.utilityText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setState(false)}>
        <Text style={styles.utilityText}>Not registered? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;