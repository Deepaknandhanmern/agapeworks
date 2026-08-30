"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// The Web Speech API isn't in the default DOM lib.d.ts and is only
// available (as of writing) in Chromium browsers — unprefixed
// `SpeechRecognition` on newer Chrome/Edge, `webkitSpeechRecognition`
// elsewhere. Minimal ambient shape for just what we use.
interface SpeechRecognitionResultLike {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: { transcript: string };
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

/**
 * Thin wrapper around the browser's built-in speech recognition — free,
 * client-side only, no API calls or transcription costs. Unsupported in
 * Firefox and most non-Chromium browsers; callers should feature-detect via
 * `isSupported` and fall back to typing.
 */
export function useSpeechToText() {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef("");

  useEffect(() => {
    setIsSupported(!!getSpeechRecognitionCtor());
  }, []);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    transcriptRef.current = "";
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          text += event.results[i][0].transcript + " ";
        }
      }
      transcriptRef.current += text;
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  // Returns a promise so the final onend-flushed transcript is captured
  // before the caller reads it — recognition.stop() doesn't synchronously
  // finalize pending results.
  const stop = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      const recognition = recognitionRef.current;
      if (!recognition) {
        resolve(transcriptRef.current.trim());
        return;
      }
      recognition.onend = () => {
        recognitionRef.current = null;
        resolve(transcriptRef.current.trim());
      };
      recognition.stop();
    });
  }, []);

  return { isSupported, start, stop };
}
