import { useEffect, useRef, useState } from "react";
import "../styles/loading.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const audioContext = useRef(null);
  const audioStarted = useRef(false);

  const startExperience = () => {
    if (started) return;

    setStarted(true);

    try {
      const AudioCtx =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioCtx) {
        return;
      }

      const ctx = new AudioCtx();
      audioContext.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      audioStarted.current = true;

      const master = ctx.createGain();

      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(
        0.08,
        ctx.currentTime + 0.5
      );

      master.connect(ctx.destination);

      /*
       * DEEP STARTUP PULSE
       */
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();

      bass.type = "sine";

      bass.frequency.setValueAtTime(
        45,
        ctx.currentTime
      );

      bass.frequency.exponentialRampToValueAtTime(
        90,
        ctx.currentTime + 2
      );

      bassGain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
      );

      bassGain.gain.exponentialRampToValueAtTime(
        0.25,
        ctx.currentTime + 0.45
      );

      bassGain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 2.6
      );

      bass.connect(bassGain);
      bassGain.connect(master);

      bass.start(ctx.currentTime);
      bass.stop(ctx.currentTime + 2.7);

      /*
       * FUTURISTIC SHIMMER
       */
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();

      shimmer.type = "triangle";

      shimmer.frequency.setValueAtTime(
        180,
        ctx.currentTime
      );

      shimmer.frequency.exponentialRampToValueAtTime(
        1000,
        ctx.currentTime + 3
      );

      shimmerGain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
      );

      shimmerGain.gain.exponentialRampToValueAtTime(
        0.045,
        ctx.currentTime + 1
      );

      shimmerGain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 3.2
      );

      shimmer.connect(shimmerGain);
      shimmerGain.connect(master);

      shimmer.start(ctx.currentTime);
      shimmer.stop(ctx.currentTime + 3.3);

    } catch (error) {
      console.log("Audio unavailable:", error);
    }
  };

  useEffect(() => {
    if (!started) return;

    let current = 0;

    const timer = setInterval(() => {
      const remaining = 100 - current;

      const step =
        remaining > 35
          ? Math.floor(Math.random() * 7) + 4
          : remaining > 10
            ? Math.floor(Math.random() * 4) + 2
            : 1;

      current = Math.min(
        current + step,
        100
      );

      setProgress(current);

      /*
       * LOADING COMPLETE
       */
      if (current >= 100) {
        clearInterval(timer);

        const ctx = audioContext.current;

        if (ctx) {
          try {
            const playTone = (
              frequency,
              delay
            ) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();

              osc.type = "sine";

              osc.frequency.value =
                frequency;

              gain.gain.setValueAtTime(
                0.0001,
                ctx.currentTime + delay
              );

              gain.gain.exponentialRampToValueAtTime(
                0.1,
                ctx.currentTime +
                  delay +
                  0.03
              );

              gain.gain.exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime +
                  delay +
                  0.5
              );

              osc.connect(gain);
              gain.connect(ctx.destination);

              osc.start(
                ctx.currentTime + delay
              );

              osc.stop(
                ctx.currentTime +
                  delay +
                  0.55
              );
            };

            // Completion chime
            playTone(523.25, 0);
            playTone(659.25, 0.12);
            playTone(783.99, 0.24);
            playTone(1046.5, 0.38);

          } catch (error) {
            console.log(
              "Completion sound unavailable:",
              error
            );
          }
        }

        setTimeout(() => {
          setLeaving(true);
        }, 900);
      }
    }, 75);

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current
          .close()
          .catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className={`loading-screen ${
        leaving ? "loading-leave" : ""
      }`}
      onClick={startExperience}
    >
      <div className="loading-grid" />
      <div className="loading-noise" />
      <div className="loading-scanline" />

      <div className="loading-corner loading-corner-tl" />
      <div className="loading-corner loading-corner-tr" />
      <div className="loading-corner loading-corner-bl" />
      <div className="loading-corner loading-corner-br" />

      <div className="loading-content">

        {/* TOP */}
        <div className="loading-top">
          <span>PORTFOLIO / 2026</span>
          <span>
            {started ? "ONLINE" : "SYSTEM READY"}
          </span>
        </div>

        {/* CENTER */}
        <div className="loading-center">

          <div className="loading-index">
            <span>00</span>
            <i />
            <span>MANOZ</span>
          </div>

          <h1>
            MANOZ<span>.</span>
          </h1>

          <div className="loading-subtitle">
            FULL-STACK DEVELOPER
          </div>

          <div className="loading-orbit">
            <span />
            <span />
            <span />
          </div>

          {!started && (
            <button
              className="loading-enter"
              onClick={(event) => {
                event.stopPropagation();
                startExperience();
              }}
            >
              <span className="loading-enter-dot" />
              ENTER EXPERIENCE
            </button>
          )}

        </div>

        {/* BOTTOM */}
        <div className="loading-bottom">

          <div className="loading-status">
            <span>
              {!started
                ? "SYSTEM READY"
                : progress < 100
                  ? "INITIALIZING EXPERIENCE"
                  : "EXPERIENCE READY"}
            </span>

            <strong>
              {String(progress).padStart(
                3,
                "0"
              )}
              %
            </strong>
          </div>

          <div className="loading-track">
            <div
              className="loading-progress"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="loading-meta">
            <span>SYSTEM / WEB</span>
            <span>
              {started
                ? "RENDERING INTERFACE"
                : "AWAITING INPUT"}
            </span>
            <span>
              {progress >= 100
                ? "READY"
                : "01"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}