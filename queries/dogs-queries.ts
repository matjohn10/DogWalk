import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertDog } from "@/types/regions";
import { Dog } from "@/types/dogs";


export function useDogs(region_id: string) {
    return useQuery({
        queryKey: ["dogs", region_id],
        queryFn: async () => {
            const {data, error} = await supabase.from("dogs").select("*").eq("region_id", region_id);
            if (error || !data) return [];
            return data as Dog[];
        }
    })
}

export function useSaveDog() {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: InsertDog) {
            const {error} = await supabase.from("dogs").insert(data);
            if (error) console.error("INSERT DOG:", error);
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries({ queryKey: ["dogs", data.region_id] });
        }
    })
}