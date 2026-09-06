import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <div className="reveal">
          <About />
        </div>

        <div className="reveal">
          <Skills />
        </div>

        <div className="reveal">
          <Projects />
        </div>

        <div className="reveal">
          <Contact />
        </div>
      </main>
    </>
  );
}
