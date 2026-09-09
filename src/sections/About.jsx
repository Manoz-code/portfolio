import workspaceImage from "../assets/workspace.png";

export default function About() {
  return (
    <section className="section about-section" id="about">

      <div className="about-workspace-image">
        <img src={workspaceImage} alt="Development workspace" />
      </div>

      <div className="container">

        <div className="section-topline">
          <span>01</span>
          <i />
          <span>ABOUT</span>
        </div>

        <div className="about-grid">

          <div className="about-heading">
            <h2>
              Curious by nature.
              <br />
              <span>Builder by choice.</span>
            </h2>
          </div>

          <div className="about-content">

            <p className="about-lead">
              I'm a developer who enjoys understanding
              how technology works and turning ideas
              into real applications.
            </p>

            <p>
              I enjoy building useful products, solving
              practical problems and continuously learning
              new technologies.
            </p>

            <div className="about-points">

              <div className="about-point">
                <strong>&lt;/&gt;</strong>
                <div>
                  <b>Web & App Development</b>
                  <small>Building real products</small>
                </div>
              </div>

              <div className="about-point">
                <strong>◇</strong>
                <div>
                  <b>Problem Solving</b>
                  <small>Thinking beyond the code</small>
                </div>
              </div>

              <div className="about-point">
                <strong>△</strong>
                <div>
                  <b>Continuous Learning</b>
                  <small>Always improving</small>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
