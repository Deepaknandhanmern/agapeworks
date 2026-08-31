import { Header } from "@/components/ui/header-3";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            404
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-muted-foreground">
            The link might be broken, or the page may have moved.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <AntiMetalButton href="/" label="Back to home" />
          </div>
        </div>
      </main>
    </div>
  );
}
