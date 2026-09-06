const skills = [
  ["01", "JavaScript", "Language"],
  ["02", "React", "Frontend"],
  ["03", "Node.js", "Backend"],
  ["04", "Express", "API"],
  ["05", "PostgreSQL", "Database"],
  ["06", "Git", "Workflow"],
];

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="eyebrow">02 — STACK</div>

        <div className="skills-heading">
          <h2>
            Tools I use
            <br />
            to build things.
          </h2>
        </div>

        <div className="skills-grid">
          {skills.map(([number, name, type]) => (
            <article className="skill-card" key={name}>
              <span>{number}</span>
              <strong>{name}</strong>
              <small>{type}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
