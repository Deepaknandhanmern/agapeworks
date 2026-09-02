"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function Featured_05() {
  return (
    <section className="relative w-full mx-auto overflow-hidden rounded-3xl bg-muted border border-border shadow-md px-6 py-16 md:px-16 md:py-24 mt-48">
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="z-10 max-w-xl text-left">
          <h1 className="text-3xl font-normal text-foreground">
            Build with <span className="text-primary">Ruixen UI</span>{" "}
            <span className="text-muted-foreground">Empower your team with fast, elegant, and scalable UI components. Ruixen UI brings simplicity and performance to your modern apps.</span>
          </h1>
          <Button className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:bg-black">
            Join Today <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative h-[320px] w-full max-w-xl md:h-[420px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}

// cobe@2.0.1's shipped COBEOptions type omits `onRender`, which the
// runtime fully supports (its documented render-loop hook) - extend the
// type locally to work around the incomplete type declaration.
const GLOBE_CONFIG: COBEOptions & { onRender: () => void } = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [209 / 255, 241 / 255, 64 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  // phi/width/r are mutated by the imperative cobe render loop and the
  // pointer handlers below - they must be refs, not plain locals or React
  // state, so the single onRender callback (created once, at globe
  // creation) always reads the latest value instead of a stale closure.
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const rRef = useRef(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      rRef.current = delta / 200
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // A window "resize" listener alone misses the far more common case:
    // the canvas's own layout settling after mount (fonts loading, a
    // flex/grid parent finishing its pass, etc.) with no window resize
    // event ever firing. That leaves widthRef stuck at 0 and the globe
    // permanently invisible. ResizeObserver reports the canvas's actual
    // rendered size - including its first measurement - and keeps it
    // correct afterward.
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) widthRef.current = entry.contentRect.width
    })
    ro.observe(canvasRef.current)
    widthRef.current = canvasRef.current.offsetWidth

    // Built as a separate variable (not an inline object literal at the
    // call site) so TS's excess-property check doesn't reject `onRender`
    // even though cobe's own runtime expects and uses it.
    const options = {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state: Record<string, any>) => {
        if (pointerInteracting.current === null) phiRef.current += 0.005
        state.phi = phiRef.current + rRef.current
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    }

    const globe = createGlobe(canvasRef.current, options as COBEOptions)

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    })

    return () => {
      ro.disconnect()
      globe.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
