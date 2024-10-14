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