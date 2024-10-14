import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Region } from "react-native-maps";
import * as Location from "expo-location";

const OFFLINE_REGION = {
  latitude: 45.25238305839279,
  latitudeDelta: 21.254501064083136,
  longitude: -75.96242455969343,
  longitudeDelta: 15.432453340713849,
};

type Auth = {
  session: Session | null;
  isLoading: boolean;
  userRegion: Region;
  loadingLocation: boolean;
};

const authContext = createContext<Auth>({
  session: null,
  isLoading: true,
  userRegion: OFFLINE_REGION,
  loadingLocation: true,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState<Region>(OFFLINE_REGION);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("AuthProvider:", error);
      setSession(data.session);
      setIsLoading(false);
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserRegion(OFFLINE_REGION);
        setLoadingLocation(false);
        return;
      }

      const lastKnown = await Location.getLastKnownPositionAsync();
      if (!lastKnown) {
        setUserRegion(OFFLINE_REGION);
        setLoadingLocation(false);
      } else {
        const lastRegion: Region = {
          latitude: lastKnown.coords.latitude,
          longitude: lastKnown.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setUserRegion(lastRegion);
        setLoadingLocation(false);
      }

      let location = await Location.getCurrentPositionAsync({});
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setUserRegion(region);
      setLoadingLocation(false);
    })();
  }, []);

  return (
    <authContext.Provider
      value={{ session, isLoading, userRegion, loadingLocation }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(authContext);
