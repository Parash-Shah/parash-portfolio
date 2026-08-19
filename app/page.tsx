import { ProjectCard } from "@/components/ProjectCard";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { SystemFlow } from "@/components/SystemFlow";
import { projects } from "@/data/projects";

const stats = [
  ["13", "High-severity vulnerabilities remediated"],
  ["8", "Data sources covered by reliability monitoring"],
  ["251 / 300", "Partial-record scenario surfaced by stronger validation"],
  ["16", "Automated tests validating the completed event platform"],
];

const impactAreas = [
  {
    title: "Cross-account security",
    description:
      "Built request-time validation with IAM, STS, CloudTrail, service-linked roles, and AWS SDKs to catch invalid onboarding configurations earlier.",
  },
  {
    title: "Infrastructure hardening",
    description:
      "Remediated high-severity dependency findings and delivered CDK and pipeline fixes across IAM, KMS, trusted services, and deployment readiness.",
  },
  {
    title: "Operational detection",
    description:
      "Created CloudWatch metering, per-source alarms, composite detection, and expected-row checks for silent ETL and partition-level data loss.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Parash Portfolio home">PS<span>.</span></a>
        <div className="nav-links" aria-label="Portfolio sections">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="https://github.com/Parash-Shah" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="shell hero__content">
          <div className="hero-glow hero-glow--one" />
          <div className="hero-glow hero-glow--two" />
          <p className="kicker">Software Development Engineer · Cloud Security Infrastructure</p>
          <h1>Engineering cloud defenses that <em>catch failure before impact.</em></h1>
          <p className="hero-copy">
            I&apos;m Parash Shah, a Software Development Engineer at AWS. I build production cloud security infrastructure for Amazon Security Lake and AWS Security Hub, with a focus on secure cross-account access, operational detection, and multi-region reliability.
          </p>
          <div className="hero-actions">
            <a className="button" href="#projects">See what I&apos;ve built</a>
            <a className="text-link" href="#work">View production impact <span>↓</span></a>
          </div>
          <a
            className="system-flow-link"
            href="https://github.com/Parash-Shah/Distributed-event-reliability-platform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the Distributed Event Reliability Platform on GitHub (opens in a new tab)"
          >
            <span className="system-flow-link__label">Featured project · View on GitHub <span aria-hidden="true">↗</span></span>
            <SystemFlow />
          </a>
        </div>
      </section>

      <section className="section shell" id="story">
        <div className="section-index">01 / STORY</div>
        <div className="story-grid">
          <div>
            <p className="kicker">Engineer. Marine. Reliability builder.</p>
            <h2>From mission readiness to cloud resilience.</h2>
          </div>
          <div className="story-copy">
            <p>
              My path spans mechanical engineering, operational leadership in the U.S. Marine Corps, and cloud security engineering at AWS. Across each role, I&apos;ve learned to understand constraints, anticipate failure, and build dependable infrastructure where accuracy and readiness matter.
            </p>
            <p>
              Outside engineering, I love playing tennis, cooking, trying delicious recipes, and enjoying good food. Your Food Lab (YFL) is my favorite cooking channel and a regular source of inspiration in the kitchen.
            </p>
            <p className="story-role">U.S. Marine Corps · Fuel Specialist &amp; Embarkation Manager · 2018–2025</p>
            <div className="timeline">
              <span>Mechanical Engineering</span><i>→</i><span>U.S. Marine Corps</span><i>→</i><span>AWS</span><i>→</i><span>Cloud Security</span><i>→</i><span>Reliable Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--panel" id="work">
        <div className="shell">
          <div className="section-index">02 / PRODUCTION IMPACT</div>
          <div className="section-heading-row">
            <div>
              <p className="kicker">Security and reliability at AWS</p>
              <h2>Cloud safeguards backed by measurable outcomes.</h2>
            </div>
            <p className="section-note">Public-safe results from vulnerability remediation, security telemetry, automated validation, and data-pipeline monitoring.</p>
          </div>
          <div className="role-banner">
            <div>
              <span>Amazon Web Services</span>
              <strong>Software Development Engineer</strong>
            </div>
            <div>
              <span>Boston, MA</span>
              <strong>Aug 2025 — Present</strong>
            </div>
          </div>
          <div className="stats-grid">
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="impact-grid">
            {impactAreas.map((area) => (
              <article className="impact-card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="projects">
        <div className="section-index">03 / ENGINEERING LAB</div>
        <div className="section-heading-row">
          <div>
            <p className="kicker">Built. Tested. Documented.</p>
            <h2>Reliability patterns proven in code.</h2>
          </div>
          <p className="section-note">Each project makes the architecture, tradeoffs, failure modes, validation evidence, and lessons learned visible.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
        </div>
      </section>

      <section className="section ai-section" id="ai">
        <div className="shell ai-card">
          <div>
            <p className="kicker">Interactive portfolio</p>
            <h2>Ask my portfolio.</h2>
            <p>
              Ask about project architecture, design choices, engineering experience, reliability outcomes, cloud security work, or simply about him. Answers use only public portfolio information.
            </p>
          </div>
          <PortfolioAssistant />
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <div>
          <p className="kicker">Build. Validate. Improve.</p>
          <h2>Let&apos;s build infrastructure that earns trust.</h2>
        </div>
        <div className="footer-contact">
          <div className="footer-links">
            <a className="footer-link" href="https://github.com/Parash-Shah" target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <strong>https://github.com/Parash-Shah</strong>
            </a>
            <a className="footer-link" href="https://www.linkedin.com/in/parash-shah-3b3891279" target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <strong>https://www.linkedin.com/in/parash-shah-3b3891279</strong>
            </a>
            <a className="footer-link" href="tel:+15512549284">
              <span>Phone</span>
              <strong>+1 (551) 254-9284</strong>
            </a>
            <a className="footer-link" href="mailto:parash5301@yahoo.com">
              <span>Email</span>
              <strong>parash5301@yahoo.com</strong>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
