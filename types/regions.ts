import { LatLng } from "react-native-maps";
import { Database } from "./database.types";

export type RegionCoords = LatLng[];
export type Region = Database["public"]["Tables"]["regions"]["Row"];

export type InsertDog = Database["public"]["Tables"]["dogs"]["Insert"];
