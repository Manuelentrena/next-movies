export function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="container my-4 w-full max-w-5xl px-2 text-2xl md:px-8">
      <h2 role="heading" className="text-primary">
        Resultados con:{" "}
        <span aria-label="search by" className="font-bold">
          {'"' + title + '"'}
        </span>
      </h2>
    </div>
  );
}
