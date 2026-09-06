import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    return (
      <main className="project-page">
        <div className="container">
          <p>Project not found.</p>
          <Link to="/">← Back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-page">
      <div className="container">
        <Link className="project-back" to="/">
          ← Back to portfolio
        </Link>

        <div className="project-page-header">
          <span className="eyebrow">
            {project.number} — {project.type}
          </span>

          <h1>{project.title}</h1>

          <p>{project.description}</p>
        </div>

        <div
          className="project-page-visual"
          style={{ "--accent": project.color }}
        >
          <div className="project-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
            </div>

            <div className="window-content">
              <span>PROJECT</span>
              <strong>{project.title}</strong>
              <small>Built with {project.stack.join(" · ")}</small>
            </div>
          </div>
        </div>

        <section className="project-details">
          <div>
            <span className="eyebrow">STACK</span>

            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">ABOUT</span>

            <p>
              This project is part of my practical development work,
              focused on solving real-world problems with clean
              application architecture and reliable user workflows.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
