import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { Star, FitText, Reveal, Counter, Marquee, Cover, useActiveSection } from './ui.jsx'
import {
  PERFIL,
  CONTACTO,
  CIFRAS,
  SERVICIOS,
  PROYECTOS,
  EXPERIENCIA,
  HABILIDADES,
  SOFTWARE,
  NAV,
  TITULARES,
} from './data.js'

const WA = 'https://wa.me/' + CONTACTO.indicativo + CONTACTO.whatsapp
const MAIL = 'mailto:' + CONTACTO.email
const waBonito = CONTACTO.whatsapp.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')

/* =========================================================
   scroll suave + barra de progreso
   ========================================================= */
function useLenis() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -90 } })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduce])
}

function Progress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX: x }} aria-hidden="true" />
}

/* =========================================================
   navegación
   ========================================================= */
function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const active = useActiveSection(NAV.map(([h]) => h))

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className={solid ? 'nav-holder is-solid' : 'nav-holder'}>
        <div className="wrap">
          <nav className="nav" aria-label="Principal">
            <a className="brand" href="#top">
              <Star size={15} color="#d64317" />
              <span>
                {PERFIL.estudio}
                <small>{PERFIL.estudioSub}</small>
              </span>
            </a>

            <div className="nav-links">
              {NAV.map(([href, label]) => (
                <a key={href} href={href} className={active === href ? 'is-active' : ''}>
                  {label}
                </a>
              ))}
            </div>

            <div className="nav-right">
              <a className="nav-cta" href={WA} target="_blank" rel="noreferrer">
                Hablemos
              </a>
              <button
                className={open ? 'burger is-open' : 'burger'}
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
              >
                <span />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className={open ? 'drawer is-open' : 'drawer'}>
        <div className="drawer-inner">
          {NAV.map(([href, label], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a className="btn btn-solid drawer-cta" href={WA} target="_blank" rel="noreferrer">
            WhatsApp {waBonito}
          </a>
        </div>
      </div>
    </>
  )
}

/* =========================================================
   hero
   ========================================================= */
function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="eyebrow">
          <Star size={12} />
          <span className="mono">{PERFIL.edicion}</span>
          <span className="rule" />
          <span className="mono">{PERFIL.ciudad}</span>
          <Star size={12} />
        </div>

        <h1 className="hero-title">
          <FitText text={TITULARES.hero1} />
          <FitText text={TITULARES.hero2} outline />
        </h1>

        <div className="hero-sub">
          <span className="mono">{PERFIL.nombre}</span>
          <span className="mono">{PERFIL.rol}</span>
          <span className="mono">{PERFIL.formacion}</span>
        </div>

        <div className="hero-grid" id="acerca">
          <Reveal className="intro">
            <p className="lead">{PERFIL.bio}</p>
            <p className="quote">“{PERFIL.lema}”</p>
            <div className="btn-row">
              <a className="btn btn-solid" href="#proyectos">
                Ver proyectos <Star size={12} color="#fff" />
              </a>
              <a className="btn btn-ghost" href={CONTACTO.behance.url} target="_blank" rel="noreferrer">
                Behance
              </a>
            </div>
            <div className="meta-row">
              {PERFIL.disponible && (
                <span className="chip mono chip-live">
                  <i className="pulse" /> Disponible para proyectos
                </span>
              )}
              <span className="chip mono">Freelance</span>
              <span className="chip mono">Remoto / presencial</span>
            </div>
          </Reveal>

          <Reveal className="cards" delay={0.1}>
            <a className="card-link" href={WA} target="_blank" rel="noreferrer">
              <span className="icon">W</span>
              <span className="card-txt">
                <strong>WhatsApp</strong>
                <span className="mono">{waBonito}</span>
              </span>
              <span className="card-arrow" aria-hidden="true">→</span>
            </a>
            <a className="card-link" href={MAIL}>
              <span className="icon">@</span>
              <span className="card-txt">
                <strong>Correo</strong>
                <span className="mono">Escríbeme</span>
              </span>
              <span className="card-arrow" aria-hidden="true">→</span>
            </a>
            <a className="card-link" href={CONTACTO.instagram.url} target="_blank" rel="noreferrer">
              <span className="icon">IG</span>
              <span className="card-txt">
                <strong>Instagram</strong>
                <span className="mono">{CONTACTO.instagram.user}</span>
              </span>
              <span className="card-arrow" aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="cifras" delay={0.15}>
          {CIFRAS.map((c) => (
            <div className="cifra" key={c.t}>
              <strong>
                <Counter to={c.n} suffix={c.suf} />
              </strong>
              <span className="mono">{c.t}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  )
}

/* =========================================================
   servicios
   ========================================================= */
function Servicios() {
  const [open, setOpen] = useState(0)
  return (
    <section id="servicios" className="sec">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 className="display">Servicios</h2>
          <span className="mono">04 áreas de trabajo</span>
        </Reveal>

        <div className="acc">
          {SERVICIOS.map((s, i) => {
            const abierto = open === i
            return (
              <Reveal key={s.t} delay={i * 0.05} className={abierto ? 'acc-item open' : 'acc-item'}>
                <button
                  className="acc-btn"
                  onClick={() => setOpen(abierto ? -1 : i)}
                  aria-expanded={abierto}
                >
                  <span className="acc-left">
                    <span className="acc-num mono">0{i + 1}</span>
                    <h3>{s.t}</h3>
                  </span>
                  <span className="acc-sign" aria-hidden="true">
                    <i /> <i />
                  </span>
                </button>
                <div className="acc-body">
                  <div>
                    <p>{s.d}</p>
                    <div className="acc-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   proyectos
   ========================================================= */
function Proyectos() {
  return (
    <section id="proyectos" className="sec sec-ink">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 className="display">Proyectos</h2>
          <a className="mono link-arrow" href={CONTACTO.behance.url} target="_blank" rel="noreferrer">
            Ver todo en Behance <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <div className="proj-grid">
          {PROYECTOS.map((p, i) => {
            const Tag = p.url ? 'a' : 'article'
            const extra = p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {}
            return (
              <Reveal key={p.t} delay={i * 0.08}>
                <Tag className="proj" {...extra}>
                  <Cover word={p.cover} variante={p.variante} img={p.img} alt={p.t} />
                  <div className="proj-meta">
                    <span className="mono">
                      {String(i + 1).padStart(2, '0')} · {p.tipo}
                    </span>
                    <span className="mono">{p.anio}</span>
                  </div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </Tag>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="proj-note">
          <Star size={13} />
          <span className="mono">
            Sitio de demostración — las portadas son tipográficas y las fotos van en su lugar
          </span>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   estudio: habilidades + software
   ========================================================= */
function Estudio() {
  return (
    <section id="estudio" className="sec">
      <div className="wrap">
        <Reveal className="acc-block">
          <div className="sec-head">
            <h2 className="display">Capacidades</h2>
            <span className="mono soft">Herramientas + habilidades</span>
          </div>
          <div className="two-col">
            <div className="panel">
              <h3>
                <Star size={14} color="#d64317" /> Habilidades
              </h3>
              <div className="skill-grid">
                {HABILIDADES.map((h, i) => (
                  <Reveal key={h.t} delay={i * 0.06} className="skill">
                    <span className="big">{h.i}</span>
                    <span className="mono">{h.t}</span>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="panel">
              <h3>
                <Star size={14} color="#d64317" /> Software
              </h3>
              <div className="soft-grid">
                {SOFTWARE.map((s, i) => (
                  <Reveal key={s} delay={i * 0.04} className="soft-cell">
                    {s}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   experiencia
   ========================================================= */
function Experiencia() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 className="display">Experiencia</h2>
          <span className="mono">Trayectoria</span>
        </Reveal>
        <div className="exp">
          {EXPERIENCIA.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.06} className="exp-row">
              <span className="mono">{e.p}</span>
              <div>
                <h3>{e.t}</h3>
                <p>{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   contacto
   ========================================================= */
function Contacto() {
  return (
    <section id="contacto" className="sec">
      <div className="wrap">
        <Reveal className="contact-box">
          <span className="mono soft">¿Tienes un proyecto?</span>
          <div className="contact-title">
            <FitText text={TITULARES.cierre} />
          </div>
          <div className="btn-row">
            <a className="btn btn-solid" href={WA} target="_blank" rel="noreferrer">
              WhatsApp {waBonito}
            </a>
            <a className="btn btn-ghost" href={MAIL}>
              Enviar correo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   footer
   ========================================================= */
function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div>
          <div className="brand brand-foot">
            <Star size={15} color="#d64317" />
            <span>
              {PERFIL.estudio}
              <small>{PERFIL.estudioSub}</small>
            </span>
          </div>
          <p className="mono foot-bio">
            {PERFIL.rol} · {PERFIL.ciudad}
          </p>
        </div>

        <div className="foot-col">
          <h4 className="mono">Navegación</h4>
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="foot-col">
          <h4 className="mono">Contacto</h4>
          <a href={WA} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={MAIL}>Correo</a>
          <a href={CONTACTO.instagram.url} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={CONTACTO.behance.url} target="_blank" rel="noreferrer">
            Behance
          </a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span className="mono">
          © {new Date().getFullYear()} {PERFIL.estudio} {PERFIL.estudioSub} — {PERFIL.nombre}
        </span>
        <a className="mono" href="#top">
          Volver arriba ↑
        </a>
      </div>
    </footer>
  )
}

/* =========================================================
   botón volver arriba
   ========================================================= */
function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a className={show ? 'to-top is-visible' : 'to-top'} href="#top" aria-label="Volver arriba">
      ↑
    </a>
  )
}

/* =========================================================
   app
   ========================================================= */
export default function App() {
  useLenis()
  return (
    <>
      <a className="skip" href="#acerca">
        Saltar al contenido
      </a>
      <Progress />
      <Nav />
      <main>
        <Hero />
        <Marquee items={TITULARES.marquee1} />
        <Servicios />
        <Proyectos />
        <Marquee
          items="Presupuestos · APU · NSR-10 · Programación · Planos 3D "
          reverse
          tone="ink"
        />
        <Estudio />
        <Experiencia />
        <Contacto />
      </main>
      <Footer />
      <ToTop />
    </>
  )
}
