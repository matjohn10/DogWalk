import SettingsBtn from "@/components/SettingsBtn";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";

export default function Index() {
  const [path, setPath] = useState<LatLng[]>([]);

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
  });
  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        loadingEnabled
        loadingIndicatorColor={Colors[theme].text}
        onPress={(c) => setPath([...path, c.nativeEvent.coordinate])}
        onPanDrag={() => console.log("Pan")}
      >
        <Polyline coordinates={path} strokeWidth={5} strokeColor="white" />
      </MapView>
      <SettingsBtn />
    </View>
  );
}
