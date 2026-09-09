const skills = [
  ["01", "JavaScript", "LANGUAGE"],
  ["02", "React", "FRONTEND"],
  ["03", "Node.js", "BACKEND"],
  ["04", "Express", "BACKEND"],
  ["05", "PostgreSQL", "DATABASE"],
  ["06", "HTML / CSS", "FRONTEND"],
  ["07", "Git / GitHub", "TOOLS"],
  ["08", "REST APIs", "ARCHITECTURE"],
  ["09", "Responsive UI", "DESIGN"],
];

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">

        <div className="section-topline">
          <span>02</span>
          <i />
          <span>SKILLS</span>
        </div>

        <div className="skills-intro">
          <h2>
            Tools I use
            <br />
            <span>to build.</span>
          </h2>

          <p>
            A practical stack focused on building
            complete web applications from interface
            to database.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map(([number, name, category]) => (
            <div className="skill-card" key={name}>
              <span>{number}</span>

              <div>
                <strong>{name}</strong>
                <small>{category}</small>
              </div>

              <span className="skill-arrow">↗</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
