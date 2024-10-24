import Data from "@/constants/Data";
import { Database } from "./database.types";

export type Dog = Database["public"]["Tables"]["dogs"]["Row"];
export type Breeds = (typeof Data.breeds)[number];
export type Personality = (typeof Data.personalities)[number];
export type Size = (typeof Data.sizes)[number]["value"];
export type WalkTime = (typeof Data.walkTimes)[number]["value"];
