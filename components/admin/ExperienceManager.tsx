"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Briefcase } from "lucide-react";
import { supabase, type Database } from "@/lib/supabase";

type Experience = Database["public"]["Tables"]["experience"]["Row"];

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().min(1, "Technologies are required"),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperienceManagerProps {
  experience: Experience[];
  onExperienceUpdate: (experience: Experience[]) => void;
}

const colorSchemes = [
  { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
  { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
];

export function ExperienceManager({ experience, onExperienceUpdate }: ExperienceManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit = async (data: ExperienceFormData) => {
    setLoading(true);
    try {
      const experienceData = {
        ...data,
        technologies: data.technologies.split(",").map(tech => tech.trim()),
      };

      let result;
      if (editingExperience) {
        result = await supabase
          .from("experience")
          .update(experienceData)
          .eq("id", editingExperience.id)
          .select();
      } else {
        result = await supabase.from("experience").insert([experienceData]).select();
      }

      if (result.error) throw result.error;

      // Refresh experience list
      const { data: updatedExperience } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });

      if (updatedExperience) {
        onExperienceUpdate(updatedExperience);
      }

      reset();
      setEditingExperience(null);
      toast.success(
        editingExperience ? "Experience updated successfully!" : "Experience added successfully!"
      );
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    reset({
      company: exp.company,
      position: exp.position,
      start_date: exp.start_date,
      end_date: exp.end_date || "",
      description: exp.description,
      technologies: exp.technologies.join(", "),
    });
  };

  const handleDelete = async (expId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const { error } = await supabase.from("experience").delete().eq("id", expId);

      if (error) throw error;

      const updatedExperience = experience.filter((exp) => exp.id !== expId);
      onExperienceUpdate(updatedExperience);
      toast.success("Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience");
    }
  };

  const handleCancel = () => {
    setEditingExperience(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingExperience ? "Edit Experience" : "Add New Experience"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  {...register("company")}
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  {...register("position")}
                  className={errors.position ? "border-red-500" : ""}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  {...register("start_date")}
                  className={errors.start_date ? "border-red-500" : ""}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="end_date">End Date (Leave empty if current)</Label>
                <Input
                  id="end_date"
                  type="date"
                  {...register("end_date")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={3}
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="technologies">Technologies (comma separated) *</Label>
              <Input
                id="technologies"
                placeholder="Flutter, Dart, Firebase, etc."
                {...register("technologies")}
                className={errors.technologies ? "border-red-500" : ""}
              />
              {errors.technologies && (
                <p className="text-red-500 text-sm mt-1">{errors.technologies.message}</p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingExperience ? "Update" : "Add"} Experience
              </Button>
              {editingExperience && (
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
          <CardTitle>Experience List ({experience.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experience.map((exp, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <div
                  key={exp.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 ${colorScheme.bg} rounded-lg`}>
                      <Briefcase className={`w-6 h-6 ${colorScheme.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{exp.position}</h3>
                          <p className={`font-medium ${colorScheme.text}`}>{exp.company}</p>
                        </div>
                        <Badge className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}>
                          {new Date(exp.start_date).getFullYear()} -{" "}
                          {exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(exp)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}