"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { HandHelping, Heart, LogOut, Menu, PlusCircle } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary">
              Resources
            </Link>
            <Link href="/manuals" className="text-gray-700 hover:text-primary">
              Manuals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary">
              How It Works
            </Link>
          </nav>

          <div className="hidden md:flex space-x-2">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <PlusCircle size={16} />
                      Create
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/create-portal">Create Portal</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <HandHelping size={16} />
                      Contribute
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/resources">Browse Resources</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/request-assistance">Contribute Resources</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/volunteer">Volunteer</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {user.displayName || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-primary text-primary hover:bg-love-light" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="gap-2" asChild>
                  <Link href="/signup">
                    <Heart size={16} />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/resources" className="text-lg font-medium">
                  Resources
                </Link>
                <Link href="/manuals" className="text-lg font-medium">
                  Manuals
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
                
                {user && (
                  <>
                    <div className="border-t pt-4 mt-2">
                      <h3 className="font-semibold mb-2">Create</h3>
                      <Link href="/create-portal" className="text-gray-700 hover:text-primary block py-1">
                        Create Portal
                      </Link>
                    </div>
                    
                    <div className="border-t pt-4 mt-2">
                      <h3 className="font-semibold mb-2">Contribute</h3>
                      <Link href="/resources" className="text-gray-700 hover:text-primary block py-1">
                        Browse Resources
                      </Link>
                      <Link href="/request-assistance" className="text-gray-700 hover:text-primary block py-1">
                        Contribute Resources
                      </Link>
                      <Link href="/volunteer" className="text-gray-700 hover:text-primary block py-1">
                        Volunteer
                      </Link>
                    </div>
                  </>
                )}
                
                <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                  {user ? (
                    <>
                      <Link href="/profile" className="text-lg font-medium">
                        Profile
                      </Link>
                      <Link href="/dashboard" className="text-lg font-medium">
                        Dashboard
                      </Link>
                      <Button onClick={handleLogout} variant="outline" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-love-light" asChild>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button className="w-full gap-2" asChild>
                        <Link href="/signup">
                          <Heart size={16} />
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

