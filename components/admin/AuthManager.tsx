"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Key, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function AuthManager() {
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPasswordChange = async (data: ChangePasswordFormData) => {
    setLoading(true);
    try {
      // First verify current password by trying to sign in
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.email) {
        throw new Error("No user found");
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;

      toast.success("Password changed successfully!");
      reset();
      setShowChangePassword(false);
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security & Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setShowChangePassword(!showChangePassword)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Change Password</span>
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="destructive"
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{loading ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Form */}
      {showChangePassword && (
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitPasswordChange)} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password *</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...register("currentPassword")}
                  className={errors.currentPassword ? "border-red-500" : ""}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="newPassword">New Password *</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Changing..." : "Change Password"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowChangePassword(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}