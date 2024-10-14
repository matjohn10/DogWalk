import SettingsBtn from "@/components/SettingsBtn";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import AlertModal from "@/components/AlertModal";
import Checkbox from "expo-checkbox";
import { useGetData, useStoreData } from "@/lib/asyncStorage";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";
import { PathInfo, Paths } from "@/types/paths";
import { usePaths, useSavePath } from "@/queries/path-queries";
import LoadingModal from "@/components/LoadingModal";
import Path from "@/components/Path";
import PathEntryModal from "@/components/PathEntryModal";

export default function Index() {
  const { session, userRegion, loadingLocation } = useAuth();
  const [enabledPathEdit, setEnabledPathEdit] = useState(false);
  const [path, setPath] = useState<LatLng[]>([]);
  const [cloudPathsState, setCloudPathsStates] = useState<PathInfo[]>([]);
  const [localPathsState, setLocalPathsStates] = useState<Paths>([]);

  const { data, isLoading } = useGetData("no-help");
  const { data: localPaths, isLoading: areLocalPathsLoading } =
    useGetData("paths");
  const {
    data: cloudPaths,
    isLoading: areCloudPathsLoading,
    isRefetching,
  } = usePaths(session?.user.id);
  const { mutateAsync: storeData, isPending } = useStoreData();

  const { mutateAsync: savePath } = useSavePath();

  const [prefersNoHelp, setPrefersNoHelp] = useState(false);
  const [noHelpChecked, setNoHelpChecked] = useState(false);
  const [pathAlert, setPathAlert] = useState(false);

  const [openPathEntryModal, setOpenPathEntryModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !!data) {
      setPrefersNoHelp(!!data);
      setNoHelpChecked(!!data);
    }
  }, [isLoading]);

  useEffect(() => {
    //console.log("Cloud:", cloudPaths);
    if (!areCloudPathsLoading) {
      if (!cloudPaths) setCloudPathsStates([]);
      else {
        setCloudPathsStates(cloudPaths);
      }
    }
  }, [isRefetching, areCloudPathsLoading]);

  useEffect(() => {
    //console.log("Local:", localPaths);
    if (!areLocalPathsLoading) {
      if (!localPaths) setLocalPathsStates([]);
      else {
        const loadedPaths = JSON.parse(localPaths) as Paths;
        setLocalPathsStates([...localPathsState, ...loadedPaths]);
      }
    }
  }, [areLocalPathsLoading]);

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

  const handleSavePath = () => {
    if (!!session) {
      if (path.length > 1) {
        // setCloudPathsStates([...cloudPathsState, path]);
        setPath([]);
        console.log("SAVE TO DB");
        savePath({ id: session.user.id, path });
      }
    } else {
      setLocalPathsStates([...localPathsState, path]);
      setPath([]);
      storeData({
        key: "paths",
        value: JSON.stringify([...localPathsState, path]),
      });
      setEnabledPathEdit(false);
    }
  };

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        region={userRegion}
        loadingEnabled
        loadingIndicatorColor={Colors[theme].text}
        onPress={(c) => {
          if (enabledPathEdit) setPath([...path, c.nativeEvent.coordinate]);
        }}
        // onPanDrag={() => console.log("Pan")}
      >
        {cloudPathsState.map((p) => (
          <Path
            key={p.id}
            id={p.id}
            coords={p.coordinates}
            width={5}
            color="red"
          />
        ))}

        {localPathsState.map((p) => (
          <Path
            key={Math.random()}
            id={"0"}
            coords={p}
            width={5}
            color="blue"
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
              if (!!session) setEnabledPathEdit(true);
              else
                Alert.alert(
                  "Join Us?",
                  "Login to share your walk paths with others! Cancel and save your paths on your device.",
                  [
                    {
                      text: "Cancel",
                      onPress: () => setEnabledPathEdit(true),
                      style: "cancel",
                    },
                    {
                      text: "Continue",
                      onPress: () => router.navigate("/(settings)/auth"),
                      style: "default",
                    },
                  ]
                );
            }}
          >
            <FontAwesome name="plus" size={24} color="black" />
          </TouchableOpacity>
          {enabledPathEdit ? (
            <TouchableOpacity
              key={2}
              style={{ ...styles.addPath }}
              onPress={() => {
                if (path.length > 0) {
                  const newP = [...path];
                  newP.pop();
                  setPath(newP);
                }
              }}
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
                if (path.length <= 1)
                  Alert.alert(
                    "Incomplete Path",
                    "Your path must be more than 1 point.",
                    [{ text: "Ok" }]
                  );
                else setOpenPathEntryModal(true);
              }}
            >
              {isPending ? (
                <ActivityIndicator color={Colors[theme].text} size="small" />
              ) : (
                <FontAwesome name="cloud-upload" size={20} color="black" />
              )}
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

      <PathEntryModal
        visible={openPathEntryModal}
        setVisible={setOpenPathEntryModal}
        callBackSave={handleSavePath}
      />

      <LoadingModal visible={loadingLocation} />
    </View>
  );
}
