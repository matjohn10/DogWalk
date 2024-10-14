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
import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import AlertModal from "@/components/AlertModal";
import Checkbox from "expo-checkbox";
import { useGetData, useStoreData } from "@/lib/asyncStorage";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";
import { useRegions, useSaveRegion } from "@/queries/region-queries";
import LoadingModal from "@/components/LoadingModal";
import { Region, RegionCoords } from "@/types/regions";
import RegionMap from "@/components/RegionMap";

export default function Index() {
  const { session, userRegion, loadingLocation } = useAuth();
  const [enabledRegionEdit, setEnabledRegionEdit] = useState(false);
  const [region, setRegion] = useState<LatLng[]>([]);
  const [cloudRegionsState, setCloudRegionsStates] = useState<Region[]>([]);

  const { data, isLoading } = useGetData("no-help");
  const {
    data: cloudRegions,
    isLoading: areCloudRegionsLoading,
    isRefetching,
  } = useRegions();
  const { mutateAsync: storeData, isPending } = useStoreData();

  const { mutateAsync: saveRegion } = useSaveRegion();

  const [prefersNoHelp, setPrefersNoHelp] = useState(false);
  const [noHelpChecked, setNoHelpChecked] = useState(false);
  const [regionAlert, setRegionAlert] = useState(false);

  const [openDogEntryModal, setOpenDogEntryModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !!data) {
      setPrefersNoHelp(!!data);
      setNoHelpChecked(!!data);
    }
  }, [isLoading]);

  useEffect(() => {
    //console.log("Cloud:", cloudPaths);
    if (!areCloudRegionsLoading) {
      if (!cloudRegions) setCloudRegionsStates([]);
      else {
        setCloudRegionsStates(cloudRegions);
      }
    }
  }, [isRefetching, areCloudRegionsLoading]);

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

  const handleSaveRegion = () => {
    if (!!session) {
      if (region.length === 4) {
        setRegion([]);
        console.log("SAVE TO DB");
        saveRegion({ id: session.user.id, coords: region });
      }
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
          if (enabledRegionEdit)
            setRegion([...region, c.nativeEvent.coordinate]);
        }}
        // onPanDrag={() => console.log("Pan")}
      >
        {cloudRegionsState.map((p) => (
          <RegionMap
            key={p.id}
            id={p.id}
            coords={p.coordinates as RegionCoords}
            width={5}
            color="red"
          />
        ))}

        {/* VISUAL MARKERS WHEN MAKING REGION */}
        {region.length < 3 ? (
          region.map((r) => (
            <Marker key={Math.random()} coordinate={r}>
              <View
                style={{
                  position: "relative",
                  width: 40,
                  aspectRatio: 1,
                }}
              >
                <MaterialCommunityIcons
                  style={{ position: "absolute", top: -20 }}
                  name="map-marker-check"
                  size={40}
                  color="black"
                />
              </View>
            </Marker>
          ))
        ) : (
          <></>
        )}

        <Polygon coordinates={region} strokeWidth={5} strokeColor="white" />
      </MapView>

      {/* SETTINGS */}
      <SettingsBtn disabled={enabledRegionEdit} />

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
              if (!enabledRegionEdit) setRegionAlert(true);
              if (!!session) setEnabledRegionEdit(true);
              else
                Alert.alert("Join Us?", "Login to create new walk regions!", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Continue",
                    onPress: () => router.navigate("/(settings)/auth"),
                    style: "default",
                  },
                ]);
            }}
          >
            <FontAwesome
              name="plus"
              size={24}
              color={Colors[theme].background}
            />
          </TouchableOpacity>
          {enabledRegionEdit ? (
            <TouchableOpacity
              key={2}
              style={{ ...styles.addPath }}
              onPress={() => {
                if (region.length > 0) {
                  const newP = [...region];
                  newP.pop();
                  setRegion(newP);
                }
              }}
            >
              <MaterialCommunityIcons
                name="restore"
                size={24}
                color={Colors[theme].background}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {enabledRegionEdit ? (
          <View style={styles.menuRow}>
            <TouchableOpacity
              key={3}
              style={{ ...styles.addPath }}
              onPress={() => {
                setRegion([]);
                setEnabledRegionEdit(false);
              }}
            >
              <Feather name="x" size={24} color={Colors[theme].background} />
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              style={{ ...styles.addPath }}
              onPress={() => {
                if (region.length !== 4)
                  Alert.alert(
                    "Incomplete Region",
                    "Your region must be exactly 4 corners.",
                    [{ text: "Ok" }]
                  );
                else handleSaveRegion(); //setOpenDogEntryModal(true);
              }}
            >
              {isPending ? (
                <ActivityIndicator color={Colors[theme].text} size="small" />
              ) : (
                <FontAwesome
                  name="cloud-upload"
                  size={20}
                  color={Colors[theme].background}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>

      <AlertModal
        visible={regionAlert && !prefersNoHelp}
        setVisible={setRegionAlert}
      >
        <View style={styles.alert}>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text style={styles.title}>How to add a region?</Text>
          </View>
          <View style={{ width: "100%", alignItems: "flex-start", gap: 10 }}>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <FontAwesome
                  name="plus"
                  size={24}
                  color={Colors[theme].background}
                />
              </View>
              <Text style={styles.text}>Enter EDIT mode.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <MaterialCommunityIcons
                  name="restore"
                  size={24}
                  color={Colors[theme].background}
                />
              </View>
              <Text style={styles.text}>Undo last change.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <Feather name="x" size={24} color={Colors[theme].background} />
              </View>
              <Text style={styles.text}>Exit EDIT mode.</Text>
            </View>
            <View style={styles.helpItem}>
              <View style={styles.addPath}>
                <FontAwesome
                  name="cloud-upload"
                  size={20}
                  color={Colors[theme].background}
                />
              </View>
              <Text style={styles.text}>Save the new region.</Text>
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

      {/* <DogEntryModal
        visible={openDogEntryModal}
        setVisible={setOpenDogEntryModal}
        callBackSave={handleSaveRegion}
      /> */}

      <LoadingModal visible={loadingLocation} />
    </View>
  );
}
