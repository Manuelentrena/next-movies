import { Film, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="bg-primary bg-gradient-to-r to-secondary text-white shadow-lg">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-8 py-8">
        <div onClick={() => router.push("/")} className="flex cursor-pointer items-center space-x-2">
          <Film className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Movies</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/favs" className="flex items-center space-x-1 transition-colors duration-200">
                <Star className="h-5 w-5" />
                <span className="hover:underline">List Favs</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
