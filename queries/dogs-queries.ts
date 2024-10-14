import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";


export function useDogs(path_id: string) {
    return useQuery({
        queryKey: ["dogs", path_id],
        queryFn: async () => {
            const {data, error} = await supabase.from("dogs").select("*").eq("path_id", path_id);
            if (error || !data) return [];
            return data;
        }
    })
}