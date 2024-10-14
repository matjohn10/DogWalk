import { Colors } from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { useDogs } from "@/queries/dogs-queries";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const region = () => {
  const { session } = useAuth();
  const local = useLocalSearchParams();
  const region_id = typeof local.id === "string" ? local.id : local.id[0];
  const { data: dogs } = useDogs(region_id);

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      backgroundColor: Colors[theme].background,
      flex: 1,
      padding: 20,
    },
    titleBox: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 24,
      color: Colors[theme].text,
      fontWeight: "600",
    },
    text: {
      fontSize: 18,
      color: Colors[theme].text,
      fontWeight: "400",
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Dogs</Text>
        <TouchableOpacity
          onPress={() => {
            if (!session)
              Alert.alert(
                "Join Us!",
                "Login to share your dog and walk information",
                [{ text: "Ok" }]
              );
            else router.navigate(`/${region_id}`);
          }}
        >
          <FontAwesome name="plus" size={26} color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      {dogs?.map((d) => (
        <Text key={d.id} style={styles.text}>
          {d.breed}
        </Text>
      ))}
    </View>
  );
};

export default region;
