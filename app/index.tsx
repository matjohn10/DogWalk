import SettingsBtn from "@/components/SettingsBtn";
import { Colors } from "@/constants/Colors";
import TestData from "@/constants/TestData";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import AlertModal from "@/components/AlertModal";
import Checkbox from "expo-checkbox";
import { useGetData, useStoreData } from "@/lib/asyncStorage";

export default function Index() {
  const [enabledPathEdit, setEnabledPathEdit] = useState(false);
  const [path, setPath] = useState<LatLng[]>([]);
  const [paths, setPaths] = useState(TestData.paths);

  const { data, isLoading } = useGetData("no-help");
  const { mutateAsync: storeData } = useStoreData();
  // To store in local storage and retrieve on app booting
  const [prefersNoHelp, setPrefersNoHelp] = useState(false);
  const [noHelpChecked, setNoHelpChecked] = useState(false);
  const [pathAlert, setPathAlert] = useState(false);

  useEffect(() => {
    if (!isLoading && !!data) {
      setPrefersNoHelp(data);
      setNoHelpChecked(data);
    }
  }, [isLoading]);

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
      fontSize: 16,
    },
    title: {
      color: Colors[theme].text,
      fontSize: 20,
      fontWeight: "600",
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
    alert: {
      backgroundColor: Colors[theme].background,
      borderRadius: 5,
      padding: 20,
      gap: 25,
    },
    helpItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    checkbox: {
      margin: 8,
    },
    btn: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: Colors[theme].destructive,
      borderRadius: 10,
    },
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

      {/* SETTINGS */}
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
              if (!enabledPathEdit) setPathAlert(true);
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

      <AlertModal
        visible={pathAlert && !prefersNoHelp}
        setVisible={setPathAlert}
      >
        <View style={styles.alert}>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text style={styles.title}>How to add a walk path?</Text>
          </View>
          <View style={{ width: "100%", alignItems: "flex-start", gap: 10 }}>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <FontAwesome name="plus" size={24} color="black" />
              </View>
              <Text style={styles.text}>Enter EDIT mode.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <MaterialCommunityIcons
                  name="restore"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.text}>Undo last change.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <Feather name="x" size={24} color="black" />
              </View>
              <Text style={styles.text}>Exit EDIT mode.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <FontAwesome name="cloud-upload" size={20} color="black" />
              </View>
              <Text style={styles.text}>Save the current walk path.</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.helpItem}>
              <Checkbox
                style={styles.checkbox}
                value={noHelpChecked}
                onValueChange={setNoHelpChecked}
              />
              <Text style={styles.text}>Do not show again?</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setPrefersNoHelp(noHelpChecked);
                if (noHelpChecked)
                  storeData({
                    key: "no-help",
                    value: noHelpChecked.toString(),
                  });
              }}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>
    </View>
  );
}
