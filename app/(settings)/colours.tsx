import { Colors } from "@/constants/Colors";
import Data from "@/constants/Data";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const colours = () => {
  const { regionTheme, setRegionTheme } = useAuth();

  const themes = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: Colors[themes].background,
      padding: 20,
      alignItems: "center",
      gap: 5,
    },
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: Colors[themes].text,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "400",
      color: Colors[themes].text,
      opacity: 0.7,
    },
    themesContent: {
      width: "100%",
      marginTop: 25,
    },
    themeBlock: {
      marginBottom: 15,
      borderRadius: 5,
      backgroundColor: Colors[themes].shade,
      padding: 10,
      gap: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: "600",
      color: Colors[themes].text,
    },
    themeItem: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
      paddingRight: 50,
    },
    itemName: {
      fontSize: 18,
      fontWeight: "500",
      color: Colors[themes].text,
    },
    colors: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    color: {
      width: 24,
      aspectRatio: 1,
      borderRadius: 12,
    },
  });
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Your Map Themes</Text>
      <Text style={styles.subtitle}>
        Select a color theme for the regions on your map.
      </Text>
      <ScrollView
        style={styles.themesContent}
        contentContainerStyle={{ alignItems: "flex-start", gap: 5 }}
      >
        <Text style={styles.header}>Colours</Text>
        <View style={styles.themeBlock}>
          {Data.themes.colors.map((theme) => (
            <TouchableOpacity
              key={Math.random()}
              style={styles.themeItem}
              onPress={() => setRegionTheme(theme.name)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                {theme.name === regionTheme ? (
                  <FontAwesome5
                    name="check"
                    size={20}
                    color={Colors[themes].text}
                  />
                ) : (
                  <View style={{ width: 20 }} />
                )}
                <Text style={styles.itemName}>
                  {theme.name[0].toUpperCase() + theme.name.slice(1)}
                </Text>
              </View>
              <View style={styles.colors}>
                {theme.colors.map((color) => (
                  <View
                    key={Math.random()}
                    style={{ ...styles.color, backgroundColor: color }}
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/*  */}
        <Text style={styles.header}>Seasons</Text>
        <View style={styles.themeBlock}>
          {Data.themes.seasons.map((theme) => (
            <TouchableOpacity
              key={Math.random()}
              style={styles.themeItem}
              onPress={() => setRegionTheme(theme.name)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                {theme.name === regionTheme ? (
                  <FontAwesome5
                    name="check"
                    size={20}
                    color={Colors[themes].text}
                  />
                ) : (
                  <View style={{ width: 20 }} />
                )}
                <Text style={styles.itemName}>
                  {theme.name[0].toUpperCase() + theme.name.slice(1)}
                </Text>
              </View>

              <View style={styles.colors}>
                {theme.colors.map((color) => (
                  <View
                    key={Math.random()}
                    style={{ ...styles.color, backgroundColor: color }}
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/*  */}
        <Text style={styles.header}>Nature</Text>
        <View style={styles.themeBlock}>
          {Data.themes.environment.map((theme) => (
            <TouchableOpacity
              key={Math.random()}
              style={styles.themeItem}
              onPress={() => setRegionTheme(theme.name)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                {theme.name === regionTheme ? (
                  <FontAwesome5
                    name="check"
                    size={20}
                    color={Colors[themes].text}
                  />
                ) : (
                  <View style={{ width: 20 }} />
                )}
                <Text style={styles.itemName}>
                  {theme.name[0].toUpperCase() + theme.name.slice(1)}
                </Text>
              </View>

              <View style={styles.colors}>
                {theme.colors.map((color) => (
                  <View
                    key={Math.random()}
                    style={{ ...styles.color, backgroundColor: color }}
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default colours;
