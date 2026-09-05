"use client";

// Tiny dependency-free confetti burst - a handful of colored squares given a
// random trajectory via inline CSS animation, then removed from the DOM once
// it finishes. No canvas, no npm package; just a one-off delight moment for
// a successful form submission.
const COLORS = ["#f97316", "#9333ea", "#f59e0b", "#10b981", "#3b82f6"];

export function fireConfetti(count = 40) {
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  container.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden;";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 6;
    const startX = 50 + (Math.random() - 0.5) * 20;
    const driftX = (Math.random() - 0.5) * 60;
    const duration = 1.2 + Math.random() * 0.8;
    const delay = Math.random() * 0.15;
    const rotation = Math.random() * 720 - 360;

    piece.style.cssText = `
      position:absolute;
      left:${startX}vw;
      top:-5vh;
      width:${size}px;
      height:${size}px;
      background:${COLORS[i % COLORS.length]};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      opacity:0.9;
      animation:vivira-confetti-fall ${duration}s ease-in ${delay}s forwards;
      --drift-x:${driftX}px;
      --rotation:${rotation}deg;
    `;
    container.appendChild(piece);
  }

  if (!document.getElementById("vivira-confetti-keyframes")) {
    const style = document.createElement("style");
    style.id = "vivira-confetti-keyframes";
    style.textContent = `
      @keyframes vivira-confetti-fall {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0.9; }
        100% { transform: translate(var(--drift-x), 105vh) rotate(var(--rotation)); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 2200);
}
