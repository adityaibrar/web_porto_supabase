"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Portfolio Admin</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content and settings
        </p>
      </div>
      <Link href="/">
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Button>
      </Link>
    </div>
  );
}
