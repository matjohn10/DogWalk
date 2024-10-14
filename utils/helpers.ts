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