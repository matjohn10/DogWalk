import SearchInput from "@/components/SearchInput";
import { Colors } from "@/constants/Colors";
import Data from "@/constants/Data";
import { useSaveDog } from "@/queries/dogs-queries";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const DogForm = () => {
  const [breed, setBreed] = useState("");
  const [breedVisible, setBreedVisible] = useState(false);
  const [size, setSize] = useState("");
  const [sizeVisible, setSizeVisible] = useState(false);
  const [personality, setPersonality] = useState("");
  const [personalityVisible, setPersonalityVisible] = useState(false);
  const [walkTime, setWalkTime] = useState("");
  const [walkTimeVisible, setWalkTimeVisible] = useState(false);
  const [alone, setAlone] = useState(false);
  const local = useLocalSearchParams();
  const { mutateAsync: saveDog, isPending } = useSaveDog();

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      width: "100%",
      padding: 20,
      paddingTop: 30,
      borderRadius: 5,
      backgroundColor: Colors[theme].background,
      alignItems: "flex-start",
      gap: 15,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: Colors[theme].text,
      marginBottom: 10,
    },
    header: {
      fontSize: 17,
      fontWeight: "500",
      color: Colors[theme].text,
    },
    headerBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    itemBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: 10,
      backgroundColor: Colors[theme].shade,
      borderRadius: 5,
      padding: 10,
    },
    btn: {
      width: "33%",
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: Colors[theme].text,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      fontSize: 17,
      fontWeight: "500",
      color: Colors[theme].background,
    },
    selectedText: {
      fontSize: 15,
      fontWeight: "400",
      color: Colors[theme].text,
      opacity: 0.5,
      marginLeft: 20,
    },
  });

  const handleSave = async () => {
    await saveDog({
      walk_time: walkTime,
      personality,
      size,
      breed,
      alone,
      region_id: typeof local.dog === "string" ? local.dog : local.dog[0],
    });

    router.back();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors[theme].background }}
    >
      <View style={styles.main}>
        <Text style={styles.title}>Share Your Dog Walk</Text>
        <TouchableOpacity
          onPress={() => setBreedVisible(true)}
          style={styles.itemBox}
        >
          <View style={{ gap: 5 }}>
            <View style={styles.headerBox}>
              <FontAwesome5 name="dog" size={20} color={Colors[theme].text} />
              <Text style={styles.header}>Breed</Text>
            </View>
            <Text style={styles.selectedText}>
              {!breed ? "Not selected" : breed}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setBreedVisible(true)}>
            <FontAwesome
              name="chevron-right"
              size={20}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSizeVisible(true)}
          style={styles.itemBox}
        >
          <View style={{ gap: 5 }}>
            <View style={styles.headerBox}>
              <FontAwesome5
                name="weight"
                size={20}
                color={Colors[theme].text}
              />
              <Text style={styles.header}>Size</Text>
            </View>
            <Text style={styles.selectedText}>
              {!size ? "Not selected" : size}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setSizeVisible(true)}>
            <FontAwesome
              name="chevron-right"
              size={20}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPersonalityVisible(true)}
          style={styles.itemBox}
        >
          <View style={{ gap: 5 }}>
            <View style={styles.headerBox}>
              <FontAwesome5 name="bone" size={20} color={Colors[theme].text} />
              <Text style={styles.header}>Personality</Text>
            </View>
            <Text style={styles.selectedText}>
              {!personality ? "Not selected" : personality}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setPersonalityVisible(true)}>
            <FontAwesome
              name="chevron-right"
              size={20}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setWalkTimeVisible(true)}
          style={styles.itemBox}
        >
          <View style={{ gap: 5 }}>
            <View style={styles.headerBox}>
              <FontAwesome5 name="clock" size={20} color={Colors[theme].text} />
              <Text style={styles.header}>Walk Time</Text>
            </View>
            <Text style={styles.selectedText}>
              {!walkTime ? "Not selected" : walkTime}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setWalkTimeVisible(true)}>
            <FontAwesome
              name="chevron-right"
              size={20}
              color={Colors[theme].text}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.itemBox}>
          <Text style={styles.header}>Prefers Walking Alone</Text>
          <Checkbox value={alone} onValueChange={setAlone} />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ ...styles.btn, backgroundColor: Colors.light.destructive }}
            onPress={() => router.back()}
          >
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSave}
            disabled={!breed || !size || !personality || !walkTime}
            touchSoundDisabled={!breed || !size || !personality || !walkTime}
          >
            {isPending ? (
              <ActivityIndicator color={Colors[theme].text} size="small" />
            ) : (
              <Text style={styles.btnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <SearchInput
        data={Data.breeds.map((b) => {
          return { key: b, value: b };
        })}
        title="Select Your Breed"
        visible={breedVisible}
        setVisible={setBreedVisible}
        setSelected={setBreed}
      />
      <SearchInput
        data={Data.sizes}
        title="Select Your Size"
        visible={sizeVisible}
        setVisible={setSizeVisible}
        setSelected={setSize}
      />
      <SearchInput
        data={Data.personalities.map((p) => {
          return { key: p, value: p };
        })}
        title="Select Your Personality"
        visible={personalityVisible}
        setVisible={setPersonalityVisible}
        setSelected={setPersonality}
      />
      <SearchInput
        data={Data.walkTimes}
        title="Select Your Walk Time"
        visible={walkTimeVisible}
        setVisible={setWalkTimeVisible}
        setSelected={setWalkTime}
      />
    </SafeAreaView>
  );
};

export default DogForm;
