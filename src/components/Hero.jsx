import "../styles/hero.css";
import profileImage from "../assets/profile.png";

const tech = [
  { name: "React", icon: "⚛", className: "tech-react" },
  { name: "Node.js", icon: "⬡", className: "tech-node" },
  { name: "PostgreSQL", icon: "◉", className: "tech-postgres" },
  { name: "Express", icon: "ex", className: "tech-express" },
];

export default function Hero() {
  return (
    <section className="hero-image-style" id="home">

      <div className="hero-image-overlay" />

      <div className="hero-tech">
        {tech.map((item) => (
          <div
            key={item.name}
            className={`tech-card ${item.className}`}
          >
            <span className="tech-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Main profile image */}
      <div className="hero-photo">
        <img
          src={profileImage}
          alt=""
        />
        <div className="hero-photo-glow" />
      </div>

      <div className="hero-container">

        <div className="hero-text">

          <div className="hero-role">
            <span>FULL-STACK DEVELOPER</span>
            <i />
          </div>

          <h1>
            I build
            <br />
            <span>digital worlds.</span>
          </h1>

          <p>
            I design and build modern digital products,
            from powerful backends to interactive user
            experiences.
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="hero-button hero-button-primary"
            >
              Explore My Work
              <span>↗</span>
            </a>

            <a
              href="#about"
              className="hero-button hero-button-outline"
            >
              About Me
            </a>
          </div>

        </div>

        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <i />
        </div>

      </div>

      <div className="hero-bottom-labels">
        <span>WEB DEVELOPMENT</span>
        <span>PRODUCT BUILDING</span>
        <span>2026</span>
      </div>

    </section>
  );
}
