import { supabase } from "@/lib/supabase";
import { Path, Paths } from "@/types/paths";
import { dateString } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Crypto from 'expo-crypto';

export function usePaths(id: string | undefined) {
  return useQuery({
    queryKey: ["paths", id],
    queryFn: async () => {
        if (!id) return [];
        const {data, error} = await supabase.from("paths").select("coordinates (latitude, longitude, index)").eq("walker_id", id);
        if (error || !data) {
            console.error(error)
            return [];
        };
        const d = data.map(p => p.coordinates.sort((a, b) => a.index - b.index)) as Paths;
        // console.log("DATA:", d);
        return d;
    },
  });
}

export function useSavePath() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: { id: string; path: Path }) {
    const pathId = Crypto.randomUUID();
      const error  = await supabase.from("paths").insert({id: pathId, walker_id: data.id, created_at: dateString()})
      if (error.error) console.log("Path add:", error.error);
    
      const toUpload = data.path.map((p, i) => {
        return {...p, path_id: pathId, index: i}
      })
      const res = await supabase.from("coordinates").insert(toUpload)
      if (res.error) console.log("Coords add:", res.error);
    
    },
    async onSuccess(_, data) {
        await queryClient.invalidateQueries({ queryKey: ["paths", data.id] });
    },
  });
}
