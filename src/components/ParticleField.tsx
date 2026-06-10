import { useEffect, useRef } from 'react'

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  len: number
  thickness: number
  alpha: number
  color: string
  life: number
  maxLife: number
  delay: number
}

/**
 * A sparse field of "shooting stars" — fast streaks with a fading tail that
 * brighten then fade as they arc through the page background. They favour the
 * margins beside the content card so they stay visible. Decorative only: hidden
 * from assistive tech and disabled for users who prefer reduced motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let shellLeft = 0
    let shellRight = 0
    let meteors: Meteor[] = []
    let raf = 0

    // Pick a horizontal start that lands in a side gutter when there's room,
    // so the streak isn't hidden behind the content card.
    const startX = (): number => {
      const leftW = shellLeft
      const rightW = width - shellRight
      const minGutter = 48
      if (leftW < minGutter && rightW < minGutter) return Math.random() * width
      const total = Math.max(leftW, 0) + Math.max(rightW, 0)
      if (Math.random() < Math.max(leftW, 0) / total) {
        return Math.random() * Math.max(leftW - 6, 8)
      }
      return shellRight + Math.random() * Math.max(rightW - 6, 8)
    }

    const reset = (m: Meteor, first: boolean): void => {
      const a = (50 + Math.random() * 22) * (Math.PI / 180)
      const angle = Math.random() < 0.5 ? a : Math.PI - a // fall down-right or down-left
      const speed = 1 + Math.random() 
      m.angle = angle
      m.vx = Math.cos(angle) * speed
      m.vy = Math.sin(angle) * speed
      m.x = startX()
      m.y = Math.random() * height * 0.85
      m.len = 200 + Math.random() * 90
      m.thickness = 1 + Math.random() * 0.9
      m.alpha = 0.3 + Math.random() * 0.22
      m.color = Math.random() < 0.65 ? '182, 58, 45' : '93, 85, 75'
      m.life = 0
      m.maxLife = 400 + Math.random() * 80
      // stagger startup; afterwards wait a while between streaks
      m.delay = first ? Math.floor(Math.random() * 240) : Math.floor(120 + Math.random() * 240)
    }

    const measureShell = () => {
      const el = document.querySelector('.site-shell')
      if (el) {
        const r = el.getBoundingClientRect()
        shellLeft = r.left
        shellRight = r.right
      } else {
        shellLeft = width
        shellRight = width
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'
      measureShell()

      const count = Math.max(3, Math.min(Math.round(width / 460), 6))
      meteors = Array.from({ length: count }, () => {
        const m = {} as Meteor
        reset(m, true)
        return m
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      for (const m of meteors) {
        if (m.delay > 0) {
          m.delay--
          continue
        }
        if (m.life >= m.maxLife) {
          reset(m, false)
          continue
        }
        m.life++
        m.x += m.vx
        m.y += m.vy

        const t = m.life / m.maxLife
        const fade = t < 0.18 ? t / 0.18 : t > 0.55 ? Math.max(0, (1 - t) / 0.45) : 1
        const a = m.alpha * fade
        if (a <= 0.001) continue

        const tailX = m.x - Math.cos(m.angle) * m.len
        const tailY = m.y - Math.sin(m.angle) * m.len
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(${m.color}, ${a})`)
        grad.addColorStop(1, `rgba(${m.color}, 0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth = m.thickness
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        // bright head
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.thickness * 0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${Math.min(a * 1.4, 0.6)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
