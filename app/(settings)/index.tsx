import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const settings = () => {
  const { session } = useAuth();

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      padding: 20,
    },
    block: {
      alignItems: "flex-start",
      gap: 5,
    },
    blockHeader: {
      color: Colors[theme].text,
      fontSize: 20,
      fontWeight: "600",
    },
    blockContent: {
      // borderWidth: 0.5,
      borderRadius: 8,
      // borderColor: "gray",
      width: "100%",
      gap: 10,
    },
    contentItem: {
      width: "100%",
      paddingVertical: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: Colors[theme].shade,
      borderBottomWidth: 0.5,
    },
    itemText: {
      color: Colors[theme].text,
      fontSize: 16,
      fontWeight: "400",
    },
  });

  return (
    <View style={styles.main}>
      <View style={styles.block}>
        <View style={styles.blockContent}>
          {!!session ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={() => router.navigate("/auth")}
              style={styles.contentItem}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons
                  name="login"
                  size={24}
                  color={Colors[theme].text}
                />
                <Text style={styles.itemText}>Join Us!</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => router.navigate("/about")}
            style={styles.contentItem}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="script-text-outline"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>About</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/colours")}
            style={styles.contentItem}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="format-color-fill"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>Colours</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/feedback")}
            style={styles.contentItem}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>Feedback</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/help")}
            style={styles.contentItem}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="chat-question"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>Help</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/licenses")}
            style={styles.contentItem}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>Licenses</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
          {!!session ? (
            <TouchableOpacity
              onPress={async () => {
                const res = await supabase.auth.signOut();
                if (!res.error) router.back();
              }}
              style={styles.contentItem}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={Colors[theme].text}
                />
                <Text style={styles.itemText}>Logout</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

export default settings;
