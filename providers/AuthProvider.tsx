import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Auth = {
  session: Session | null;
  isLoading: boolean;
};

const authContext = createContext<Auth>({
  session: null,
  isLoading: true,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <authContext.Provider value={{ session, isLoading }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(authContext);
