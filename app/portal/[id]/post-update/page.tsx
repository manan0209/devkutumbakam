"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { createUpdate } from "@/lib/db";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";

export default function PostUpdatePage() {
  const params = useParams();
  const portalId = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("You must be logged in to post an update");
      return;
    }

    if (!title || !content) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        portalId,
        title,
        content,
        createdBy: user.displayName || user.email || user.uid,
      };

      await createUpdate(updateData);
      setSuccess("Update posted successfully!");

      // Redirect back to the portal page after a short delay
      setTimeout(() => {
        router.push(`/portal/${portalId}`);
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to post update";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/portal/${portalId}`}
            className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Portal
          </Link>

          <h1 className="text-3xl font-bold mb-2">Post an Update</h1>
          <p className="text-gray-600 mb-8">
            Share important information, progress updates, or requests with
            everyone involved in this relief effort.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {!user ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg border mb-6">
              <p className="text-gray-600 mb-4">
                You need to be logged in to post an update.
              </p>
              <Button asChild>
                <a href={`/login?redirect=/portal/${portalId}/post-update`}>
                  Log In
                </a>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-lg border"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Update Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., New Relief Camp Established"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Update Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Provide details about the update..."
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Posting Update..." : "Post Update"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
