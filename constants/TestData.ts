import { LatLng } from "react-native-maps";

type Path = LatLng[];

type TestData = {
  paths: Path[];
};

const a = [
  { latitude: 43.668823191705705, longitude: -79.39360782867406 },
  { latitude: 43.668701234174584, longitude: -79.39410962178056 },
  { latitude: 43.66632010883109, longitude: -79.39313413591678 },
  { latitude: 43.66596870561065, longitude: -79.392061747463 },
  { latitude: 43.66490122277202, longitude: -79.39105351907942 },
  { latitude: 43.66392654790337, longitude: -79.39346868437137 },
  { latitude: 43.66602174784476, longitude: -79.39325787303736 },
  { latitude: 43.66956220409009, longitude: -79.39438525576261 },
  { latitude: 43.669930160892946, longitude: -79.39290957579539 },
  { latitude: 43.66909148133843, longitude: -79.3925108672706 },
  { latitude: 43.6688262837171, longitude: -79.39349618151093 },
];

const b: LatLng[] = [];
const c = [
  { latitude: 43.66981311347479, longitude: -79.38645769441047 },
  { latitude: 43.668750602334896, longitude: -79.386183360726 },
  { latitude: 43.66817538170131, longitude: -79.38873917894291 },
  { latitude: 43.66746953566421, longitude: -79.38840928388917 },
  { latitude: 43.6677558941163, longitude: -79.3865931251487 },
  { latitude: 43.66802466795013, longitude: -79.38566247404167 },
  { latitude: 43.66757110321202, longitude: -79.38536653974435 },
  { latitude: 43.66779152758631, longitude: -79.38471021024698 },
  { latitude: 43.668802502383166, longitude: -79.38511455607053 },
];

export default {
  paths: [a, b, c],
} as TestData;
