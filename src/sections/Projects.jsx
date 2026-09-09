import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/projects.css";

const projects = [
  {
    number: "01",
    name: "AquaFlow",
    type: "BUSINESS MANAGEMENT",
    description:
      "A water delivery management system designed to track customers, deliveries, payments and daily business activity.",
    tags: ["React", "Node.js", "PostgreSQL"],
    video: "aquaflow-demo.mp4",
    github: "https://github.com/Manoz-code/Aquaflow-web-version",
  },
  {
    number: "02",
    name: "Ride Platform",
    type: "MOBILITY PLATFORM",
    description:
      "A full-stack ride platform concept with customer, rider and administration experiences.",
    tags: ["React", "Express", "PostgreSQL"],
    video: "rideapp-demo.mp4",
    github: "https://github.com/Manoz-code/ride-platform-",
  },
  {
    number: "03",
    name: "Developer Portfolio",
    type: "PERSONAL PROJECT",
    description:
      "A cinematic responsive portfolio focused on projects, technology and the journey of becoming a developer.",
    tags: ["React", "CSS", "Vite"],
    github: "https://github.com/Manoz-code/portfolio",
  },
];

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setActiveVideo(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeVideo]);

  const openVideo = (project) => {
    if (!project.video) return;

    setActiveVideo({
      src: `${import.meta.env.BASE_URL}videos/${project.video}`,
      name: project.name,
    });

    window.history.pushState(
      { videoOpen: true },
      "",
      window.location.href
    );
  };

  const closeVideo = () => {
    if (activeVideo) {
      window.history.back();
    }
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="container">

        <div className="section-topline">
          <span>03</span>
          <i />
          <span>PROJECTS</span>
        </div>

        <div className="projects-heading">
          <h2>
            Things I've
            <br />
            <span>been building.</span>
          </h2>

          <p>
            Real projects built while learning,
            experimenting and turning ideas into
            working software.
          </p>
        </div>

        <div className="projects-list">

          {projects.map((project) => (
            <article
              className="project-card"
              key={project.name}
            >

              <div className="project-number">
                {project.number}
              </div>

              <div className="project-main">

                <div className="project-preview">

                  {project.video ? (
                    <video
                      className={`project-video ${
                        project.name === "AquaFlow"
                          ? "project-video-portrait"
                          : "project-video-landscape"
                      }`}
                      src={`${import.meta.env.BASE_URL}videos/${project.video}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => openVideo(project)}
                    />
                  ) : (
                    <div className="project-preview-placeholder">
                      <span>03</span>
                      <b>PROJECT</b>
                    </div>
                  )}

                  {project.video && (
                    <div className="project-live">
                      <span />
                      LIVE PREVIEW
                    </div>
                  )}

                </div>

                <span className="project-type">
                  {project.type}
                </span>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.github}
                    className="project-github"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} source code on GitHub`}
                  >
                    <span className="github-mark">GH</span>
                    <span>VIEW SOURCE</span>
                    <span className="github-arrow">↗</span>
                  </a>
                </div>

              </div>

              <div className="project-open">
                ↗
              </div>

            </article>
          ))}

        </div>

      </div>

      {activeVideo &&
        createPortal(
          <div
            className="video-lightbox"
            onClick={closeVideo}
          >
            <div
              className="video-lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="video-lightbox-close"
                onClick={closeVideo}
                aria-label="Close video"
              >
                ×
              </button>

              <video
                className="video-lightbox-video"
                src={activeVideo.src}
                controls
                autoPlay
                muted
                playsInline
              />

              <div className="video-lightbox-title">
                {activeVideo.name}
                <span>PROJECT DEMO</span>
              </div>
            </div>
          </div>,
          document.body
        )}

    </section>
  );
}
