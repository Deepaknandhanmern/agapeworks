"use client";

// Cinematic editorial "About" section, built to a pixel-precise animation/
// layout spec (oversized masked-reveal title, clip-path image reveals,
// cursor parallax via a JS-driven rAF lerp feeding CSS custom properties).
// The spec this was built from used placeholder "Nōra Form" interior-design
// copy/imagery (explicitly labeled a fictional demo brand) - swapped for
// real Agape Works copy and the same photography already used on /about,
// keeping every measurement, timing, and easing curve as specified.

import { useEffect, useRef } from "react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const MAIN_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=90";
const SMALL_IMAGE =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=90";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=90";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallenBack) return;
  img.dataset.fallenBack = "1";
  img.src = FALLBACK_IMAGE;
}

export function AgapeAboutEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.08;
      c.y += (t.y - c.y) * 0.08;
      section.style.setProperty("--mouse-x", c.x.toFixed(4));
      section.style.setProperty("--mouse-y", c.y.toFixed(4));

      if (Math.abs(t.x - c.x) > 0.0005 || Math.abs(t.y - c.y) > 0.0005) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };

    const requestTick = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };
      requestTick();
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
      requestTick();
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`agape-about ${dmSans.className}`}>
      <h2 className="agape-about__title">
        <span className="agape-about__mask agape-about__mask--l1">
          <span className="agape-about__word agape-about__word--1">WORK, DONE</span>
        </span>
        <span className="agape-about__mask agape-about__mask--l2">
          <span className="agape-about__word agape-about__word--2">WITH AGAPE</span>
        </span>
      </h2>

      <div className="agape-about__left">
        <p className="agape-about__label">Software, built with genuine care</p>
        <p className="agape-about__desc">
          <strong>No bait-and-switch:</strong> the people who scope your project are the same
          people who build it, every time.
        </p>
      </div>

      <figure className="agape-about__main-figure">
        <img
          src={MAIN_IMAGE}
          onError={handleImgError}
          alt="Agape Works engineers collaborating on a product"
          className="agape-about__main-img"
        />
        <div className="agape-about__overlay" aria-hidden="true" />
      </figure>

      <aside className="agape-about__right">
        <figure className="agape-about__small-figure">
          <img
            src={SMALL_IMAGE}
            onError={handleImgError}
            alt="Agape Works engineer working remotely"
            className="agape-about__small-img"
          />
          <div className="agape-about__overlay" aria-hidden="true" />
        </figure>

        <div className="agape-about__right-text">
          <h3 className="agape-about__heading">
            <span className="agape-about__mask agape-about__mask--h1">
              <span className="agape-about__hword">Built to</span>
            </span>
            <span className="agape-about__mask agape-about__mask--h2">
              <span className="agape-about__hword">Actually Ship</span>
            </span>
          </h3>
          <p className="agape-about__paragraph">
            At Agape Works, we build products around the way teams actually ship - fixed scope,
            weekly demos, and code your own engineers can maintain long after we&apos;re gone.
          </p>
        </div>
      </aside>

      <div className="agape-about__index">
        <span className="agape-about__index-line" aria-hidden="true" />
        <span>Agape Works / 01</span>
      </div>

      <style>{`
        .agape-about {
          position: relative;
          isolation: isolate;
          width: 100%;
          height: 100svh;
          min-height: 480px;
          overflow: hidden;
          background: #f7f7f5;
          color: #050505;
          margin: 0;
          border: 0;
          padding: 0;
          --mouse-x: 0;
          --mouse-y: 0;
        }

        .agape-about__title {
          position: absolute;
          top: 5.2%;
          left: 3.65%;
          z-index: 5;
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(76px, 10.4vw, 166px);
          font-weight: 700;
          line-height: 0.78;
          letter-spacing: -0.087em;
          text-transform: uppercase;
          color: #050505;
          pointer-events: none;
        }

        .agape-about__mask {
          display: block;
          overflow: hidden;
          padding-right: 0.09em;
          padding-bottom: 0.1em;
        }

        .agape-about__word {
          display: inline-block;
          transform: translateY(115%);
          animation: agapeAboutRise 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .agape-about__word--1 { animation-delay: 0ms; }
        .agape-about__word--2 { animation-delay: 100ms; }

        .agape-about__hword {
          display: inline-block;
          transform: translateY(115%);
          animation: agapeAboutRise 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 810ms;
        }

        @keyframes agapeAboutRise {
          to { transform: translateY(0); }
        }

        .agape-about__left {
          position: absolute;
          left: 3.7%;
          top: 56.7%;
          z-index: 4;
          width: min(205px, 19.5vw);
        }

        .agape-about__label,
        .agape-about__desc {
          font-size: clamp(10px, 0.83vw, 13px);
          font-weight: 400;
          line-height: 1.43;
          letter-spacing: -0.025em;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          animation: agapeAboutFadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .agape-about__label {
          margin-bottom: clamp(28px, 8.5vh, 68px);
          animation-delay: 720ms;
        }

        .agape-about__desc {
          animation-delay: 830ms;
        }

        .agape-about__desc strong {
          font-weight: 600;
        }

        @keyframes agapeAboutFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .agape-about__main-figure {
          position: absolute;
          top: 30.1%;
          left: 26.45%;
          width: 43.25%;
          height: 51.4%;
          min-height: 205px;
          z-index: 2;
          margin: 0;
          overflow: hidden;
          background: #e5e3de;
          border-radius: clamp(24px, 3.15vw, 46px);
          clip-path: inset(0 100% 0 0 round clamp(24px, 3.15vw, 46px));
          animation: agapeAboutRevealLTR 1.25s cubic-bezier(0.77, 0, 0.18, 1) forwards;
          animation-delay: 280ms;
        }

        @keyframes agapeAboutRevealLTR {
          to { clip-path: inset(0 0 0 0 round clamp(24px, 3.15vw, 46px)); }
        }

        .agape-about__main-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 58%;
          transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0)
            scale(1.055);
        }

        .agape-about__main-figure:hover .agape-about__main-img {
          transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0)
            scale(1.095);
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .agape-about__overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.13),
            transparent 38%,
            rgba(0, 0, 0, 0.04)
          );
          mix-blend-mode: soft-light;
        }

        .agape-about__right {
          position: absolute;
          top: 30.8%;
          left: 72.35%;
          width: 25%;
          max-width: 390px;
          z-index: 3;
        }

        .agape-about__small-figure {
          width: 100%;
          height: clamp(104px, 23.4vh, 205px);
          position: relative;
          overflow: hidden;
          background: #ddd9d0;
          margin: 0;
          border-radius: clamp(25px, 3.2vw, 46px);
          clip-path: inset(0 0 0 100% round clamp(25px, 3.2vw, 46px));
          animation: agapeAboutRevealRTL 1.15s cubic-bezier(0.77, 0, 0.18, 1) forwards;
          animation-delay: 440ms;
        }

        @keyframes agapeAboutRevealRTL {
          to { clip-path: inset(0 0 0 0 round clamp(25px, 3.2vw, 46px)); }
        }

        .agape-about__small-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 57%;
          transform: translate3d(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px), 0)
            scale(1.075);
        }

        .agape-about__small-figure:hover .agape-about__small-img {
          transform: translate3d(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px), 0)
            scale(1.13);
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .agape-about__right-text {
          padding-top: clamp(18px, 4.2vh, 35px);
        }

        .agape-about__heading {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(25px, 2.7vw, 45px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.065em;
          margin: 0;
          color: #050505;
        }

        .agape-about__mask--h1,
        .agape-about__mask--h2 {
          padding-bottom: 0.08em;
        }

        .agape-about__paragraph {
          max-width: 355px;
          margin-top: clamp(21px, 5.3vh, 43px);
          font-size: clamp(10px, 0.83vw, 13px);
          font-weight: 400;
          line-height: 1.43;
          letter-spacing: -0.025em;
          opacity: 0;
          transform: translateY(14px);
          animation: agapeAboutFadeUpSmall 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 960ms;
        }

        @keyframes agapeAboutFadeUpSmall {
          to { opacity: 1; transform: translateY(0); }
        }

        .agape-about__index {
          position: absolute;
          right: 2.3%;
          bottom: 3%;
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(0, 0, 0, 0.43);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(18px);
          animation: agapeAboutFadeUpSmall 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.15s;
        }

        .agape-about__index-line {
          width: 28px;
          height: 1px;
          background: currentColor;
        }

        @media (max-width: 900px) {
          .agape-about {
            height: auto;
            min-height: 100svh;
            padding: 28px 24px 52px;
            overflow: visible;
          }

          .agape-about__title {
            position: relative;
            top: auto;
            left: auto;
            font-size: clamp(72px, 15vw, 124px);
            line-height: 0.78;
          }

          .agape-about__main-figure {
            position: relative;
            top: auto;
            left: auto;
            width: 68%;
            height: 390px;
            min-height: 0;
            margin-top: 22px;
            margin-left: auto;
          }

          .agape-about__left {
            position: relative;
            top: auto;
            left: auto;
            width: 31%;
            margin-top: -250px;
            padding-right: 20px;
          }

          .agape-about__label {
            margin-bottom: 52px;
          }

          .agape-about__right {
            position: relative;
            top: auto;
            left: auto;
            width: 56%;
            max-width: none;
            margin-top: 160px;
            margin-left: auto;
          }

          .agape-about__small-figure {
            height: 210px;
          }

          .agape-about__index {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .agape-about {
            padding: 22px 16px 44px;
          }

          .agape-about__title {
            font-size: clamp(62px, 21vw, 96px);
            letter-spacing: -0.085em;
          }

          .agape-about__main-figure {
            width: 100%;
            height: min(70vw, 330px);
            margin-top: 24px;
            border-radius: 27px;
          }

          .agape-about__left {
            width: 100%;
            margin-top: 29px;
            padding-right: 0;
            display: grid;
            grid-template-columns: 1fr 1.25fr;
            gap: 28px;
          }

          .agape-about__label {
            margin-bottom: 0;
          }

          .agape-about__right {
            width: 100%;
            margin-top: 58px;
          }

          .agape-about__small-figure {
            height: min(51vw, 245px);
            border-radius: 27px;
          }

          .agape-about__right-text {
            padding-top: 25px;
          }

          .agape-about__heading {
            font-size: clamp(34px, 10vw, 53px);
          }

          .agape-about__paragraph {
            max-width: 88%;
            margin-top: 25px;
          }

          .agape-about__label,
          .agape-about__desc,
          .agape-about__paragraph {
            font-size: 11px;
            line-height: 1.48;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .agape-about * {
            animation-duration: 1ms !important;
            animation-delay: 0s !important;
            transition: none !important;
          }
          .agape-about__main-img,
          .agape-about__small-img {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
