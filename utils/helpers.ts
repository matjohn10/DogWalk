import Data from "@/constants/Data";
import { LatLng } from "react-native-maps";

export function dateString() {
    return new Date().toISOString();
}

export function CoordAvg(path: LatLng[]): {latitude: number; longitude: number} {
    let lats = 0
    let longs = 0
    path.forEach(c => {
    lats += c.latitude
    longs += c.longitude
    })
    return {latitude: lats/path.length, longitude: longs/path.length}
}

export function Distance(coord: LatLng) {
    const TEST: LatLng = {"latitude": 43.670237899114746, "longitude": -79.38675000293357};
    const threshold = 0.00002;
    const result = {latitude: TEST.latitude/coord.latitude, longitude: TEST.longitude/coord.longitude};
    return {lat: Math.abs(1-result.latitude), long: Math.abs(1-result.longitude)}
}

export function RandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetColorFromThemes(name: string): string {
    const keys = Object.keys(Data.themes);
    for (let i = 0; i < Data.themes.seasons.length; i++) {
        const theme = Data.themes.seasons[i]
        if (theme.name === name) return theme.colors[RandomNumber(0, 3)]
    }
    for (let i = 0; i < Data.themes.colors.length; i++) {
        const theme = Data.themes.colors[i]
        if (theme.name === name) return theme.colors[RandomNumber(0, 3)]
    }
    for (let i = 0; i < Data.themes.environment.length; i++) {
        const theme = Data.themes.environment[i]
        if (theme.name === name) return theme.colors[RandomNumber(0, 3)]
    }
    console.error("Found no color")
    return "#FFFFFF"
}