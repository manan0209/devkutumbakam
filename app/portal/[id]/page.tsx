"use client";

import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useParams } from "next/navigation";

export default function PortalPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        <PortalDashboard portalId={id} />
      </main>
      <SiteFooter />
    </div>
  );
}
