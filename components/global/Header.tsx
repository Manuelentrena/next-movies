import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="bg-primary bg-gradient-to-r to-secondary text-white shadow-lg">
      <div className="container relative mx-auto flex h-24 max-w-5xl items-center justify-between px-8">
        <div className="cursor-pointer overflow-hidden" onClick={() => router.push("/")}>
          <img
            src="/ticket.webp"
            alt="Logo Movies"
            className="absolute left-1/2 top-1/2 h-auto max-w-44 -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </header>
  );
}
