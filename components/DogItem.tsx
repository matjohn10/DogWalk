import { Colors } from "@/constants/Colors";
import { Dog } from "@/types/dogs";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, useColorScheme, StyleSheet } from "react-native";

const DogItem = ({ dog }: { dog: Dog }) => {
  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      backgroundColor: Colors[theme].shade,
      gap: 5,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: Colors[theme].text,
    },
    text: {
      fontSize: 14,
      fontWeight: "400",
      color: Colors[theme].text,
      opacity: 0.6,
    },
  });
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{dog.breed}</Text>
      <View style={{ width: "100%", paddingLeft: 10, gap: 3 }}>
        <Text style={styles.text}>
          <FontAwesome5 name="bone" size={12} color={Colors[theme].text} />{" "}
          Personality: {dog.personality}
        </Text>
        <Text style={styles.text}>
          <FontAwesome5 name="weight" size={12} color={Colors[theme].text} />{" "}
          Size: {dog.size}
        </Text>
        <Text style={styles.text}>
          <FontAwesome5 name="clock" size={12} color={Colors[theme].text} />{" "}
          Time of walk: {dog.walk_time}
        </Text>
        {dog.alone ? (
          <Text style={styles.text}>
            {" "}
            <FontAwesome5
              name="caret-right"
              size={14}
              color={Colors[theme].text}
            />{" "}
            Prefers being alone
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default DogItem;
