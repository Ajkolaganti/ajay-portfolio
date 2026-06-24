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
  const [muted, setMuted] = useState(true);
  const rafRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);

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
        muted
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

      {/* Mute / unmute toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-8 right-6 md:right-10 z-30 flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(232,146,60,0.3)] bg-[rgba(13,13,13,0.5)] text-[#9A8F83] hover:text-[#E8923C] hover:border-[#E8923C] transition-all duration-200 backdrop-blur-sm"
      >
        {muted ? (
          /* Speaker muted */
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          /* Speaker on */
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4.243-4.243M12 18l4.243-4.243M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
        <span className="text-[10px] font-mono tracking-widest uppercase">
          {muted ? "Sound Off" : "Sound On"}
        </span>
      </button>

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
