// Thin wrapper over gtag.js — safe to call even before GA has loaded or when
// NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set (e.g. local dev), since it just
// no-ops instead of throwing.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
