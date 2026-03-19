import './App.css'
import { siteContent } from './siteContent'

const { brand, profile, nav, stackRail, about, experience, skills, projects } = siteContent
const profilePhotoSrc = `${import.meta.env.BASE_URL}${profile.photo}`

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a href="#home" className="brand">
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
              <a href={`mailto:${profile.email}`}>Email</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="#contact">Let's talk</a>
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
              <div className="block" />
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
            <a href={`mailto:${profile.email}`}>E-mail: {profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>Phone: {profile.phone}</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
