"use client";

// Tiny synthesized confirmation sound (Web Audio API) - no audio asset to
// ship or load. A short two-tone "pop" that reads as a positive confirmation
// without being intrusive. Silently no-ops if the browser blocks audio
// before a user gesture, or has no AudioContext at all.
export function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.start(now);
    osc.stop(now + 0.2);
    osc.onended = () => ctx.close();
  } catch {
    // Audio is a nice-to-have - never let it break the actual action.
  }
}
