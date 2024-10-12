import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useGetData, useStoreData } from "@/lib/asyncStorage";
import { Paths } from "@/types/paths";
import * as Crypto from "expo-crypto";
import { dateString } from "@/utils/helpers";
import { useSavePath } from "@/queries/path-queries";

const settings = () => {
  const { session } = useAuth();
  const { data: localPaths } = useGetData("paths");
  const { mutateAsync: storeData } = useStoreData();
  const { mutateAsync: savePath, isPending } = useSavePath();
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
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: "gray",
      width: "100%",
      gap: 5,
      paddingVertical: 5,
    },
    contentItem: {
      width: "100%",
      paddingVertical: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemText: {
      color: Colors[theme].text,
      fontSize: 16,
      fontWeight: "400",
    },
  });

  const handleShareLocalPaths = async () => {
    if (!!localPaths && !!session) {
      const paths = JSON.parse(localPaths) as Paths;
      // const pathIds = paths.map((p) => {
      //   return {
      //     id: Crypto.randomUUID(),
      //     walker_id: session?.user.id,
      //     created_at: dateString(),
      //   };
      // });
      for (let path of paths) {
        await savePath({ id: session.user.id, path });
      }

      storeData({ key: "paths", value: "" });
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.block}>
        <Text style={styles.blockHeader}>General</Text>
        <View style={styles.blockContent}>
          {!!session ? (
            <TouchableOpacity
              onPress={() => console.log("Profile - show fun stats")}
              style={styles.contentItem}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons
                  name="person"
                  size={24}
                  color={Colors[theme].text}
                />
                <Text style={styles.itemText}>Profile</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
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
          {!!session && !!localPaths ? (
            <TouchableOpacity
              onPress={handleShareLocalPaths}
              style={styles.contentItem}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {isPending ? (
                  <ActivityIndicator color={Colors[theme].text} size="small" />
                ) : (
                  <MaterialIcons
                    name="ios-share"
                    size={24}
                    color={Colors[theme].text}
                  />
                )}
                <Text style={styles.itemText}>Share your paths</Text>
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
          <TouchableOpacity onPress={() => {}} style={styles.contentItem}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={24}
                color={Colors[theme].text}
              />
              <Text style={styles.itemText}>Change Units</Text>
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
