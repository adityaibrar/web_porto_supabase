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
import { Trash2, Edit, Award, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";
import Image from "next/image";
import { Certificate } from "@/types/types";
import { revalidateHomePage } from "@/lib/actions/actions";

const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  expiry_date: z.string().optional(),
  credential_id: z.string().optional(),
  credential_url: z.string().url().optional().or(z.literal("")),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

interface CertificatesManagerProps {
  certificates: Certificate[];
  onCertificatesUpdate: (certificates: Certificate[]) => void;
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

export function CertificatesManager({
  certificates,
  onCertificatesUpdate,
}: CertificatesManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
  });

  const onSubmit = async (data: CertificateFormData) => {
    setLoading(true);
    try {
      let imageUrl = editingCertificate?.image_url || "";

      // Upload image if selected
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile, "certificates");
        if (uploadResult.error) {
          toast.error(`Image upload failed: ${uploadResult.error}`);
          return;
        }
        imageUrl = uploadResult.url;
      }

      const certificateData = {
        ...data,
        image_url: imageUrl,
        credential_id: data.credential_id || "",
      };

      let result;
      if (editingCertificate) {
        result = await supabase
          .from("certificates")
          .update(certificateData)
          .eq("id", editingCertificate.id)
          .select();
      } else {
        result = await supabase
          .from("certificates")
          .insert([certificateData])
          .select();
      }

      if (result.error) throw result.error;

      // Refresh certificates list
      const { data: updatedCertificates } = await supabase
        .from("certificates")
        .select("*")
        .order("issue_date", { ascending: false });

      if (updatedCertificates) {
        onCertificatesUpdate(updatedCertificates);
      }
      await revalidateHomePage();

      reset();
      setEditingCertificate(null);
      setImageFile(null);
      toast.success(
        editingCertificate
          ? "Certificate updated successfully!"
          : "Certificate added successfully!"
      );
    } catch (error) {
      console.error("Error saving certificate:", error);
      toast.error("Failed to save certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCertificate(cert);
    reset({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      expiry_date: cert.expiry_date || "",
      credential_id: cert.credential_id || "",
      credential_url: cert.credential_url || "",
    });
  };

  const handleDelete = async (certId: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", certId);

      if (error) throw error;
      await revalidateHomePage();

      const updatedCertificates = certificates.filter(
        (cert) => cert.id !== certId
      );
      onCertificatesUpdate(updatedCertificates);
      toast.success("Certificate deleted successfully!");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Failed to delete certificate");
    }
  };

  const handleCancel = () => {
    setEditingCertificate(null);
    setImageFile(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Certificate Title *</Label>
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
                <Label htmlFor="issuer">Issuer *</Label>
                <Input
                  id="issuer"
                  {...register("issuer")}
                  className={errors.issuer ? "border-red-500" : ""}
                />
                {errors.issuer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.issuer.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="issue_date">Issue Date *</Label>
                <Input
                  id="issue_date"
                  type="date"
                  {...register("issue_date")}
                  className={`${
                    errors.issue_date ? "border-red-500" : ""
                  } date-input-white-icon`}
                />
                {errors.issue_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.issue_date.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="expiry_date">Expiry Date (Optional)</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  {...register("expiry_date")}
                  className="date-input-white-icon"
                />
              </div>

              <div>
                <Label htmlFor="credential_id">Credential ID</Label>
                <Input id="credential_id" {...register("credential_id")} />
              </div>

              <div>
                <Label htmlFor="credential_url">Credential URL</Label>
                <Input
                  id="credential_url"
                  {...register("credential_url")}
                  className={errors.credential_url ? "border-red-500" : ""}
                />
                {errors.credential_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.credential_url.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="image">Certificate Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {editingCertificate?.image_url && (
                <div className="mt-2">
                  <Image
                    width={32}
                    height={20}
                    src={editingCertificate.image_url}
                    alt="Current certificate image"
                    className="w-32 h-20 object-cover rounded"
                    blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingCertificate ? "Update" : "Add"}{" "}
                Certificate
              </Button>
              {editingCertificate && (
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
          <CardTitle>Certificates List ({certificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-3 ${colorScheme.bg} rounded-lg`}>
                      <Award className={`w-6 h-6 ${colorScheme.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}
                        >
                          {new Date(cert.issue_date).getFullYear()}
                        </Badge>
                        {cert.credential_url && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-6 px-2"
                          >
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cert)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cert.id)}
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
