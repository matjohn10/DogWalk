import { Colors } from "@/constants/Colors";
import { Data } from "@/constants/Data";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Modal,
  FlatList,
  StyleProp,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface props {
  data: Data[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
}

const SearchItem = ({
  name,
  textStyle,
  setSelected,
}: {
  name: string;
  textStyle: StyleProp<TextStyle>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TouchableOpacity
      style={{ width: "100%", padding: 10 }}
      onPress={() => setSelected(name)}
    >
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const SearchInput = ({
  data,
  setSelected,
  title,
  visible,
  setVisible,
  placeholder,
}: props) => {
  const [inputText, setInputText] = useState("");

  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    main: {
      width: "100%",
      height: "100%",
      gap: 10,
      alignItems: "center",
      backgroundColor: Colors[theme].background,
      padding: 10,
      paddingTop: "15%",
    },
    search: {
      flexDirection: "row",
      width: "100%",
      height: 40,
      gap: 10,
      alignItems: "center",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: Colors[theme].text,
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      color: Colors[theme].text,
    },
    input: {
      color: Colors[theme].text,
      width: "90%",
    },
    list: {
      width: "100%",
    },
  });
  return (
    <Modal visible={visible}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <FontAwesome
              name="close"
              size={24}
              color={Colors[theme].destructive}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          horizontal={false}
          data={data.filter((d) =>
            d.key.toLowerCase().includes(inputText.toLowerCase())
          )}
          ListHeaderComponent={
            <View style={styles.search}>
              <View
                style={{
                  width: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="search"
                  size={12}
                  color={Colors[theme].text}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder={!placeholder ? "Search..." : placeholder}
                value={inputText}
                onChangeText={setInputText}
              />
            </View>
          }
          renderItem={(i) => (
            <TouchableOpacity
              style={{
                width: "100%",
                padding: 10,
              }}
              onPress={() => {
                setSelected(i.item.value);
                setVisible(false);
              }}
            >
              <Text style={styles.text}>{i.item.key}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default SearchInput;
