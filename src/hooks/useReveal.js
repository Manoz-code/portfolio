import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal");

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "reveal-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
