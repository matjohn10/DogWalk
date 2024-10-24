import DogItem from "@/components/DogItem";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { useDogs } from "@/queries/dogs-queries";
import { Personality, Size, WalkTime } from "@/types/dogs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

const region = () => {
  const { session } = useAuth();
  const local = useLocalSearchParams();
  const region_id = typeof local.id === "string" ? local.id : local.id[0];

  // TODO: If needed, make a filter
  // const [persFilter, setPersFilter] = useState<Personality[]>([]);
  // const [sizeFilter, setSizeFilter] = useState<Size[]>([]);
  // const [walkTimeFilter, setwalkTimeFilter] = useState<WalkTime[]>([]);
  // const [aloneFilter, setAloneFilter] = useState<boolean | null>(null);

  const { data: dogs } = useDogs(region_id);

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      backgroundColor: Colors[theme].background,
      flex: 1,
      padding: 20,
    },
    titleBox: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      color: Colors[theme].text,
      fontWeight: "700",
    },
    text: {
      fontSize: 18,
      color: Colors[theme].text,
      fontWeight: "400",
    },
    filters: {
      width: "100%",
      paddingVertical: 10,
      marginVertical: 15,
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Dogs in the region</Text>
        <TouchableOpacity
          onPress={() => {
            if (!session)
              Alert.alert(
                "Join Us!",
                "Login to share your dog and walk information",
                [{ text: "Ok" }]
              );
            else router.navigate(`/${region_id}`);
          }}
        >
          <FontAwesome name="plus" size={24} color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      {/* TODO: FILTERS */}

      {/* <View style={styles.filters}>
        <TouchableOpacity>
          <FontAwesome5 name="filter" size={20} color={Colors[theme].text} />
        </TouchableOpacity>
        <FlatList data={[...persFilter, ...sizeFilter, ...walkTimeFilter]} />
      </View> */}

      <FlatList
        data={dogs}
        contentContainerStyle={{ gap: 10 }}
        renderItem={(i) => <DogItem dog={i.item} />}
        keyExtractor={(i) => i.id}
      />
    </View>
  );
};

export default region;
