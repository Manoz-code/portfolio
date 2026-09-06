import { projects } from "../data/projects";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="eyebrow">03 — SELECTED WORK</div>

        <div className="projects-heading">
          <h2>
            Things I've
            <br />
            been building.
          </h2>

          <p>
            A selection of applications built while learning,
            experimenting and solving real problems.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.title}
              style={{ "--accent": project.color }}
            >
              <div className="project-top">
                <span>{project.number}</span>
                <span>{project.year}</span>
              </div>

              <div className="project-visual">
                <div className="project-screen">
                  <div className="screen-dot" />
                  <div className="screen-line large" />
                  <div className="screen-line" />
                  <div className="screen-line short" />
                  <div className="screen-block" />
                </div>
              </div>

              <div className="project-info">
                <span className="project-type">
                  {project.type}
                </span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
