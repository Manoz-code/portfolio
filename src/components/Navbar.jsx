import { useState } from "react";
import "../styles/navbar.css";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-nav ${open ? "nav-open" : ""}`}>
      <div className="nav-inner">

        <a
          href="#home"
          className="nav-logo"
          onClick={() => setOpen(false)}
        >
          MANOZ
        </a>

        <nav className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="nav-talk"
        >
          Let's Talk
        </a>

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>

      </div>

      <nav className="mobile-nav">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        <a
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let's Talk ↗
        </a>
      </nav>
    </header>
  );
}
