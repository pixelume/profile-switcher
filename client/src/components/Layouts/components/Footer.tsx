import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="z-100 fixed bottom-0 w-full bg-secondary/30 py-4 text-secondary-foreground">
      <div className="container mx-auto flex items-center justify-between px-4 text-sm font-light">
        <p>&copy; 2024 Profile Switcher App. All rights reserved.</p>
        <nav className="flex space-x-4">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
