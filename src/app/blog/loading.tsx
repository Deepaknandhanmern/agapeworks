import { Header } from "@/components/ui/header-3";
import { Skeleton } from "@/components/ui/skeleton";

// Next.js's built-in loading.tsx convention - shown automatically while
// navigating to /blog, replaced by the real page once its data has loaded.
export default function BlogLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-8 text-center sm:pt-10">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-10 w-full max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-xl" />
        </section>
        <section className="mx-auto w-full max-w-3xl px-4 pb-24">
          <div className="flex flex-col divide-y divide-border border-t">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3 py-8 first:pt-0">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
