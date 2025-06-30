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
import { Trash2, Edit, GraduationCap } from "lucide-react";
import { supabase, type Database } from "@/lib/supabase";

type Education = Database["public"]["Tables"]["education"]["Row"];

const educationSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field_of_study: z.string().min(1, "Field of study is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  gpa: z.number().min(0).max(4).optional(),
  description: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationManagerProps {
  education: Education[];
  onEducationUpdate: (education: Education[]) => void;
}

const colorSchemes = [
  { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
  { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
];

export function EducationManager({ education, onEducationUpdate }: EducationManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit = async (data: EducationFormData) => {
    setLoading(true);
    try {
      const educationData = {
        ...data,
        gpa: data.gpa || null,
        description: data.description || "",
      };

      let result;
      if (editingEducation) {
        result = await supabase
          .from("education")
          .update(educationData)
          .eq("id", editingEducation.id)
          .select();
      } else {
        result = await supabase.from("education").insert([educationData]).select();
      }

      if (result.error) throw result.error;

      // Refresh education list
      const { data: updatedEducation } = await supabase
        .from("education")
        .select("*")
        .order("start_date", { ascending: false });

      if (updatedEducation) {
        onEducationUpdate(updatedEducation);
      }

      reset();
      setEditingEducation(null);
      toast.success(
        editingEducation ? "Education updated successfully!" : "Education added successfully!"
      );
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error("Failed to save education");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    reset({
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study,
      start_date: edu.start_date,
      end_date: edu.end_date || "",
      gpa: edu.gpa || undefined,
      description: edu.description || "",
    });
  };

  const handleDelete = async (eduId: string) => {
    if (!confirm("Are you sure you want to delete this education?")) return;

    try {
      const { error } = await supabase.from("education").delete().eq("id", eduId);

      if (error) throw error;

      const updatedEducation = education.filter((edu) => edu.id !== eduId);
      onEducationUpdate(updatedEducation);
      toast.success("Education deleted successfully!");
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete education");
    }
  };

  const handleCancel = () => {
    setEditingEducation(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingEducation ? "Edit Education" : "Add New Education"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  {...register("institution")}
                  className={errors.institution ? "border-red-500" : ""}
                />
                {errors.institution && (
                  <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="degree">Degree *</Label>
                <Input
                  id="degree"
                  {...register("degree")}
                  className={errors.degree ? "border-red-500" : ""}
                />
                {errors.degree && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="field_of_study">Field of Study *</Label>
                <Input
                  id="field_of_study"
                  {...register("field_of_study")}
                  className={errors.field_of_study ? "border-red-500" : ""}
                />
                {errors.field_of_study && (
                  <p className="text-red-500 text-sm mt-1">{errors.field_of_study.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="gpa">GPA (0-4)</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  {...register("gpa", { valueAsNumber: true })}
                  className={errors.gpa ? "border-red-500" : ""}
                />
                {errors.gpa && (
                  <p className="text-red-500 text-sm mt-1">{errors.gpa.message}</p>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                {...register("description")}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingEducation ? "Update" : "Add"} Education
              </Button>
              {editingEducation && (
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
          <CardTitle>Education List ({education.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {education.map((edu, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <div
                  key={edu.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 ${colorScheme.bg} rounded-lg`}>
                      <GraduationCap className={`w-6 h-6 ${colorScheme.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{edu.degree}</h3>
                          <p className={`font-medium ${colorScheme.text}`}>{edu.institution}</p>
                          <p className="text-muted-foreground">{edu.field_of_study}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} mb-2`}>
                            {new Date(edu.start_date).getFullYear()} -{" "}
                            {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}
                          </Badge>
                          {edu.gpa && (
                            <div>
                              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                                GPA: {edu.gpa}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      {edu.description && (
                        <p className="text-muted-foreground">{edu.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(edu)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(edu.id)}
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