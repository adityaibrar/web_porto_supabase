"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Profile } from "@/app/page";

interface DemoDataNoticeProps {
  profile: Profile | null;
}

export function DemoDataNotice({ profile }: DemoDataNoticeProps) {
  if (profile) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="glassmorphism border-yellow-500/50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Demo Mode
          </h3>
          <p className="text-muted-foreground">
            This portfolio is running in demo mode. Connect to Supabase and
            access the admin panel to customize your content.
          </p>
          <Link href="/admin" className="inline-block mt-4">
            <Button variant="outline">Access Admin Panel</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
