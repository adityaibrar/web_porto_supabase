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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Trash2, Edit, FolderOpen, ExternalLink, Github } from "lucide-react";
import { supabase, type Database } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";
import Image from "next/image";

type Project = Database["public"]["Tables"]["projects"]["Row"];

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().min(1, "Technologies are required"),
  github_url: z.string().url().optional().or(z.literal("")),
  live_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectsManagerProps {
  projects: Project[];
  onProjectsUpdate: (projects: Project[]) => void;
}

const colorSchemes = [
  { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
  {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
];

export function ProjectsManager({
  projects,
  onProjectsUpdate,
}: ProjectsManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const featured = watch("featured");

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    try {
      let imageUrl = editingProject?.image_url || "";

      // Upload image if selected
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile, "projects");
        if (uploadResult.error) {
          toast.error(`Image upload failed: ${uploadResult.error}`);
          return;
        }
        imageUrl = uploadResult.url;
      }

      const projectData = {
        ...data,
        technologies: data.technologies.split(",").map((tech) => tech.trim()),
        image_url: imageUrl,
      };

      let result;
      if (editingProject) {
        result = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id)
          .select();
      } else {
        result = await supabase.from("projects").insert([projectData]).select();
      }

      if (result.error) throw result.error;

      // Refresh projects list
      const { data: updatedProjects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (updatedProjects) {
        onProjectsUpdate(updatedProjects);
      }

      reset();
      setEditingProject(null);
      setImageFile(null);
      toast.success(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      featured: project.featured,
    });
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      onProjectsUpdate(updatedProjects);
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setImageFile(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingProject ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="technologies">
                  Technologies (comma separated) *
                </Label>
                <Input
                  id="technologies"
                  placeholder="Flutter, Dart, Firebase, etc."
                  {...register("technologies")}
                  className={errors.technologies ? "border-red-500" : ""}
                />
                {errors.technologies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.technologies.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  {...register("github_url")}
                  className={errors.github_url ? "border-red-500" : ""}
                />
                {errors.github_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.github_url.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="live_url">Live Demo URL</Label>
                <Input
                  id="live_url"
                  {...register("live_url")}
                  className={errors.live_url ? "border-red-500" : ""}
                />
                {errors.live_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.live_url.message}
                  </p>
                )}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {editingProject?.image_url && (
                <div className="mt-2">
                  <Image
                    width={32}
                    height={20}
                    src={editingProject.image_url}
                    alt="Current project image"
                    className="w-32 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setValue("featured", !!checked)}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingProject ? "Update" : "Add"}{" "}
                Project
              </Button>
              {editingProject && (
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
          <CardTitle>Projects List ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <div
                  key={project.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      width={20}
                      height={32}
                      src={
                        project.image_url ||
                        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500"
                      }
                      alt={project.title}
                      className="w-full h-32 object-cover"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <FolderOpen className={`w-6 h-6 ${colorScheme.text}`} />
                      <div className="flex space-x-2">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
