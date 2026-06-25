"use client";

import { useEffect, useState } from "react";

type IntroScreenProps = {
  children: React.ReactNode;
};

export default function IntroScreen({ children }: IntroScreenProps) {
  const [phase, setPhase] = useState<"loading" | "opening" | "done">("loading");

  useEffect(() => {
    const openTimer = window.setTimeout(() => {
      setPhase("opening");
    }, 900);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, 1600);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  const isDone = phase === "done";
  const isOpening = phase === "opening";

  return (
    <>
      <div className={`intro-content ${isDone ? "is-ready" : ""}`}>{children}</div>

      {!isDone && (
        <div
          className={`intro-overlay ${isOpening ? "is-opening" : ""}`}
          aria-hidden="true"
        >
          <div className="intro-noise" />
          <div className="intro-vignette" />

          <div className="intro-center">
            <span className="intro-logo" aria-hidden="true">
              AK.
            </span>
            <p className="intro-kicker">Senior SQL &amp; API Developer</p>
            <h1 className="intro-title">Ajay Kolaganti</h1>
            <p className="intro-subtitle">Loading experience...</p>
            <div className="intro-progress-track">
              <div className="intro-progress-fill" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}