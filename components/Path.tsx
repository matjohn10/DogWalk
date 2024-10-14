import { LatLng, Polyline } from "react-native-maps";

interface props {
  id: string;
  coords: LatLng[];
  width: number;
  color: string;
}

const Path = ({ id, coords, width, color }: props) => {
  const handlePress = () => {
    console.log(id);
  };
  return (
    <Polyline
      coordinates={coords}
      strokeWidth={width}
      strokeColor={color}
      onPress={handlePress}
    />
  );
};

export default Path;
