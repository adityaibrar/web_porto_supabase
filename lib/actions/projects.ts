'use server'

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase"

export async function getProjects() {
    const result = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    return JSON.parse(JSON.stringify(result.data));
}

export async function addOrUpdateProject(data: ProjectData, editingId: string | null) {
    try {
        let result;
        if (editingId) {
            // Logic untuk UPDATE
            result = await supabase
                .from("projects")
                .update(data)
                .eq("id", editingId)
                .select();
        } else {
            // Logic untuk INSERT
            result = await supabase.from("projects").insert([data]).select();
        }

        if (result.error) {
            throw result.error;
        }

        // Revalidasi setelah database berhasil diubah
        revalidatePath("/");

        return { success: true, data: result.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteProject(projectId: string) {
    try {
        const { error } = await supabase.from("projects").delete().eq("id", projectId);

        if (error) {
            throw error;
        }

        // Revalidasi setelah database berhasil diubah
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
