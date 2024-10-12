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
};

const authContext = createContext<Auth>({
  session: null,
  isLoading: true,
  userRegion: OFFLINE_REGION,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState<Region>(OFFLINE_REGION);

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
        const lastKnown = await Location.getLastKnownPositionAsync();
        if (!lastKnown) setUserRegion(OFFLINE_REGION);
        else {
          const region: Region = {
            latitude: lastKnown.coords.latitude,
            longitude: lastKnown.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setUserRegion(region);
        }
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setUserRegion(region);
    })();
  }, []);

  return (
    <authContext.Provider value={{ session, isLoading, userRegion }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(authContext);
