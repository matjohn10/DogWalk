import { supabase } from "@/lib/supabase";
import { Region, RegionCoords } from "@/types/regions";
import { CoordAvg, dateString } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// TODO: Filter regions out of a certain predetermined range using avg lat and long
export function useRegions() {
    return useQuery({
      queryKey: ["regions"],
      queryFn: async () => {
          const {data, error} = await supabase.from("regions").select("*");
          if (error || !data) {
              console.error(error)
              return [];
          };
          //data.forEach(p => p.coordinates.sort((a, b) => a.index - b.index));
          console.log("SERVER:", data)
          return data as Region[];
      },
    });
  }

export function useMyRegions(id: string | undefined) {
  return useQuery({
    queryKey: ["regions", id],
    queryFn: async () => {
        if (!id) return [];
        const {data, error} = await supabase.from("regions").select("*").eq("creator_id", id);
        if (error || !data) {
            console.error(error)
            return [];
        };
        console.log(data)
        return data as Region[];
    },
  });
}

export function useSaveRegion() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: { id: string; coords: RegionCoords }) {
      // const coords = JSON.stringify(data.coords);
      const error  = await supabase.from("regions").insert({creator_id: data.id, created_at: dateString(), coordinates: data.coords})
      if (error.error) console.log("Path add:", error.error);
    },
    async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
}
