import { useEffect, useState } from 'react'
import logo from './assets/Asset-6-2-1.png'
import './App.css'

const flagUrl = (code) => `https://flagcdn.com/w640/${code}.png`
const flagSrcSet = (code) => `https://flagcdn.com/w320/${code}.png 1x, https://flagcdn.com/w640/${code}.png 2x`

const COUNTRIES = [
  { code: 'us', name: 'USA', tag: '4,000+ universities', desc: 'World-class research, OPT pathway, global alumni networks.' },
  { code: 'ca', name: 'Canada', tag: 'PGWP up to 3 yrs', desc: 'Affordable tuition, friendly PR pathway, top-ranked schools.' },
  { code: 'au', name: 'Australia', tag: 'Post-study work visa', desc: 'Group of Eight institutions and high quality of life.' },
  { code: 'nz', name: 'New Zealand', tag: 'STEM focus', desc: 'Globally recognized degrees and welcoming culture.' },
  { code: 'eu', name: 'Europe', tag: 'Low / No tuition', desc: 'Germany, Ireland, France, Netherlands — English-taught masters.' },
]

const SERVICES = [
  { icon: '🎯', title: 'Career Counseling', desc: 'One-on-one sessions to map your strengths to the right course and country.' },
  { icon: '🏛️', title: 'University Shortlisting', desc: 'Tailored shortlists across ambitious, moderate and safe choices.' },
  { icon: '📝', title: 'Application & SOP', desc: 'Compelling SOPs, LORs, and error-free applications that stand out.' },
  { icon: '🛂', title: 'Visa Assistance', desc: 'End-to-end visa documentation, mock interviews and follow-ups.' },
  { icon: '💰', title: 'Scholarships & Loans', desc: 'Funding strategy, scholarship matching and education-loan support.' },
  { icon: '✈️', title: 'Pre-Departure', desc: 'Travel, forex, packing, culture briefing — fully prepared before takeoff.' },
  { icon: '🏠', title: 'Accommodation', desc: 'Verified student housing and roommate matching at your destination.' },
  { icon: '🤝', title: 'Post-Landing Support', desc: 'Airport pickup, SIM, bank account and part-time job guidance.' },
]

const PROCESS = [
  { n: '01', title: 'Discover', desc: 'Free profile evaluation and personalized counseling session.' },
  { n: '02', title: 'Shortlist', desc: 'Curated list of universities aligned to your goals and budget.' },
  { n: '03', title: 'Apply', desc: 'SOP, LOR, transcripts — applications prepared and submitted.' },
  { n: '04', title: 'Fund', desc: 'Scholarships, education loans and financial documentation.' },
  { n: '05', title: 'Visa', desc: 'Documentation, mock interviews and visa filing support.' },
  { n: '06', title: 'Fly', desc: 'Pre-departure brief, accommodation and post-landing care.' },
]

const WHY = [
  { icon: '⭐', title: '10+ Years Experience', desc: 'A decade of guiding thousands of students into top global universities.' },
  { icon: '🎓', title: '500+ Universities', desc: 'Direct partnerships across USA, Canada, UK, Australia, NZ and Europe.' },
  { icon: '💎', title: 'Transparent Pricing', desc: 'No hidden fees. Flexible plans designed for every family budget.' },
  { icon: '🛡️', title: 'End-to-End Support', desc: 'From first counseling to settling abroad — we stay with you.' },
]

const TESTIMONIALS = [
  { name: 'Aarav S.', course: 'MS in CS, USA', text: 'KES turned a confusing process into a clear roadmap. Got into my dream school with a partial scholarship.', avatar: 'AS' },
  { name: 'Priya R.', course: 'MBA, Canada', text: 'The SOP review was a game changer. The team is patient, sharp and honest about what works.', avatar: 'PR' },
  { name: 'Karthik N.', course: 'MS Data Science, Australia', text: 'Visa was smooth thanks to the mock interviews. Highly recommend KES for serious aspirants.', avatar: 'KN' },
]

const FAQ = [
  { q: 'Do you charge for the first counseling session?', a: 'No. Your first profile evaluation and counseling call is completely free, online or at our Hyderabad office.' },
  { q: 'Which intakes do you handle?', a: 'We support Fall, Spring and Summer intakes across all major destinations, with rolling support throughout the year.' },
  { q: 'Can you help with education loans?', a: 'Yes. We work with leading public and private lenders and guide you through documentation and approvals.' },
  { q: 'Do you assist after I reach the country?', a: 'Absolutely. Airport pickup coordination, SIM, bank account, accommodation and part-time job guidance are all included.' },
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('kes-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('kes-theme', theme)
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark'
  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      title={`Switch to ${dark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀</span>
        <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">☾</span>
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  )
}

function Preloader({ hidden }) {
  return (
    <div className={`preloader ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader__bg" />
      <div className="preloader__inner">
        <div className="preloader__logo">
          <span className="preloader__ring r-a" />
          <span className="preloader__ring r-b" />
          <span className="preloader__ring r-c" />
          <img src={logo} alt="KES Global" />
        </div>
        <div className="preloader__text">
          <span>K</span><span>E</span><span>S</span>
          <span className="space"> </span>
          <span>G</span><span>l</span><span>o</span><span>b</span><span>a</span><span>l</span>
        </div>
        <div className="preloader__bar"><span /></div>
      </div>
    </div>
  )
}

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#destinations', label: 'Destinations' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="KES Global Consultancy" className="logo__img" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn btn--primary nav__cta">Free Consultation</a>
        </div>

        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`drawer ${open ? 'is-open' : ''}`} role="dialog" aria-hidden={!open}>
        <div className="drawer__inner">
          <nav className="drawer__links" aria-label="Mobile">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ '--i': i }}
              >
                <span className="drawer__num">0{i + 1}</span>
                <span className="drawer__label">{l.label}</span>
                <span className="drawer__arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>

          <div className="drawer__bottom">
            <a href="#contact" className="btn btn--primary drawer__cta" onClick={() => setOpen(false)}>
              Free Consultation
            </a>

            <div className="drawer__theme">
              <div>
                <strong>Appearance</strong>
                <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              </div>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>

            <ul className="drawer__contact">
              <li>
                <span className="drawer__contact-icon">📞</span>
                <a href="tel:+919900006564">+91 99000 06564</a>
              </li>
              <li>
                <span className="drawer__contact-icon">✉️</span>
                <a href="mailto:info@kesglobalconsultancy.com">info@kesglobalconsultancy.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
        <div className="grid-overlay" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">
            <span className="dot" /> Hyderabad's trusted study-abroad consultancy
          </span>
          <h1 className="hero__title">
            Your pathway to <span className="text-grad">global education</span>, designed for you.
          </h1>
          <p className="hero__sub">
            Personalized counseling, university shortlisting, SOPs, visas and post-landing support — all in one place. Built on a decade of guiding ambitious students into the world's best universities.
          </p>
          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary btn--lg">Book free consultation</a>
            <a href="#services" className="btn btn--ghost btn--lg">Explore services →</a>
          </div>

          <div className="hero__stats">
            <div><strong>10+</strong><span>Years guiding students</span></div>
            <div><strong>5,000+</strong><span>Successful admits</span></div>
            <div><strong>98%</strong><span>Visa success rate</span></div>
          </div>
        </div>

        <div className="hero__card" aria-hidden="true">
          <div className="card-float card-float--top">
            <div className="cf__icon">🎓</div>
            <div>
              <div className="cf__title">Stanford University</div>
              <div className="cf__sub">Admit · Fall 2026</div>
            </div>
          </div>
          <div className="card-float card-float--bot">
            <div className="cf__icon">🛂</div>
            <div>
              <div className="cf__title">F-1 Visa approved</div>
              <div className="cf__sub">Mock interview ready</div>
            </div>
          </div>
          <div className="hero__globe">
            <div className="globe">
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="pin p1"><img src={flagUrl('us')} alt="USA" /></div>
              <div className="pin p2"><img src={flagUrl('ca')} alt="Canada" /></div>
              <div className="pin p3"><img src={flagUrl('au')} alt="Australia" /></div>
              <div className="pin p4"><img src={flagUrl('eu')} alt="Europe" /></div>
              <div className="pin p5"><img src={flagUrl('nz')} alt="New Zealand" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {['Stanford', 'MIT', 'Harvard', 'University of Toronto', 'UBC', 'Monash', 'Melbourne', 'TU Munich', 'Auckland', 'Trinity College Dublin', 'NYU', 'Imperial'].concat(['Stanford', 'MIT', 'Harvard', 'University of Toronto', 'UBC', 'Monash']).map((u, i) => (
            <span key={i} className="marquee__item">{u}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section id="about" className="section why">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--dark">Why KES Global</span>
          <h2>Built on trust. Designed around <span className="text-grad">you</span>.</h2>
          <p className="lead">We combine deep industry knowledge with a personal touch — so every student feels seen, heard and prepared.</p>
        </div>
        <div className="why__grid">
          {WHY.map((w) => (
            <div className="why__card" key={w.title}>
              <div className="why__icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--dark">What we do</span>
          <h2>Everything you need, <span className="text-grad">end-to-end</span>.</h2>
          <p className="lead">From the first counseling call to your first day on campus — we handle the complexity, so you can focus on what's next.</p>
        </div>

        <div className="bento">
          {SERVICES.map((s, i) => (
            <article key={s.title} className={`bento__card bento__card--${i % 4}`}>
              <div className="bento__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="bento__arrow" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Destinations() {
  return (
    <section id="destinations" className="section destinations">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--dark">Where you can go</span>
          <h2>Five world-class <span className="text-grad">destinations</span>.</h2>
          <p className="lead">Pick the country that matches your career goals, budget and lifestyle — we'll handle the rest.</p>
        </div>

        <div className="dest__grid">
          {COUNTRIES.map((c) => (
            <article className="dest__card" key={c.name}>
              <div className="dest__flag">
                <img src={flagUrl(c.code)} srcSet={flagSrcSet(c.code)} alt={`${c.name} flag`} loading="lazy" />
              </div>
              <div className="dest__body">
                <h3>{c.name}</h3>
                <span className="chip">{c.tag}</span>
                <p>{c.desc}</p>
                <a href="#contact" className="link-arrow">Talk to a counselor →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--dark">How we work</span>
          <h2>A clear path, <span className="text-grad">six simple steps</span>.</h2>
          <p className="lead">Every student gets a structured roadmap with named owners and clear timelines.</p>
        </div>

        <ol className="steps">
          {PROCESS.map((p) => (
            <li className="step" key={p.n}>
              <div className="step__num">{p.n}</div>
              <div className="step__body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--dark">Students, in their words</span>
          <h2>Real journeys. <span className="text-grad">Real outcomes</span>.</h2>
        </div>

        <div className="tlist">
          {TESTIMONIALS.map((t) => (
            <figure className="tcard" key={t.name}>
              <div className="tstars" aria-label="5 stars">★★★★★</div>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <div className="tavatar" aria-hidden="true">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.course}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq">
      <div className="container faq__wrap">
        <div className="section-head section-head--left">
          <span className="eyebrow eyebrow--dark">Questions</span>
          <h2>Frequently <span className="text-grad">asked</span>.</h2>
          <p className="lead">Still not sure? Reach out — we'd love to chat.</p>
        </div>
        <ul className="faq__list">
          {FAQ.map((item, i) => (
            <li key={item.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{item.q}</span>
                <span className="faq__plus" aria-hidden="true">+</span>
              </button>
              <div className="faq__panel"><p>{item.a}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CtaContact() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section cta">
      <div className="container cta__grid">
        <div className="cta__copy">
          <span className="eyebrow eyebrow--light">Let's talk</span>
          <h2>Your global journey starts with a <span className="text-grad text-grad--on-dark">free 30-min call</span>.</h2>
          <p>Tell us a little about yourself. A senior counselor will get back within one working day.</p>

          <ul className="cta__contact">
            <li><span>📞</span> <a href="tel:+919900006564">+91 99000 06564</a></li>
            <li><span>✉️</span> <a href="mailto:info@kesglobalconsultancy.com">info@kesglobalconsultancy.com</a></li>
            <li><span>📍</span> HNO 1-61/1/898, Siddiq Nagar, Kondapur, Hyderabad — 500084</li>
          </ul>
        </div>

        <form className="cta__form" onSubmit={onSubmit}>
          {submitted ? (
            <div className="form__success">
              <div className="form__success-icon">✓</div>
              <h3>Thanks — we'll be in touch!</h3>
              <p>A counselor will reach out within one working day.</p>
            </div>
          ) : (
            <>
              <h3>Book your free consultation</h3>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" type="text" placeholder="e.g. Aarav Sharma" required />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@email.com" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="+91…" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="country">Preferred destination</label>
                <select id="country" defaultValue="">
                  <option value="" disabled>Choose a country</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>New Zealand</option>
                  <option>Europe</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">Brief about you</label>
                <textarea id="msg" rows="3" placeholder="Current education, intake plans, anything we should know…" />
              </div>
              <button className="btn btn--primary btn--lg" type="submit">Request callback</button>
              <p className="form__note">We respect your privacy. No spam, ever.</p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="logo">
            <img src={logo} alt="KES Global Consultancy" className="logo__img logo__img--footer" />
          </a>
          <p>Krisnika Eduverse Solutions Pvt. Ltd. — Your trusted partner for global education.</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Destinations</h4>
            <ul>
              <li><a href="#destinations">USA</a></li>
              <li><a href="#destinations">Canada</a></li>
              <li><a href="#destinations">Australia</a></li>
              <li><a href="#destinations">New Zealand</a></li>
              <li><a href="#destinations">Europe</a></li>
            </ul>
          </div>
          <div>
            <h4>Reach us</h4>
            <ul>
              <li><a href="tel:+919900006564">+91 99000 06564</a></li>
              <li><a href="mailto:info@kesglobalconsultancy.com">info@kesglobalconsultancy.com</a></li>
              <li>Kondapur, Hyderabad</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} KES Global Consultancy. All rights reserved.</span>
        <span>Crafted with care · Hyderabad, India</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => setLoading(false), 600)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    const fallback = setTimeout(() => setLoading(false), 2400)
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <>
      <Preloader hidden={!loading} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Why />
        <Services />
        <Destinations />
        <Process />
        <Testimonials />
        <Faq />
        <CtaContact />
      </main>
      <Footer />
    </>
  )
}
