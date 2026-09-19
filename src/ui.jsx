import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* ---------- estrella de 4 puntas ---------- */
export function Star({ size = 16, color = 'currentColor', className = '' }) {
  return (
    <svg
      className={'star ' + className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M12 0c.6 5.6 2.9 9.2 12 12-9.1 2.8-11.4 6.4-12 12-.6-5.6-2.9-9.2-12-12C9.1 9.2 11.4 5.6 12 0z" />
    </svg>
  )
}

/* ---------- texto que llena el ancho exacto ---------- */
export function FitText({ text, outline = false, className = '', stretch = true }) {
  const ref = useRef(null)
  const [box, setBox] = useState('0 0 1000 75')

  useEffect(() => {
    let alive = true
    const measure = () => {
      const el = ref.current
      if (!el || !alive) return
      try {
        const b = el.getBBox()
        if (b.width > 0 && b.height > 0) {
          setBox(b.x + ' ' + b.y + ' ' + b.width + ' ' + b.height)
        }
      } catch (e) {
        /* getBBox lanza si el nodo aún no se pintó */
      }
    }
    measure()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => {
      alive = false
    }
  }, [text])

  return (
    <svg
      className={'fit ' + (outline ? 'fit-outline ' : '') + className}
      viewBox={box}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={text}
    >
      <text
        ref={ref}
        x="0"
        y="0"
        dominantBaseline="text-before-edge"
        fontSize="100"
        textLength={stretch ? 1000 : undefined}
        lengthAdjust={stretch ? 'spacingAndGlyphs' : undefined}
      >
        {text}
      </text>
    </svg>
  )
}

/* ---------- aparición al hacer scroll ---------- */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div
  if (reduce) return <div className={className}>{children}</div>
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 220, damping: 30, delay }}
    >
      {children}
    </M>
  )
}

/* ---------- contador que sube al entrar en pantalla ---------- */
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }
    let raf
    const start = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

/* ---------- marquesina ---------- */
export function Marquee({ items, reverse = false, tone = 'blue' }) {
  const list = Array.from({ length: 8 })
  return (
    <div className={'marquee marquee-' + tone} aria-hidden="true">
      <div className={reverse ? 'marquee-track reverse' : 'marquee-track'}>
        {list.map((_, i) => (
          <span key={i}>
            {items}
            <Star size={13} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- portada tipográfica (mientras no hay imagen) ---------- */
export function Cover({ word, variante = 'blue', img, alt }) {
  if (img) {
    return (
      <div className="cover cover-img">
        <img src={img} alt={alt} loading="lazy" />
      </div>
    )
  }
  return (
    <div className={'cover cover-' + variante} role="img" aria-label={'Portada: ' + alt}>
      <div className="cover-grid" />
      <div className="cover-word">
        <FitText text={word} stretch={false} />
      </div>
      <div className="cover-word cover-word-ghost" aria-hidden="true">
        <FitText text={word} outline stretch={false} />
      </div>
      <Star size={22} className="cover-star cover-star-a" />
      <Star size={14} className="cover-star cover-star-b" />
    </div>
  )
}

/* ---------- sección activa en el menú ---------- */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids.join('|')])
  return active
}
