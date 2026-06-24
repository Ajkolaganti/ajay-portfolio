"use client";

import { useEffect, useRef, FormEvent, useState } from "react";

const socials = [
  {
    label: "Email",
    value: "kolagantiaj1@gmail.com",
    href: "mailto:kolagantiaj1@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "kolagantiaj",
    href: "https://linkedin.com/in/kolagantiaj",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "Ajkolaganti",
    href: "https://github.com/Ajkolaganti",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.querySelectorAll(".reveal-item").forEach((el, i) => {
            (el as HTMLElement).style.animationDelay = `${i * 100}ms`;
            el.classList.add("fade-up");
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    setStatus("sending");
    // Open mailto as a simple fallback — no server needed
    const body = `From: ${name} (${email})%0A%0A${message}`;
    window.location.href = `mailto:kolagantiaj1@gmail.com?subject=Portfolio Contact from ${name}&body=${body}`;
    setTimeout(() => setStatus("sent"), 800);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-36 ambient-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(232,146,60,0.15)] to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,146,60,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div ref={contentRef} className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="reveal-item text-[#E8923C] text-xs font-mono uppercase tracking-[0.25em] mb-3">
            Contact
          </p>
          <h2 className="reveal-item text-3xl md:text-4xl font-bold text-[#F5F0EB] mb-4">
            Let&apos;s build something solid.
          </h2>
          <p className="reveal-item text-[#9A8F83] text-base leading-relaxed max-w-lg mx-auto">
            Open to senior backend/API engineering roles. Based in Delray Beach, FL — available remote or hybrid.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Social links */}
          <div className="reveal-item flex flex-col gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass flex items-center gap-4 p-5 rounded-2xl hover:border-[rgba(232,146,60,0.3)] hover:bg-[rgba(232,146,60,0.04)] transition-all duration-200 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(232,146,60,0.1)] text-[#E8923C] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(232,146,60,0.18)] transition-colors duration-200">
                  {s.icon}
                </div>
                <div>
                  <div className="text-[10px] text-[#9A8F83] uppercase tracking-wider font-mono mb-0.5">{s.label}</div>
                  <div className="text-[#F5F0EB] text-sm font-medium group-hover:text-[#E8923C] transition-colors duration-200">
                    {s.value}
                  </div>
                </div>
                <svg className="w-4 h-4 text-[#9A8F83] ml-auto group-hover:text-[#E8923C] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className="reveal-item glass rounded-2xl p-7">
            <h3 className="text-[#F5F0EB] font-semibold text-base mb-5">Send a message</h3>
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[rgba(232,146,60,0.15)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#E8923C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#F5F0EB] font-medium">Message opened in your mail client.</p>
                <p className="text-[#9A8F83] text-sm">Talk soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-[#9A8F83] text-xs font-mono uppercase tracking-wider mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full bg-[rgba(232,146,60,0.06)] border border-[rgba(232,146,60,0.12)] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm placeholder-[#9A8F83] outline-none focus:border-[rgba(232,146,60,0.4)] focus:bg-[rgba(232,146,60,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#9A8F83] text-xs font-mono uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full bg-[rgba(232,146,60,0.06)] border border-[rgba(232,146,60,0.12)] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm placeholder-[#9A8F83] outline-none focus:border-[rgba(232,146,60,0.4)] focus:bg-[rgba(232,146,60,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#9A8F83] text-xs font-mono uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about the role or project..."
                    className="w-full bg-[rgba(232,146,60,0.06)] border border-[rgba(232,146,60,0.12)] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm placeholder-[#9A8F83] outline-none focus:border-[rgba(232,146,60,0.4)] focus:bg-[rgba(232,146,60,0.08)] transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl bg-[#E8923C] text-[#0D0D0D] font-semibold text-sm tracking-wide hover:bg-[#f5a050] disabled:opacity-60 transition-all duration-200 hover:shadow-[0_0_24px_rgba(232,146,60,0.35)] cursor-pointer"
                >
                  {status === "sending" ? "Opening mail client..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-[rgba(232,146,60,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#9A8F83] text-xs font-mono">
          © 2025 Ajay Kolaganti. Built with Next.js + React Three Fiber.
        </span>
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[#9A8F83] hover:text-[#E8923C] transition-colors duration-200 cursor-pointer"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
