import { Film, Home, Star } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary bg-gradient-to-r to-secondary text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center space-x-2">
          <Film className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Movies</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="flex items-center space-x-1 transition-colors duration-200">
                <Home className="h-5 w-5" />
                <span className="hover:underline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/favs" className="flex items-center space-x-1 transition-colors duration-200">
                <Star className="h-5 w-5" />
                <span className="hover:underline">Favs</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
