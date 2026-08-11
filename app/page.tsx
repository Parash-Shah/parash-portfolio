import { ProjectCard } from "@/components/ProjectCard";
import { SystemFlow } from "@/components/SystemFlow";
import { ContactProvider, ContactTrigger } from "@/components/ContactModal";
import { projects } from "@/data/projects";

const stats = [
  ["13", "High-severity vulnerabilities remediated"],
  ["8", "Data sources covered by reliability monitoring"],
  ["251 / 300", "Partial-record scenario surfaced by stronger validation"],
  ["AWS", "Production cloud and security engineering"],
];

export default function Home() {
  return (
    <ContactProvider>
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Parash Portfolio home">PS<span>.</span></a>
        <div className="nav-links" aria-label="Portfolio sections">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="https://github.com/Parash-Shah" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <ContactTrigger className="button button--ghost">Let&apos;s talk</ContactTrigger>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
        <p className="kicker">Software Engineer @ AWS</p>
        <h1>Building systems that keep working <em>when things fail.</em></h1>
        <p className="hero-copy">
          I&apos;m Parash Shah. I build secure, reliable cloud systems and explore the engineering patterns behind distributed infrastructure, observability, security, and AI-native operations.
        </p>
        <div className="hero-actions">
          <a className="button" href="#projects">Explore my systems</a>
          <a className="text-link" href="#story">Read my story <span>↓</span></a>
        </div>
        <SystemFlow />
      </section>

      <section className="section shell" id="story">
        <div className="section-index">01 / STORY</div>
        <div className="story-grid">
          <div>
            <p className="kicker">Engineer. Marine. Systems builder.</p>
            <h2>Different disciplines. One systems mindset.</h2>
          </div>
          <div className="story-copy">
            <p>
              My path moved through mechanical engineering, operational leadership in the U.S. Marine Corps, and software engineering at AWS. The common thread is systems thinking: understand the constraints, anticipate failure, and make the whole system more dependable.
            </p>
            <div className="timeline">
              <span>Mechanical Engineering</span><i>→</i><span>U.S. Marine Corps</span><i>→</i><span>AWS</span><i>→</i><span>Distributed Systems</span><i>→</i><span>AI Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--panel" id="work">
        <div className="shell">
          <div className="section-index">02 / PRODUCTION ENGINEERING</div>
          <div className="section-heading-row">
            <div>
              <p className="kicker">Work that operates under real constraints</p>
              <h2>Reliability, security, and cloud infrastructure.</h2>
            </div>
            <p className="section-note">Selected public-safe signals from production engineering experience.</p>
          </div>
          <div className="stats-grid">
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="projects">
        <div className="section-index">03 / SYSTEMS LAB</div>
        <div className="section-heading-row">
          <div>
            <p className="kicker">A new system every week</p>
            <h2>Projects built like engineering case studies.</h2>
          </div>
          <p className="section-note">Each project documents the problem, architecture, tradeoffs, failure modes, validation, and lessons learned.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
        </div>
      </section>

      <section className="section ai-section" id="ai">
        <div className="shell ai-card">
          <div>
            <p className="kicker">Coming next</p>
            <h2>Ask my portfolio.</h2>
            <p>
              An AI layer will let recruiters and engineers interrogate project architecture, design choices, relevant experience, and failure scenarios using only my public portfolio knowledge base.
            </p>
          </div>
          <div className="terminal">
            <div className="terminal__bar"><span/><span/><span/></div>
            <p><b>›</b> Which project best demonstrates reliability engineering?</p>
            <p className="terminal__answer">The Silent Data Loss Detector focuses on input/output reconciliation, alarm design, partial-failure detection, and observability.</p>
            <div className="terminal__cursor">_</div>
          </div>
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <div>
          <p className="kicker">Build. Learn. Ship. Repeat.</p>
          <h2>Let&apos;s build systems that matter.</h2>
        </div>
        <div className="footer-contact">
          <ContactTrigger className="button footer-contact-button">Contact Me</ContactTrigger>
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
    </ContactProvider>
  );
}
