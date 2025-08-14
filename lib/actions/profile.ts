'use server'
import { supabase } from "../supabase";

export async function getProfile() {
    const result = await supabase.from("profile").select("*").single();
    return JSON.parse(JSON.stringify(result.data));
}

export async function getStats() {
    const result = await supabase.rpc("get_portfolio_stats");
    return JSON.parse(JSON.stringify(result.data[0]));
}