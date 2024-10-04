export function Header() {
  return (
    <header className="bg-primary bg-gradient-to-r to-secondary text-white shadow-lg">
      <div className="container relative mx-auto flex h-24 max-w-5xl items-center justify-between px-8">
        <img
          src="/ticket.webp"
          alt="Logo"
          className="absolute left-1/2 top-1/2 h-auto max-w-44 -translate-x-1/2 -translate-y-1/2 transform"
        />
      </div>
    </header>
  );
}
