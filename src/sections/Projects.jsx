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
    </section>
  );
}
