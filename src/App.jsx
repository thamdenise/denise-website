import './App.css'
import { siteContent } from './siteContent'

const { brand, profile, nav, stackRail, about, experience, skills, projects } = siteContent
const profilePhotoSrc = `${import.meta.env.BASE_URL}${profile.photo}`
const aboutImageSrc = `${import.meta.env.BASE_URL}${about.image}`
const logoSrc = `${import.meta.env.BASE_URL}denise-logo.svg`
const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-.9 1.7-1.85 3.5-1.85 3.7 0 4.4 2.4 4.4 5.5V24h-4V14.2c0-2.4-.05-5.5-3.3-5.5-3.3 0-3.8 2.5-3.8 5.3V24h-4V8z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2.1c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.8-1.35-1.8-1.1-.75.08-.75.08-.75 1.2.08 1.85 1.2 1.85 1.2 1.08 1.8 2.82 1.3 3.5 1 .1-.8.4-1.3.72-1.6-2.66-.3-5.46-1.3-5.46-5.8 0-1.3.47-2.3 1.2-3.2-.12-.3-.52-1.5.12-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.64 1.7.24 2.9.12 3.2.75.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.46 5.8.4.35.8 1.1.8 2.2v3.2c0 .32.22.68.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v.01L12 12l8-7.99V4H4zm16 2.24L12.02 13 4 6.24V20h16V6.24z" />
  </svg>
)

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm9 1.5V7h4.5L15 3.5zM8 9h8v2H8V9zm0 4h8v2H8v-2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.72 11.72 0 0 0 3.7.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1 17 17 0 0 1-15-15 1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1c0 1.26.21 2.48.6 3.7a1 1 0 0 1-.21 1.11l-2.2 2.2z" />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6l-4 4V6a2 2 0 0 1 2-2z" />
  </svg>
)

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a href="#home" className="brand">
          <img src={logoSrc} alt="Denise logo" />
          {brand}
          <span>/</span>
        </a>
        <nav>
          {nav.map((label) => {
            const id = label.toLowerCase()
            return (
              <a key={label} href={`#${id}`}>
                {label}
              </a>
            )
          })}
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="portrait-wrap" aria-hidden="true">
            <div className="portrait-placeholder">
              <img src={profilePhotoSrc} alt={profile.photoAlt} />
            </div>
            <p className="code-mark">{'</>'}</p>
          </div>

          <div className="hero-copy">
            <p className="hello">Hi, I'm {profile.name}.</p>
            <h1>
              {profile.role}
              <br />
              <span>{profile.accentRole}</span>
            </h1>
            <p>{profile.summary}</p>
            <div className="hero-links">
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <EmailIcon />
                <span className="sr-only">Email</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} aria-label="Phone">
                <PhoneIcon />
                <span className="sr-only">Phone</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={resumeHref} download aria-label="Download resume">
                <DocumentIcon />
                <span className="sr-only">Download resume</span>
              </a>
            </div>
          </div>
        </section>

        <section className="rail" aria-label="Technology rail">
          <div className="rail-track">
            {[...stackRail, ...stackRail].map((tag, i) => (
              <span key={`${tag}-${i}`}>{tag}</span>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About.</h2>
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-glow" />
              <img className="about-image" src={aboutImageSrc} alt={about.imageAlt} />
              <div className="mini-card mini-card-top">{about.badges[0]}</div>
              <div className="mini-card mini-card-bottom">{about.badges[1]}</div>
            </div>
            <div>
              <p className="about-lead">{about.lead}</p>
              <p>{about.body}</p>
              <div className="about-stats">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <ul className="about-points">
                {about.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <h2>Experience.</h2>
          <div className="timeline">
            {experience.map((item) => (
              <article key={item.title} className="timeline-item">
                <p className="period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Skills.</h2>
          <div className="skill-list">
            {skills.map((item) => (
              <article key={item.title} className="skill-row">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Projects.</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact.</h2>
          <div className="contact-grid">
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <EmailIcon />
              <span>Email: {profile.email}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a href={resumeHref} download aria-label="Download resume">
              <DocumentIcon />
              <span>Download Resume</span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} aria-label="Phone">
              <PhoneIcon />
              <span>Phone: {profile.phone}</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
