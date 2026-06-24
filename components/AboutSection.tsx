"use client";

import { useEffect, useRef } from "react";

export default function AboutSection() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: "SQL-First Design",
      desc: "Schema and query design as the foundation, not a detail. Stored procedures, indexes, and execution plans before the ORM.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "API as a Contract",
      desc: "RESTful and SOAP interfaces versioned, documented, and secure. Swagger/OpenAPI contracts before a single endpoint ships.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Compliance-Grade Audit",
      desc: "Every transaction logged. RBAC, IAM alignment, Fortify scans, and audit trails built in — not bolted on.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-36 ambient-bg"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.2)] to-transparent" />

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Bio */}
          <div>
            <p className="reveal-item text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-4">
              About
            </p>
            <h2 className="reveal-item text-3xl md:text-4xl font-bold text-[#F5F0EB] leading-tight mb-6">
              Systems-first engineer.
              <br />
              <span className="text-[#9A8F83] font-normal">Not framework-first.</span>
            </h2>
            <p className="reveal-item text-[#9A8F83] text-base leading-relaxed mb-5">
              Senior Java &amp; API Developer currently at{" "}
              <span className="text-[#F5F0EB] font-medium">Lakeview Loan Servicing / Bayview Asset Management</span>,
              building secure microservices for enterprise banking operations.
              Based in <span className="text-[#F5F0EB] font-medium">Delray Beach, FL</span>.
            </p>
            <p className="reveal-item text-[#9A8F83] text-base leading-relaxed mb-5">
              M.S. in Computer and Information Systems from{" "}
              <span className="text-[#F5F0EB] font-medium">Bellevue University</span>.
              Enterprise background spans Verizon, Nationwide Insurance, and Equifax —
              high-concurrency systems where schema design and API contracts carry real stakes.
            </p>
            <p className="reveal-item text-[#9A8F83] text-base leading-relaxed">
              I treat SQL and API design as the{" "}
              <span className="text-[#E8923C] font-medium">backbone of reliable software</span>,
              not an afterthought to the framework. When the query is wrong, no amount
              of application code fixes it.
            </p>
          </div>

          {/* Right — Pillars */}
          <div className="flex flex-col gap-5">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="reveal-item glass rounded-2xl p-6 flex gap-4 group hover:border-[rgba(232,146,60,0.3)] transition-colors duration-300 cursor-default"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(232,146,60,0.1)] text-[#E8923C] flex items-center justify-center group-hover:bg-[rgba(232,146,60,0.18)] transition-colors duration-300">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[#F5F0EB] font-semibold text-sm mb-1.5">{p.title}</h3>
                  <p className="text-[#9A8F83] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.15)] to-transparent" />
    </section>
  );
}
