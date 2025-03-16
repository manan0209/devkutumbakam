import Link from "next/link";
import { siteConfig } from "../config/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-10 py-10 md:gap-16 md:py-16">
        <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Platform</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Search Portals
                </Link>
              </li>
              <li>
                <Link
                  href="/create-portal"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Create Portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/disaster-preparedness"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Disaster Preparedness
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@kutumbakam.org"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  contact@kutumbakam.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li>
                <address className="not-italic text-muted-foreground">
                  Maharashtra, India
                </address>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Social</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://twitter.com/kutumbakam"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/manan0209"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/kutumbakamorg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/kutumbakam"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="grow text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name} — "The world is
            one family" | Developed by Manan Goel in a 24-hour hackathon (March 15, 2025)
          </div>
        </div>
      </div>
    </footer>
  );
}
