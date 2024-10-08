import SettingsBtn from "@/components/SettingsBtn";
import { Colors } from "@/constants/Colors";
import TestData from "@/constants/TestData";
import { useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default function Index() {
  const [enabledPathEdit, setEnabledPathEdit] = useState(false);
  const [path, setPath] = useState<LatLng[]>([]);
  const [paths, setPaths] = useState(TestData.paths);

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[theme].background,
    },
    text: {
      color: Colors[theme].text,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    addPath: {
      backgroundColor: "white",
      padding: 5,
      borderRadius: 10,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    menu: {
      position: "absolute",
      top: "8%",
      left: "5%",
      width: 80,
      height: 80,
    },
    menuRow: { flexDirection: "row", gap: 10 },
  });

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        loadingEnabled
        loadingIndicatorColor={Colors[theme].text}
        onPress={(c) => {
          if (enabledPathEdit) setPath([...path, c.nativeEvent.coordinate]);
        }}
        // onPanDrag={() => console.log("Pan")}
      >
        {paths.map((p) => (
          <Polyline
            key={Math.random()}
            coordinates={p}
            strokeWidth={5}
            strokeColor="red"
          />
        ))}
        <Polyline coordinates={path} strokeWidth={5} strokeColor="white" />
      </MapView>
      <SettingsBtn disabled={enabledPathEdit} />

      {/* ADD PATH BUTTONS */}
      <View
        style={{
          position: "absolute",
          top: "8%",
          left: "5%",
          flex: 2,
          gap: 10,
        }}
      >
        <View style={styles.menuRow}>
          <TouchableOpacity
            key={1}
            style={styles.addPath}
            onPress={() => {
              setEnabledPathEdit(true);
              // setMenu([base, restore, delPath, save]);
            }}
          >
            <FontAwesome name="plus" size={24} color="black" />
          </TouchableOpacity>
          {enabledPathEdit ? (
            <TouchableOpacity
              key={2}
              style={{ ...styles.addPath }}
              onPress={() => setPath([])}
            >
              <MaterialCommunityIcons name="restore" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {enabledPathEdit ? (
          <View style={styles.menuRow}>
            <TouchableOpacity
              key={3}
              style={{ ...styles.addPath }}
              onPress={() => {
                setPath([]);
                setEnabledPathEdit(false);
              }}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              style={{ ...styles.addPath }}
              onPress={() => {
                if (path.length > 1) {
                  setPaths([...paths, path]);
                  setPath([]);
                  console.log("SAVE TO DB");
                }
              }}
            >
              <FontAwesome name="cloud-upload" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
