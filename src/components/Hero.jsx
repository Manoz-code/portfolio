import { useEffect, useState } from "react";
import Scene from "../three/Scene";

function CinematicLoader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING 3D EXPERIENCE");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 3200;
    const start = performance.now();

    let animationFrame;
    let finishTimer;
    let hideTimer;

    const animate = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);

      const eased =
        raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      const value = Math.min(100, Math.round(eased * 100));

      setProgress(value);

      if (value < 25) {
        setPhase("INITIALIZING 3D EXPERIENCE");
      } else if (value < 55) {
        setPhase("LOADING VISUAL SYSTEMS");
      } else if (value < 82) {
        setPhase("BUILDING DIGITAL ENVIRONMENT");
      } else if (value < 100) {
        setPhase("CALIBRATING EXPERIENCE");
      } else {
        setPhase("EXPERIENCE READY");

        finishTimer = setTimeout(() => {
          setHidden(true);

          hideTimer = setTimeout(() => {
            onFinished();
          }, 1100);
        }, 450);

        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(finishTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinished]);

  return (
    <div className={`cinematic-loader ${hidden ? "loaded" : ""}`}>
      <div className="loader-grid" />

      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      <div className="loader-scan-line" />

      <div className="cinematic-loader-content">

        <div className="cinematic-loader-top">
          <span>PORTFOLIO / 3D</span>
          <span>SYS.01</span>
        </div>

        <div className="cinematic-loader-center">

          <div className="cinematic-loader-logo">
            MANOZ<span>.</span>
          </div>

          <div className="loader-orb">
            <div className="loader-orb-inner" />
          </div>

          <div className="cinematic-loader-label">
            <span>{phase}</span>

            <span className="cinematic-loader-percent">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <div className="cinematic-loader-track">

            <div
              className="cinematic-loader-bar"
              style={{ width: `${progress}%` }}
            />

            <div
              className="cinematic-loader-glow"
              style={{ left: `${progress}%` }}
            />

          </div>

          <div className="cinematic-loader-subtext">
            <span>RENDER ENGINE / ONLINE</span>
            <span>
              {progress >= 100 ? "READY" : "PROCESSING"}
            </span>
          </div>

        </div>

        <div className="cinematic-loader-bottom">
          <span>FULL-STACK DEVELOPER</span>
          <span>NEPAL</span>
          <span>2026</span>
        </div>

      </div>
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);

  return (
    <section className="hero">

      {!ready && (
        <CinematicLoader
          onFinished={() => setReady(true)}
        />
      )}

      <div
        className={`hero-background ${
          ready ? "scene-ready" : ""
        }`}
      >
        <Scene />
      </div>

      <div
        className={`hero-content container ${
          ready ? "hero-ready" : ""
        }`}
      >

        <div className="hero-copy">

          <div className="hero-eyebrow">
            <span className="status-dot" />
            Available for opportunities
          </div>

          <h1>
            I build
            <br />
            <span>digital systems.</span>
          </h1>

          <p>
            Full-stack developer focused on building
            practical, scalable web applications from
            idea to deployment.
          </p>

          <div className="hero-actions">

            <a
              href="#projects"
              className="button button-primary"
            >
              View my work <span>↗</span>
            </a>

            <a
              href="#contact"
              className="button button-secondary"
            >
              Let's talk
            </a>

          </div>

        </div>

        <div className="hero-meta">
          <span>NEPAL</span>
          <span>FULL-STACK DEVELOPER</span>
          <span>2026</span>
        </div>

      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>

    </section>
  );
}
