import { router } from "expo-router";
import { LatLng, Polygon } from "react-native-maps";

interface props {
  id: string;
  coords: LatLng[];
  width: number;
  color: string;
}

const RegionMap = ({ id, coords, width, color }: props) => {
  const handlePress = () => {
    router.navigate(`/region?id=${id}`);
  };
  return (
    <Polygon
      coordinates={coords}
      strokeWidth={width}
      strokeColor={color}
      fillColor="rgba(155,155,155,0.6)"
      onPress={handlePress}
    />
  );
};

export default RegionMap;
