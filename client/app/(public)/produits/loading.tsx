import { Skeleton } from "@/components/ui/skeleton";

// app/loading.tsx
export default function Loading() {
  return (
    <main>
      <h1 className="uppercase text-center mt-5">Tous les produits</h1>

      <section className="w-3/4 mx-auto my-20 flex flex-wrap items-center justify-center gap-4">
        {[...Array(10)].map((i) => (
          <Skeleton className="h-[500px] w-[400px] rounded" />
        ))}
      </section>
    </main>
  );
}
