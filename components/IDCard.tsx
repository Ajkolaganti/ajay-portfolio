"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IDCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set([threadRef.current, cardRef.current, clipRef.current, textRef.current], {
        opacity: 1,
        y: 0,
        scaleY: 1,
        rotation: 0,
        clearProps: "transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Clip slides down into view
      tl.fromTo(
        clipRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 }
      )
      // 2. Thread extends downward
      .fromTo(
        threadRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.45, ease: "power2.inOut" },
        "-=0.1"
      )
      // 3. Card drops with elastic bounce
      .fromTo(
        cardRef.current,
        { y: -380, rotation: -6, opacity: 0, transformOrigin: "top center" },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.42)",
        },
        "-=0.25"
      )
      // 4. Card swings like a pendulum (origin = top center of card)
      .to(
        cardRef.current,
        {
          keyframes: [
            { rotation: 4, duration: 0.4, ease: "sine.out" },
            { rotation: -3, duration: 0.38, ease: "sine.inOut" },
            { rotation: 1.5, duration: 0.3, ease: "sine.inOut" },
            { rotation: -0.8, duration: 0.25, ease: "sine.inOut" },
            { rotation: 0, duration: 0.2, ease: "sine.out" },
          ],
          transformOrigin: "top center",
        },
        "-=0.2"
      )
      // 5. Text content fades up alongside
      .fromTo(
        textRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "<0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden ambient-bg"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.2)] to-transparent" />

      {/* Ambient glow behind card */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(ellipse,rgba(232,146,60,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — About text */}
        <div ref={textRef} className="order-2 lg:order-1">
          <p className="text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-4">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F0EB] leading-tight mb-6">
            Systems-first engineer.
            <br />
            <span className="text-[#9A8F83] font-normal">Not framework-first.</span>
          </h2>
          <p className="text-[#9A8F83] text-base leading-relaxed mb-5">
            Senior Java &amp; API Developer currently at{" "}
            <span className="text-[#F5F0EB] font-medium">
              Lakeview Loan Servicing / Bayview Asset Management
            </span>
            , building secure microservices for enterprise banking operations.
            Based in{" "}
            <span className="text-[#F5F0EB] font-medium">Delray Beach, FL</span>.
          </p>
          <p className="text-[#9A8F83] text-base leading-relaxed mb-5">
            M.S. in Computer and Information Systems from{" "}
            <span className="text-[#F5F0EB] font-medium">Bellevue University</span>.
            Enterprise background spans Verizon, Nationwide Insurance, and Equifax —
            high-concurrency systems where schema and API contracts carry real stakes.
          </p>
          <p className="text-[#9A8F83] text-base leading-relaxed">
            I treat SQL and API design as the{" "}
            <span className="text-[#E8923C] font-medium">
              backbone of reliable software
            </span>
            , not an afterthought to the framework. When the query is wrong, no
            amount of application code fixes it.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["Java", "Spring Boot", "SQL Server", "AWS", "REST APIs", "Microservices"].map(
              (s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-[rgba(232,146,60,0.08)] border border-[rgba(232,146,60,0.15)] text-[#9A8F83] text-xs font-mono"
                >
                  {s}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right — ID Card with lanyard */}
        <div className="order-1 lg:order-2 flex flex-col items-center">
          {/* Clip / hook at top */}
          <div
            ref={clipRef}
            className="relative z-10 flex flex-col items-center"
            style={{ opacity: 0 }}
          >
            {/* Metal bar / clip */}
            <div className="w-10 h-3 rounded-sm bg-gradient-to-b from-[#c8a882] to-[#8a6a42] shadow-[0_2px_8px_rgba(0,0,0,0.5)] relative">
              <div className="absolute inset-x-1 top-0.5 bottom-0.5 rounded-sm bg-gradient-to-r from-[#dfc09a] via-[#c8a882] to-[#a07840] opacity-60" />
            </div>

            {/* Thread */}
            <div
              ref={threadRef}
              className="w-0.5 relative"
              style={{
                height: "72px",
                background:
                  "linear-gradient(to bottom, #a07840 0%, #c8a882 30%, #a07840 60%, #8a6a42 100%)",
                boxShadow: "1px 0 3px rgba(0,0,0,0.4)",
                transformOrigin: "top center",
              }}
            >
              {/* Thread sheen */}
              <div className="absolute inset-0 w-px bg-gradient-to-b from-[#e8d4b0]/60 via-transparent to-transparent mx-auto" />
            </div>
          </div>

          {/* ID Card */}
          <div
            ref={cardRef}
            className="relative"
            style={{ opacity: 0, transformOrigin: "top center" }}
          >
            {/* Hole at top of card */}
            <div
              ref={holeRef}
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full border-2 border-[#a07840] bg-[#0D0D0D] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,0,0,0.4)]"
            />

            {/* Card body */}
            <div className="relative w-[220px] sm:w-[240px] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(232,146,60,0.15)] bg-[#1a1410]">
              {/* Card top accent strip */}
              <div className="h-1 bg-gradient-to-r from-[#E8923C] via-[#f5b56a] to-[#E8923C]" />

              {/* Photo */}
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src="/ajay-id.png"
                  alt="Ajay Kolaganti"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="260px"
                />
                {/* Bottom gradient overlay on photo */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1a1410] to-transparent" />
              </div>

              {/* Card footer */}
              <div className="px-5 py-4 bg-[#1a1410] border-t border-[rgba(232,146,60,0.12)]">
                <p className="text-[#F5F0EB] font-bold text-sm tracking-tight">
                  Ajay Kolaganti
                </p>
                <p className="text-[#E8923C] text-xs font-mono mt-0.5">
                  Senior SQL &amp; API Developer
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8923C] animate-pulse" />
                  <span className="text-[#9A8F83] text-[10px] font-mono">
                    AVAILABLE FOR HIRE
                  </span>
                </div>
              </div>

              {/* Subtle card corner dots */}
              <div className="absolute top-4 right-4 grid grid-cols-3 gap-0.5 opacity-20">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 rounded-full bg-[#E8923C]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.15)] to-transparent" />
    </section>
  );
}
