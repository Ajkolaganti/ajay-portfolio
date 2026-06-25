"use client";

import { useEffect, useState } from "react";

const SOUND_PREFERENCE_KEY = "ajay-portfolio-sound-enabled";
const SOUND_TOGGLE_EVENT = "portfolio-toggle-sound";
const SOUND_STATE_EVENT = "portfolio-sound-state";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [muted, setMuted] = useState(false);

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

  useEffect(() => {
    try {
      setMuted(window.localStorage.getItem(SOUND_PREFERENCE_KEY) === "off");
    } catch {
      setMuted(false);
    }

    const handleSoundState = (event: Event) => {
      const customEvent = event as CustomEvent<{ muted: boolean }>;
      setMuted(Boolean(customEvent.detail?.muted));
    };

    window.addEventListener(SOUND_STATE_EVENT, handleSoundState as EventListener);

    return () => {
      window.removeEventListener(
        SOUND_STATE_EVENT,
        handleSoundState as EventListener
      );
    };
  }, []);

  const requestSoundToggle = () => {
    window.dispatchEvent(new Event(SOUND_TOGGLE_EVENT));
  };

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
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={requestSoundToggle}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(232,146,60,0.3)] text-[#9A8F83] hover:text-[#E8923C] hover:border-[#E8923C] transition-all duration-200 cursor-pointer"
          >
            {muted ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4.243-4.243M12 18l4.243-4.243M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          <a
            href="mailto:kolagantiaj1@gmail.com"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[rgba(232,146,60,0.3)] text-[#E8923C] text-xs font-semibold tracking-wide hover:bg-[rgba(232,146,60,0.1)] hover:border-[#E8923C] transition-all duration-200 cursor-pointer"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Hire Me
          </a>
        </div>

        {/* Mobile menu (hamburger — links only on small) */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={requestSoundToggle}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(232,146,60,0.3)] text-[#9A8F83] hover:text-[#E8923C] hover:border-[#E8923C] transition-all duration-200 cursor-pointer"
          >
            {muted ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4.243-4.243M12 18l4.243-4.243M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

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
