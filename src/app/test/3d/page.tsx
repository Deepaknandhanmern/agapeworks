import type { Metadata } from "next";
import { GyroidCanvas } from "@/components/ui/gyroid-canvas";

export const metadata: Metadata = {
  title: "3D object (test preview)",
  robots: { index: false, follow: false },
};

export default function ThreeDTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-black px-6 py-20">
      <div className="h-[70vh] max-h-[680px] w-full max-w-[680px]">
        <GyroidCanvas />
      </div>
      <div className="max-w-md text-center">
        <p className="text-sm text-white/60">
          Raymarched gyroid in a WebGL fragment shader - no 3D library, no mesh file. Pauses when
          scrolled out of view and renders a single static frame under reduced-motion.
        </p>
      </div>
    </main>
  );
}
