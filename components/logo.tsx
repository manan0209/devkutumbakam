import { Heart } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}

export function Logo({ size = "md", withTagline = true }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center bg-love rounded-full p-1.5 animate-pulse-gentle">
        <Heart
          className="text-white"
          fill="white"
          size={size === "sm" ? 16 : size === "md" ? 20 : 24}
        />
      </div>
      <div>
        <h1 className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
          Kutumbakam
        </h1>
        {withTagline && (
          <p className="text-xs text-gray-600 -mt-1">
            वसुधैव कुटुम्बकम् • The World Is One Family
          </p>
        )}
      </div>
    </Link>
  );
}
