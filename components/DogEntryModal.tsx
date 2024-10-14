import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useState } from "react";
import Data from "@/constants/Data";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SearchInput from "./SearchInput";
import Checkbox from "expo-checkbox";
import { useSaveDog } from "@/queries/dogs-queries";

interface props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callBackSave: () => void;
}

const DogEntryModal = ({ visible, setVisible, callBackSave }: props) => {
  const [breed, setBreed] = useState("");
  const [breedVisible, setBreedVisible] = useState(false);
  const [size, setSize] = useState("");
  const [sizeVisible, setSizeVisible] = useState(false);
  const [personality, setPersonality] = useState("");
  const [personalityVisible, setPersonalityVisible] = useState(false);
  const [walkTime, setWalkTime] = useState("");
  const [walkTimeVisible, setWalkTimeVisible] = useState(false);
  const [alone, setAlone] = useState(false);

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
      borderWidth: 1,
      borderColor: "white",
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
    callBackSave();

    //TODO: Save the questionnaire data
  };

  return (
    <Modal isVisible={visible}>
      <></>
    </Modal>
  );
};

export default DogEntryModal;
