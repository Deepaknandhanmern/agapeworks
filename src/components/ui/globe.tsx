"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

// cobe's shipped .d.ts omits `onRender` from COBEOptions even though it's
// the library's real, documented render-loop hook (see its README) — the
// actual onRender is supplied at the createGlobe() call below.
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
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
  // pointer handlers below — they must be refs, not plain locals or React
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
    // rendered size — including its first measurement — and keeps it
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

    const globe = createGlobe(canvasRef.current, options)

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
