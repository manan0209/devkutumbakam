"use client";

import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useParams } from "next/navigation";

export default function PortalPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <PortalDashboard portalId={id} />
      </main>
      <SiteFooter />
    </div>
  );
}
