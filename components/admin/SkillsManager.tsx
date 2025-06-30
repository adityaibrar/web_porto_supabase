"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Edit, Plus } from "lucide-react";
import { supabase, type Database } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";

type Skill = Database["public"]["Tables"]["skills"]["Row"];

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface SkillsManagerProps {
  skills: Skill[];
  onSkillsUpdate: (skills: Skill[]) => void;
}

export function SkillsManager({ skills, onSkillsUpdate }: SkillsManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
  });

  const onSubmit = async (data: SkillFormData) => {
    setLoading(true);
    try {
      let iconUrl = editingSkill?.icon_url || "";

      // Upload icon if selected
      if (iconFile) {
        const uploadResult = await uploadFile(iconFile, "skills");
        if (uploadResult.error) {
          toast.error(`Icon upload failed: ${uploadResult.error}`);
          return;
        }
        iconUrl = uploadResult.url;
      }

      const skillData = {
        ...data,
        icon_url: iconUrl,
      };

      let result;
      if (editingSkill) {
        result = await supabase
          .from("skills")
          .update(skillData)
          .eq("id", editingSkill.id)
          .select();
      } else {
        result = await supabase.from("skills").insert([skillData]).select();
      }

      if (result.error) throw result.error;

      // Refresh skills list
      const { data: updatedSkills } = await supabase
        .from("skills")
        .select("*")
        .order("name");

      if (updatedSkills) {
        onSkillsUpdate(updatedSkills);
      }

      reset();
      setEditingSkill(null);
      setIconFile(null);
      toast.success(
        editingSkill
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
    } catch (error) {
      console.error("Error saving skill:", error);
      toast.error("Failed to save skill");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    reset({
      name: skill.name,
      category: skill.category,
    });
  };

  const handleDelete = async (skillId: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", skillId);

      if (error) throw error;

      const updatedSkills = skills.filter((skill) => skill.id !== skillId);
      onSkillsUpdate(updatedSkills);
      toast.success("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill");
    }
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setIconFile(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  {...register("category")}
                  className={errors.category ? "border-red-500" : ""}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="icon">Skill Icon</Label>
              <Input
                id="icon"
                type="file"
                accept="image/*"
                onChange={(e) => setIconFile(e.target.files?.[0] || null)}
              />
              {editingSkill?.icon_url && (
                <div className="mt-2">
                  <img
                    src={editingSkill.icon_url}
                    alt="Current icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingSkill ? "Update" : "Add"} Skill
              </Button>
              {editingSkill && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills List ({skills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {skill.icon_url ? (
                    <img
                      src={skill.icon_url}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(skill)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(skill.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
