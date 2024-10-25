import { Colors } from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { GetColorFromThemes } from "@/utils/helpers";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { LatLng, Polygon } from "react-native-maps";

interface props {
  id: string;
  coords: LatLng[];
  width: number;
}

const RegionMap = ({ id, coords, width }: props) => {
  const { regionTheme } = useAuth();
  const [regionColor, setRegionColor] = useState(
    GetColorFromThemes(regionTheme)
  );
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    setRegionColor(GetColorFromThemes(regionTheme));
  }, [regionTheme]);

  const handlePress = () => {
    router.navigate(`/region?id=${id}`);
  };
  // TODO: Prevent regions from overlapping
  return (
    <Polygon
      coordinates={coords}
      strokeWidth={width}
      strokeColor={regionTheme === "default" ? Colors[theme].text : regionColor}
      fillColor={
        regionTheme === "default"
          ? Colors[theme].text + "50"
          : regionColor + "50"
      }
      onPress={handlePress}
    />
  );
};

export default RegionMap;
