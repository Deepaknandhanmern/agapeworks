import { Header } from "@/components/ui/header-3";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 text-center sm:pt-10">
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-sm" />
          </div>
        </section>
        <section className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-xl border bg-card">
                <Skeleton className="w-full rounded-none" style={{ paddingTop: "62.5%" }} />
                <div className="flex flex-col gap-2 p-5">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
