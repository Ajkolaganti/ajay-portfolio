"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => null,
});

const headline = "Building enterprise systems that scale.";
const words = headline.split(" ");

const subtext =
  "7+ years across finance, telecom, and insurance — Java, Spring Boot, AWS, and API architecture for systems handling millions in loan servicing volume.";

const SOUND_PREFERENCE_KEY = "ajay-portfolio-sound-enabled";
const SOUND_TOGGLE_EVENT = "portfolio-toggle-sound";
const SOUND_STATE_EVENT = "portfolio-sound-state";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "4", label: "Enterprise Domains" },
  { value: "30%+", label: "Query Performance Gains" },
];

function WordReveal({
  word,
  delay,
  className,
}: {
  word: string;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`word-reveal ${className ?? ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}

export default function HeroSection() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [muted, setMuted] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const rafRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateMutedState = useCallback((nextMuted: boolean) => {
    setMuted(nextMuted);
    window.dispatchEvent(
      new CustomEvent(SOUND_STATE_EVENT, {
        detail: { muted: nextMuted },
      })
    );
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    updateMutedState(nextMuted);

    try {
      window.localStorage.setItem(
        SOUND_PREFERENCE_KEY,
        nextMuted ? "off" : "on"
      );
    } catch {
      // Ignore storage errors in private browsing or restricted environments.
    }

    if (!nextMuted) {
      void videoRef.current
        .play()
        .then(() => setSoundBlocked(false))
        .catch(() => {
          setSoundBlocked(true);
          if (!videoRef.current) return;
          videoRef.current.muted = true;
          updateMutedState(true);
        });
    }
  }, [updateMutedState]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mousePos.current = { x, y };
    setGlowPos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Smooth interpolation for the 3D scene
    const animate = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.current.x - prev.x) * 0.06,
        y: prev.y + (mousePos.current.y - prev.y) * 0.06,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let shouldAttemptGestureUnmute = true;

    let savedPreference: string | null = null;
    try {
      savedPreference = window.localStorage.getItem(SOUND_PREFERENCE_KEY);
    } catch {
      savedPreference = null;
    }

    const tryPlayWithSound = async () => {
      video.muted = false;
      try {
        await video.play();
        updateMutedState(false);
        setSoundBlocked(false);
      } catch {
        // Browser blocked autoplay with sound; continue muted and wait for a user gesture.
        video.muted = true;
        updateMutedState(true);
        setSoundBlocked(true);
        try {
          await video.play();
        } catch {
          // Ignore; fallback gradient stays visible if playback fails entirely.
        }
      }
    };

    const enableSoundOnGesture = () => {
      const activeVideo = videoRef.current;
      if (!activeVideo) return;

      activeVideo.muted = false;
      void activeVideo
        .play()
        .then(() => {
          updateMutedState(false);
          setSoundBlocked(false);
          try {
            window.localStorage.setItem(SOUND_PREFERENCE_KEY, "on");
          } catch {
            // Ignore storage errors in private browsing or restricted environments.
          }
        })
        .catch(() => {
          activeVideo.muted = true;
          updateMutedState(true);
          setSoundBlocked(true);
        });
    };

    if (savedPreference === "off") {
      shouldAttemptGestureUnmute = false;
      video.muted = true;
      updateMutedState(true);
      setSoundBlocked(false);
      void video.play().catch(() => {
        // Ignore; fallback gradient stays visible if playback fails entirely.
      });
    } else {
      void tryPlayWithSound();
    }

    if (shouldAttemptGestureUnmute) {
      window.addEventListener("pointerdown", enableSoundOnGesture, {
        once: true,
      });
      window.addEventListener("keydown", enableSoundOnGesture, { once: true });
      window.addEventListener("touchstart", enableSoundOnGesture, {
        once: true,
        passive: true,
      });
      window.addEventListener("wheel", enableSoundOnGesture, {
        once: true,
        passive: true,
      });
    }

    window.addEventListener(SOUND_TOGGLE_EVENT, toggleMute as EventListener);

    return () => {
      window.removeEventListener("pointerdown", enableSoundOnGesture);
      window.removeEventListener("keydown", enableSoundOnGesture);
      window.removeEventListener("touchstart", enableSoundOnGesture);
      window.removeEventListener("wheel", enableSoundOnGesture);
      window.removeEventListener(SOUND_TOGGLE_EVENT, toggleMute as EventListener);
    };
  }, [toggleMute, updateMutedState]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Fallback gradient (shown if video fails to load) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a1008] via-[#0D0D0D] to-[#0a0a14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_60%,rgba(232,146,60,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[rgba(13,13,13,0.4)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(13,13,13,0.5)] via-transparent to-[rgba(13,13,13,0.3)]" />

      {/* Mouse-follow radial glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(232,146,60,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* 3D Canvas layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <ThreeScene mousePos={smoothMouse} />
      </div>

      {/* Content — kept to left half so text never overlaps the face on the right */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-start">
      <div className="w-full md:max-w-[48%] flex flex-col items-start">
        {/* Eyebrow */}
        <p
          className="fade-up text-[#E8923C] text-sm md:text-base font-mono tracking-[0.25em] uppercase mb-6 font-medium"
          style={{ animationDelay: "200ms" }}
        >
          Senior SQL &amp; API Developer
        </p>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 max-w-4xl">
          {words.map((word, i) => (
            <WordReveal
              key={i}
              word={word}
              delay={400 + i * 80}
              className={
                word === "scale." ? "text-amber-glow" : "text-[#F5F0EB]"
              }
            />
          ))}
        </h1>

        {/* Subtext */}
        <p
          className="fade-up text-[#9A8F83] text-base md:text-lg leading-relaxed max-w-2xl mb-10"
          style={{ animationDelay: "1100ms" }}
        >
          {subtext}
        </p>

        {/* CTA Buttons */}
        <div
          className="fade-up flex flex-wrap gap-4 mb-16"
          style={{ animationDelay: "1300ms" }}
        >
          <a
            href="#experience"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E8923C] text-[#0D0D0D] font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-[#f5a050] hover:shadow-[0_0_32px_rgba(232,146,60,0.4)] cursor-pointer"
          >
            View Experience
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[rgba(232,146,60,0.35)] text-[#F5F0EB] font-semibold text-sm tracking-wide transition-all duration-200 hover:border-[#E8923C] hover:bg-[rgba(232,146,60,0.08)] cursor-pointer"
          >
            Get in Touch
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="fade-up flex flex-wrap gap-8 md:gap-12"
          style={{ animationDelay: "1500ms" }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-2xl md:text-3xl font-bold text-[#E8923C]">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-[#9A8F83] uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-[10px] text-[#9A8F83] uppercase tracking-[0.2em] font-mono">Scroll</span>
        <div className="relative w-5 h-8 border border-[rgba(232,146,60,0.3)] rounded-full flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-1.5 rounded-full bg-[#E8923C]"
            style={{ animation: "chevronBounce 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
