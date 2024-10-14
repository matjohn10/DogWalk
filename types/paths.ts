import { LatLng } from "react-native-maps";
import { Database } from "./database.types";

export type Path = LatLng[];
export type Paths = Path[];

export type CoordinateRow = Database["public"]["Tables"]["coordinates"]["Row"];
export type PathsRow = Database["public"]["Tables"]["paths"]["Row"];

export type PathInfo = PathsRow & {
    coordinates: CoordinateRow[];
}
