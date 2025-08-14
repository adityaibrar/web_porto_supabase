'use server'

import { supabase } from "../supabase"

export async function getExperience() {
    const result = await supabase
            .from("experience")
            .select("*")
            .order("start_date", { ascending: false });

    return JSON.parse(JSON.stringify(result.data));
}