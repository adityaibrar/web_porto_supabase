'use server'

import { supabase } from "../supabase"

export async function getCertificates() {
    const result = await supabase
        .from("certificates")
        .select("*")
        .order("issue_date", { ascending: false });

    return JSON.parse(JSON.stringify(result.data));
}