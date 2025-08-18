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
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";
import { AuthManager } from "@/components/admin/AuthManager";
import Image from "next/image";
import { Profile } from "@/types/types";
import { revalidateHomePage } from "@/lib/actions/actions";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  github_url: z.string().url().optional().or(z.literal("")),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  website_url: z.string().url().optional().or(z.literal("")),
  years_of_experience: z.number().min(0).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: Profile | null;
  onProfileUpdate: (profile: Profile) => void;
}

export function ProfileForm({ profile, onProfileUpdate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      title: profile?.title || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      github_url: profile?.github_url || "",
      linkedin_url: profile?.linkedin_url || "",
      website_url: profile?.website_url || "",
      years_of_experience: profile?.years_of_experience || 0,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      let avatarUrl = profile?.avatar_url || "";

      // Upload avatar if selected
      if (avatarFile) {
        const uploadResult = await uploadFile(avatarFile, "avatars");
        if (uploadResult.error) {
          toast.error(`Avatar upload failed: ${uploadResult.error}`);
          return;
        }
        avatarUrl = uploadResult.url;
      }

      const profileData = {
        ...data,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (profile) {
        result = await supabase
          .from("profile")
          .update(profileData)
          .eq("id", profile.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("profile")
          .insert([profileData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // await revalidateHomePage();

      onProfileUpdate(result.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentication Manager */}
      <AuthManager />

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
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
                <Label htmlFor="title">Professional Title *</Label>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} />
              </div>

              <div>
                <Label htmlFor="years_of_experience">Years of Experience</Label>
                <Input
                  id="years_of_experience"
                  type="number"
                  {...register("years_of_experience", { valueAsNumber: true })}
                />
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
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  {...register("linkedin_url")}
                  className={errors.linkedin_url ? "border-red-500" : ""}
                />
                {errors.linkedin_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.linkedin_url.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  {...register("website_url")}
                  className={errors.website_url ? "border-red-500" : ""}
                />
                {errors.website_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.website_url.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                rows={4}
                {...register("bio")}
                className={errors.bio ? "border-red-500" : ""}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="avatar">Profile Picture</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
              {profile?.avatar_url && (
                <div className="mt-2">
                  <Image
                    width={20}
                    height={20}
                    src={profile.avatar_url}
                    alt="Current avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading
                ? "Saving..."
                : profile
                ? "Update Profile"
                : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
