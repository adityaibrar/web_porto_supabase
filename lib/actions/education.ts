'use server'

import { supabase } from "../supabase"

export async function getEducation() {
    const result = await supabase
        .from("education")
        .select("*")
        .order("start_date", { ascending: false });
    return JSON.parse(JSON.stringify(result.data));
}