"use client";

import { useEffect, useRef } from "react";

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.querySelectorAll(".reveal-item").forEach((el, i) => {
            (el as HTMLElement).style.animationDelay = `${i * 120}ms`;
            el.classList.add("fade-up");
          });
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div ref={contentRef}>
          <p className="reveal-item text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            Education
          </p>
          <h2 className="reveal-item text-3xl md:text-4xl font-bold text-[#F5F0EB] mb-10">
            Academic background
          </h2>

          <div className="reveal-item glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-[rgba(232,146,60,0.25)] transition-colors duration-300 group cursor-default">
            {/* Degree icon */}
            <div className="w-14 h-14 rounded-2xl bg-[rgba(232,146,60,0.1)] border border-[rgba(232,146,60,0.2)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(232,146,60,0.15)] transition-colors duration-300">
              <svg className="w-7 h-7 text-[#E8923C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-[#F5F0EB] font-bold text-xl mb-1">
                M.S. Computer and Information Systems
              </h3>
              <p className="text-[#E8923C] font-medium text-sm mb-2">
                Bellevue University
              </p>
              <p className="text-[#9A8F83] text-sm leading-relaxed max-w-lg">
                Graduate studies in computer science and information systems — covering distributed systems,
                data architecture, and enterprise software engineering principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
