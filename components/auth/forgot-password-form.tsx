// "use client";

// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/lib/auth-context";
// import { AlertCircle, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// export function ForgotPasswordForm() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { resetPassword } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       await resetPassword(email);
//       setMessage("Check your email for password reset instructions");
//     } catch (err: any) {
//       setError(err.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
//       <div className="space-y-2 text-center">
//         <h1 className="text-3xl font-bold">Reset Password</h1>
//         <p className="text-gray-500">We'll send you password reset instructions</p>
//       </div>

//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {message && (
//         <Alert className="bg-green-50 text-green-800 border-green-100">
//           <CheckCircle className="h-4 w-4 text-green-600" />
//           <AlertDescription>{message}</AlertDescription>
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? "Sending..." : "Reset Password"}
//         </Button>
//       </form>

//       <div className="text-center text-sm">
//         <Link href="/login" className="text-primary hover:underline">
//           Back to login
//         </Link>
//       </div>
//     </div>
//   );
// } 