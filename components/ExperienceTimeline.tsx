"use client";

import { useEffect, useRef } from "react";

const roles = [
  {
    title: "Senior Java Developer",
    company: "Lakeview Loan Servicing / Bayview Asset Management",
    period: "Nov 2024 — Present",
    current: true,
    bullets: [
      "Designed and developed secure Java-based microservices for a large-scale Defect Management System (DMS) supporting banking and loan servicing operations",
      "Built RESTful APIs with Spring Boot & Hibernate/JPA for defect lifecycle management, document handling, and task orchestration",
      "Implemented RBAC and group-driven authorization aligned with IAM best practices",
      "Developed complex prioritization logic based on investor rules (Ginnie Mae, Fannie Mae, EBO/Repurchase), loan status, and delinquency metrics",
      "Wrote optimized SQL Server queries and stored procedures for high-volume transactional workflows",
      "Ensured secure data handling, audit trails, and workflow traceability for regulatory compliance",
    ],
    stack: ["Java", "Spring Boot", "Hibernate/JPA", "SQL Server", "RBAC", "IAM", "REST APIs", "Microservices"],
  },
  {
    title: "Senior Full Stack / Java Engineer",
    company: "Verizon (via Pyramid Consulting / Innova Solutions)",
    period: "Apr 2021 — Sep 2024",
    bullets: [
      "Developed and maintained Spring Boot microservices in AWS cloud environments for Verizon's enterprise platforms",
      "Built and consumed secure REST APIs focused on performance, scalability, and fault tolerance",
      "SQL Server dynamic queries and multi-table join views powering telecom provisioning APIs",
      "API request throttling + SQL connection pooling for high-concurrency endpoints",
      "Containerized applications with Docker and deployed via Kubernetes",
      "Led Java 8 → 17 upgrade leveraging streams, lambdas, and modern language features",
    ],
    stack: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "REST APIs", "SQL Server"],
  },
  {
    title: "SQL & API Developer",
    company: "Nationwide Insurance",
    period: "",
    bullets: [
      "Versioned RESTful API contracts using Swagger/OpenAPI for premium calculation endpoints",
      "SQL Server stored procedures eliminating ad-hoc SQL, enforcing injection prevention, cutting query time 30%",
      "Built backend services supporting insurance policy and premium workflows",
    ],
    stack: ["Java", "Spring Boot", "SQL Server", "REST APIs", "Swagger/OpenAPI"],
  },
  {
    title: "SQL & API Developer",
    company: "Equifax",
    period: "",
    bullets: [
      "API request/response schema + SQL data contract design across SOAP/REST integrations",
      "SQL Server index/execution plan optimization cutting query runtimes 40%+ on fraud detection datasets",
      "SQL-driven ETL pipelines and API data exchange contracts for credit data integration",
      "Optimized SQL lookups and caching for authentication workflows under SLA constraints",
    ],
    stack: ["Java", ".NET", "SQL Server", "SOAP/REST", "ETL"],
  },
];

function TimelineCard({ role, index }: { role: typeof roles[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.classList.add("in-view");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-3 h-3 rounded-full mt-6 flex-shrink-0 ${
            role.current
              ? "bg-[#E8923C] shadow-[0_0_12px_rgba(232,146,60,0.6)]"
              : "bg-[#3d3020] border border-[rgba(232,146,60,0.3)]"
          }`}
        />
        {index < roles.length - 1 && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[rgba(232,146,60,0.25)] to-transparent min-h-[48px]" />
        )}
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="timeline-card flex-1 glass rounded-2xl p-6 md:p-8 mb-8 hover:border-[rgba(232,146,60,0.25)] transition-colors duration-300 group"
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            {role.current && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(232,146,60,0.12)] border border-[rgba(232,146,60,0.25)] text-[#E8923C] text-[10px] font-semibold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8923C] animate-pulse" />
                Current
              </span>
            )}
            <h3 className="text-[#F5F0EB] font-bold text-lg leading-tight">{role.title}</h3>
            <p className="text-[#E8923C] text-sm font-medium mt-0.5">{role.company}</p>
          </div>
          {role.period && (
            <span className="text-[#9A8F83] text-xs font-mono bg-[#1a1410] px-3 py-1.5 rounded-lg border border-[rgba(232,146,60,0.1)] whitespace-nowrap">
              {role.period}
            </span>
          )}
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-6">
          {role.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-[#9A8F83] text-sm leading-relaxed">
              <svg
                className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-[#E8923C] opacity-60"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-[rgba(232,146,60,0.08)] border border-[rgba(232,146,60,0.15)] text-[#E8923C] text-[11px] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && headerRef.current) {
          headerRef.current.querySelectorAll(".reveal-item").forEach((el, i) => {
            (el as HTMLElement).style.animationDelay = `${i * 120}ms`;
            el.classList.add("fade-up");
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-36">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(ellipse,rgba(232,146,60,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-16">
          <p className="reveal-item text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            Experience
          </p>
          <h2 className="reveal-item text-3xl md:text-4xl font-bold text-[#F5F0EB]">
            Enterprise career timeline
          </h2>
          <p className="reveal-item text-[#9A8F83] text-base mt-3 max-w-xl leading-relaxed">
            W-2 enterprise roles across banking, telecom, insurance, and credit services.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {roles.map((role, i) => (
            <TimelineCard key={i} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
