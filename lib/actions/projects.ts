'use server'

import { supabase } from "../supabase"

export async function getProjects() {
    const result = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    return JSON.parse(JSON.stringify(result.data));
}