import { SignupForm } from "@/components/auth/signup-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12">
        <SignupForm />
      </main>
      <SiteFooter />
    </div>
  );
} 