export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">

        <div className="section-topline">
          <span>04</span>
          <i />
          <span>CONTACT</span>
        </div>

        <div className="contact-box">

          <div>
            <span className="contact-label">
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let's build
              <br />
              <span>something useful.</span>
            </h2>
          </div>

          <div className="contact-right">

            <p>
              I'm always interested in learning,
              building and working on interesting
              digital products.
            </p>

            <a
              href="mailto:hello@manoz.dev"
              className="contact-button"
            >
              Get in touch
              <span>↗</span>
            </a>

          </div>

        </div>

        <footer className="site-footer">
          <span>MANOZ</span>
          <span>FULL-STACK DEVELOPER</span>
          <span>© 2026</span>
        </footer>

      </div>
    </section>
  );
}
