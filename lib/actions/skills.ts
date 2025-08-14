'use server'

import { supabase } from "../supabase";

export async function getSkills() {
    const result = await supabase.from("skills").select("*").order("name");
    return JSON.parse(JSON.stringify(result.data));
}