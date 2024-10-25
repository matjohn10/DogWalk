import { supabase } from "@/lib/supabase"
import { useMutation } from "@tanstack/react-query"

export const useSendFeedback = () => {
    return useMutation({
        async mutationFn(data: {subject: string; body: string; sender: string | null}) {
            await supabase.from("feedback").insert(data);
        }
    })
}