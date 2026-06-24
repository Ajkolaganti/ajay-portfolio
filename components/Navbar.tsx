"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Track active section (about maps to idcard section)
      const sections = ["hero", "about", "experience", "skills", "education", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        scrolled
          ? "glass rounded-2xl px-5 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "px-5 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-bold text-[#F5F0EB] tracking-tight text-sm md:text-base hover:text-[#E8923C] transition-colors duration-200 cursor-pointer"
        >
          AK<span className="text-[#E8923C]">.</span>
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#E8923C]"
                      : "text-[#9A8F83] hover:text-[#F5F0EB]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="mailto:kolagantiaj1@gmail.com"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[rgba(232,146,60,0.3)] text-[#E8923C] text-xs font-semibold tracking-wide hover:bg-[rgba(232,146,60,0.1)] hover:border-[#E8923C] transition-all duration-200 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Hire Me
        </a>

        {/* Mobile menu (hamburger — links only on small) */}
        <div className="md:hidden flex items-center gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-[#9A8F83] hover:text-[#E8923C] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
