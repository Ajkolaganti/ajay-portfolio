"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ApiConstellationScene = dynamic(
  () => import("@/components/scenes/ApiConstellationScene"),
  { ssr: false, loading: () => null }
);

const skillGroups = [
  {
    category: "Languages",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["Java 8/11/17", "SQL (T-SQL)", "TypeScript"],
  },
  {
    category: "Backend",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ["Spring Boot", "Hibernate/JPA", "Microservices", "REST APIs", "SOAP", "Kafka"],
  },
  {
    category: "Cloud / Infra",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    skills: ["AWS (EC2, S3, RDS, SQS)", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Database",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ["SQL Server", "PostgreSQL", "Oracle/MySQL", "Stored Procedures", "Query Optimization", "ETL"],
  },
  {
    category: "Security",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    skills: ["IAM", "RBAC", "OWASP", "Fortify", "Black Duck", "Audit Trails"],
  },
  {
    category: "Frontend",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
];

interface TiltCardProps {
  group: (typeof skillGroups)[0];
  index: number;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
  onCategoryEnter: (cat: string) => void;
  onCategoryLeave: () => void;
}

function TiltCard({
  group,
  index,
  onSkillEnter,
  onSkillLeave,
  onCategoryEnter,
  onCategoryLeave,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    cardRef.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    glowRef.current.style.background = `radial-gradient(180px circle at ${x}px ${y}px, rgba(232,146,60,0.12), transparent 70%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateZ(0)";
    glowRef.current.style.background = "transparent";
    onCategoryLeave();
  };

  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wrapRef.current) {
          wrapRef.current.style.opacity = "1";
          wrapRef.current.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative glass rounded-2xl p-6 cursor-default h-full overflow-hidden transition-all duration-200 hover:border-[rgba(232,146,60,0.25)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-150" />

        {/* Category header — hover highlights entire cluster in 3D */}
        <div
          className="flex items-center gap-2.5 mb-5 cursor-default"
          onMouseEnter={() => onCategoryEnter(group.category)}
          onMouseLeave={onCategoryLeave}
        >
          <div className="w-7 h-7 rounded-lg bg-[rgba(232,146,60,0.12)] text-[#E8923C] flex items-center justify-center">
            {group.icon}
          </div>
          <span className="text-[#F5F0EB] font-semibold text-sm tracking-tight">{group.category}</span>
        </div>

        {/* Skill badges — hover highlights matching 3D node */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1.5 rounded-lg bg-[rgba(232,146,60,0.07)] border border-[rgba(232,146,60,0.12)] text-[#9A8F83] text-xs font-mono hover:text-[#E8923C] hover:border-[rgba(232,146,60,0.3)] transition-colors duration-200 cursor-default"
              onMouseEnter={() => onSkillEnter(skill)}
              onMouseLeave={onSkillLeave}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && headerRef.current) {
          headerRef.current.querySelectorAll(".reveal-item").forEach((el, i) => {
            (el as HTMLElement).style.animationDelay = `${i * 100}ms`;
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
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-36 ambient-bg">
      {/* Top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.15)] to-transparent" />

      {/* Left ambient glow */}
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-[radial-gradient(ellipse,rgba(232,146,60,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* 3D constellation background — fades in on scroll, pointer-events disabled */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <ApiConstellationScene activeSkill={activeSkill} activeCategory={activeCategory} />
      </motion.div>

      {/* Content — sits above the canvas */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div ref={headerRef} className="mb-14">
          <p className="reveal-item text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            Stack
          </p>
          <h2 className="reveal-item text-3xl md:text-4xl font-bold text-[#F5F0EB]">
            Skills &amp; technologies
          </h2>
          <p className="reveal-item text-[#9A8F83] text-base mt-3 max-w-xl leading-relaxed">
            Hover a badge to illuminate its node. Hover a category to light up the cluster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <TiltCard
              key={group.category}
              group={group}
              index={i}
              onSkillEnter={setActiveSkill}
              onSkillLeave={() => setActiveSkill("")}
              onCategoryEnter={setActiveCategory}
              onCategoryLeave={() => setActiveCategory("")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
