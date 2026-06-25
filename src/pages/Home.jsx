import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Particle Field ─────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Read accent color from CSS variable
    function getAccentRGB() {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim()
      // Parse hex
      const hex = val.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return { r, g, b }
    }

    const COUNT = 80
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }))

    function draw(t) {
      ctx.clearRect(0, 0, W, H)
      const { r: cr, g: cg, b: cb } = getAccentRGB()

      for (const p of particles) {
        p.y -= p.speed
        p.x += p.drift
        p.pulse += 0.012

        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10

        const alphaMult = 0.8 + 0.2 * Math.sin(p.pulse)
        const alpha = p.opacity * alphaMult

        // Fade near top
        const fadeTop = Math.min(1, p.y / 120)
        const fadeBot = Math.min(1, (H - p.y) / 80)
        const finalAlpha = alpha * fadeTop * fadeBot

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${finalAlpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}

/* ── Module Data ────────────────────────────────────────────── */
const MODULES = [
  {
    id: 'pvt-explorer',
    code: 'M1',
    title: 'PVT Explorer',
    sub: 'Phase Surface & State Space',
    description: 'A fully interactive 3D P-V-T surface for water. Orbit, slice, and hover to reveal thermodynamic state at any point on the surface.',
    status: 'live',
    glowColor: 'rgba(0, 150, 255, 0.18)',  // bluer — cold/3D
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: 'cycle-builder',
    code: 'M2',
    title: 'Cycle Builder',
    sub: 'Power & Refrigeration Cycles',
    description: 'Three-phase animated cycle simulator. See It Work → See It Break → You Try. Otto, Diesel, Brayton, Rankine, and Refrigeration.',
    status: 'dev',
    glowColor: 'rgba(255, 140, 0, 0.15)',  // amber — heat/work
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    id: 'energy-balancer',
    code: 'M3',
    title: 'Energy Balancer',
    sub: 'First Law · Open & Closed Systems',
    description: 'Drag-and-drop energy balance simulator. Eliminate sign convention confusion by placing energy arrows on real system schematics.',
    status: 'dev',
    glowColor: 'rgba(255, 200, 0, 0.13)',  // yellow — energy arrows
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'entropy-visualizer',
    code: 'M4',
    title: 'Entropy Visualizer',
    sub: 'Second Law · T-s Diagrams',
    description: 'Interactive T-s diagram where entropy generation appears as a visible colored area. Real vs. isentropic paths, side by side.',
    status: 'dev',
    glowColor: 'rgba(255, 61, 90, 0.13)',  // red — irreversibility/disorder
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'property-solver',
    code: 'M5',
    title: 'Property Solver',
    sub: 'Steam Tables · Interpolation',
    description: 'Enter any two known properties and get everything else. Replaces hours of steam table navigation with visual, interpolated results.',
    status: 'dev',
    glowColor: 'rgba(0, 207, 207, 0.13)',  // cyan — precision/solver
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>
    ),
  },
]

/* ── Module Card ─────────────────────────────────────────────── */
function ModuleCard({ mod, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="glass-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Per-card subtle glow bleed */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, ${mod.glowColor}, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
        }}/>
      )}

      {/* Top row: icon + status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '12px',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-text)',
          transition: 'box-shadow 0.25s',
          boxShadow: hovered ? '0 0 18px var(--accent-glow)' : 'none',
        }}>
          {mod.icon}
        </div>

        {mod.status === 'live' ? (
          <span className="status-live">
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4dff9a', boxShadow: '0 0 5px #4dff9a' }}/>
            Live
          </span>
        ) : (
          <span className="status-dev">
            In Dev
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>{mod.code}</span>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-h)' }}>
            {mod.title}
          </h3>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--accent-text)', fontFamily: 'var(--mono)', marginBottom: '12px' }}>
          {mod.sub}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.65 }}>
          {mod.description}
        </p>
      </div>

      {/* Footer arrow */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', position: 'relative' }}>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--accent-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.2s, opacity 0.2s',
            opacity: hovered ? 1 : 0.35,
          }}
        >
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Home Page ───────────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <ParticleField />

      {/* Radial accent glow behind hero */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse at 50% 0%, var(--accent-glow) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section style={{
          paddingTop: '130px',
          paddingBottom: '72px',
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto',
          padding: '130px 24px 72px',
        }}>

          {/* Studio badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <span className="badge">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}/>
              ME22301 · Omega Mu Gamma Studio
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(52px, 8vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: '24px',
            color: 'var(--text-h)',
          }}>
            Therm
            <span className="glow-text">OS</span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '15px',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            The invisible becomes visible.
          </p>

          <p style={{
            fontSize: '17px',
            color: 'var(--text)',
            maxWidth: '520px',
            margin: '0 auto 56px',
            lineHeight: 1.7,
          }}>
            5 interactive simulators for Engineering Thermodynamics — rendering what textbooks can only describe.
          </p>
        </section>

        {/* ── Module Cards ──────────────────────────────────── */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px 100px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {MODULES.map(mod => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                onClick={() => mod.status === 'live' ? navigate(`/module/${mod.id}`) : null}
              />
            ))}
          </div>
        </section>

        {/* ── Footer hint ───────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '48px',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
        }}>
          BUILT AT OMEGA MU GAMMA STUDIO
        </div>
      </div>
    </div>
  )
}