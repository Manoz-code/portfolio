import { useEffect, useState } from "react";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = links
        .map(([, href]) => document.querySelector(href))
        .filter(Boolean);

      let current = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.45) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner container">
        <a className="logo" href="#">
          MANOZ<span>.</span>
        </a>

        <nav>
          {links.map(([label, href]) => {
            const id = href.slice(1);

            return (
              <a
                key={label}
                href={href}
                className={active === id ? "active" : ""}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a className="nav-contact" href="#contact">
          Let's talk <span>↗</span>
        </a>
      </div>
    </header>
  );
}
