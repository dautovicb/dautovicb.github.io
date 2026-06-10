import { useEffect, useRef, useState } from 'react'

// Max px a letter leans away from the cursor / touch — tune this.
export const REPEL_STRENGTH = 18

const REPEL_RADIUS = 120 // slightly wider for finger-sized targets
const SPRING = 0.12
const DAMPING = 0.78
const EPS = 0.02

type LetterState = {
  el: HTMLSpanElement
  cx: number // cached centre, page coordinates (scroll-independent)
  cy: number
  x: number
  y: number
  vx: number
  vy: number
}

type Props = {
  name: string
  id?: string
}

export function HeroName({ name, id }: Props) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  // Enabled on any device unless reduced motion is requested.
  // Touch devices get the same spring physics via touchmove.
  const [interactive] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!interactive) return
    const h1 = h1Ref.current
    if (!h1) return

    const spans = Array.from(h1.querySelectorAll<HTMLSpanElement>('[data-letter]'))
    if (spans.length === 0) return

    const letters: LetterState[] = spans.map((el) => ({
      el,
      cx: 0,
      cy: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }))

    let bbox = { minX: 0, minY: 0, maxX: 0, maxY: 0 }
    let pointerX = -99999
    let pointerY = -99999
    let raf = 0
    let running = false
    let displaced = false

    const measure = () => {
      const sx = window.scrollX
      const sy = window.scrollY
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      for (const l of letters) {
        const r = l.el.getBoundingClientRect()
        l.cx = r.left + r.width / 2 + sx
        l.cy = r.top + r.height / 2 + sy
        minX = Math.min(minX, l.cx)
        minY = Math.min(minY, l.cy)
        maxX = Math.max(maxX, l.cx)
        maxY = Math.max(maxY, l.cy)
      }
      bbox = { minX, minY, maxX, maxY }
    }

    const NEAR_MARGIN = REPEL_RADIUS + 40
    const near = () =>
      pointerX >= bbox.minX - NEAR_MARGIN &&
      pointerX <= bbox.maxX + NEAR_MARGIN &&
      pointerY >= bbox.minY - NEAR_MARGIN &&
      pointerY <= bbox.maxY + NEAR_MARGIN

    const tick = () => {
      let moving = false
      let anyDisplaced = false
      for (const l of letters) {
        const dx = l.cx - pointerX
        const dy = l.cy - pointerY
        const dist = Math.hypot(dx, dy)
        let tx = 0
        let ty = 0
        if (dist < REPEL_RADIUS && dist > 0.0001) {
          const f = (1 - dist / REPEL_RADIUS) ** 2
          const push = f * REPEL_STRENGTH
          tx = (dx / dist) * push
          ty = (dy / dist) * push
        }

        l.vx = (l.vx + (tx - l.x) * SPRING) * DAMPING
        l.vy = (l.vy + (ty - l.y) * SPRING) * DAMPING
        l.x += l.vx
        l.y += l.vy

        l.el.style.transform = `translate(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px)`

        if (
          Math.abs(l.vx) > EPS ||
          Math.abs(l.vy) > EPS ||
          Math.abs(tx - l.x) > EPS ||
          Math.abs(ty - l.y) > EPS
        ) {
          moving = true
        }
        if (Math.abs(l.x) > EPS || Math.abs(l.y) > EPS) anyDisplaced = true
      }

      displaced = anyDisplaced
      if (moving) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
        raf = 0
      }
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    // ── Mouse ──────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX + window.scrollX
      pointerY = e.clientY + window.scrollY
      if (near() || displaced) start()
    }

    const onMouseLeave = () => {
      pointerX = -99999
      pointerY = -99999
      if (displaced) start()
    }

    // ── Touch ──────────────────────────────────────────────────────────────
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      pointerX = t.clientX + window.scrollX
      pointerY = t.clientY + window.scrollY
      if (near() || displaced) start()
    }

    const onTouchEnd = () => {
      pointerX = -99999
      pointerY = -99999
      if (displaced) start()
    }

    measure()
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => {})

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('resize', measure)
      if (raf) cancelAnimationFrame(raf)
      for (const l of letters) l.el.style.transform = ''
    }
  }, [interactive, name])

  if (!interactive) {
    return (
      <h1 id={id} className="hero-name">
        {name}
      </h1>
    )
  }

  // Per-letter spans. The whole heading is `white-space: nowrap` (see CSS) so
  // the inline-block letters never wrap; spaces use a non-breaking space so the
  // word gap keeps its width even as an inline-block.
  return (
    <h1 id={id} ref={h1Ref} className="hero-name" aria-label={name}>
      {Array.from(name).map((ch, i) => (
        <span key={i} data-letter aria-hidden="true" className="hero-letter">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </h1>
  )
}
