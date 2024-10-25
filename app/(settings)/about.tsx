import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";

const APP_NAME = "BarkMap";
const ABOUT = `Introducing ${APP_NAME}, the ultimate solution for dog owners looking to enjoy peaceful, stress-free walks with their pets in public spaces. We understand that not every dog gets along with others, and some owners or pedestrians may feel uneasy when passing by certain dogs. That’s why we’ve created this app to help you plan the perfect time and place to walk your dog without the worry of unexpected encounters. With ${APP_NAME}, you can see when and where other dogs are being walked in your area. Owners can share their dog’s breed, size, personality traits, and preferences—such as whether they like to walk alone or are social butterflies. You can create walking regions for your pet, view existing popular routes, and avoid areas or times that may cause tension or discomfort for your dog or others. Our app is designed to help you tailor your dog’s walking experience to suit their personality while considering the comfort and needs of other pets and people. By planning your walks thoughtfully, you can enjoy smoother outings and let your dog feel more at ease in the great outdoors. Whether you’re scheduling quiet solo walks or looking for friendly playtime with other dogs, ${APP_NAME} brings the community together to create a safer, more harmonious walking environment for everyone.`;

const about = () => {
  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      padding: 20,
      gap: 25,
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: Colors[theme].text,
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      color: Colors[theme].text,
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: 90,
    },
  });

  return (
    <View style={styles.main}>
      <View
        style={{
          width: "90%",
          paddingVertical: 10,
          backgroundColor: Colors[theme].shade,
          alignSelf: "center",
          borderRadius: 8,
        }}
      >
        <Image
          style={styles.image}
          source={
            theme === "dark"
              ? require("@/assets/images/logo-name-dark.png")
              : require("@/assets/images/logo-name-light.png")
          }
          contentFit="contain"
        />
      </View>
      <ScrollView>
        <Text style={styles.text}>{ABOUT}</Text>
      </ScrollView>
    </View>
  );
};

export default about;
