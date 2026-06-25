import { useState, useRef, useEffect } from 'react'

const THEMES = [
  { id: 'amber',  label: 'Thermal',  color: '#ff8c00', attr: ''       },
  { id: 'plasma', label: 'Plasma',   color: '#ff3d5a', attr: 'plasma' },
  { id: 'steam',  label: 'Steam',    color: '#00cfcf', attr: 'steam'  },
]

export default function TopBar() {
  const saved = localStorage.getItem('thermos-theme') || 'amber'
  const [active, setActive] = useState(saved)
  const [open, setOpen] = useState(false)
  const popRef = useRef(null)

  useEffect(() => {
    const theme = THEMES.find(t => t.id === active)
    document.documentElement.setAttribute('data-theme', theme?.attr || '')
    localStorage.setItem('thermos-theme', active)
  }, [active])

  useEffect(() => {
    function handleClick(e) {
      if (popRef.current && !popRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentTheme = THEMES.find(t => t.id === active)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      background: 'rgba(13,13,16,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Wordmark */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontWeight: 500,
          fontSize: '18px',
          color: 'var(--accent-text)',
          textShadow: '0 0 16px var(--accent-glow)',
          letterSpacing: '0.02em',
        }}>
          ThermOS
        </span>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '1px',
        }}>
          v0.1
        </span>
      </a>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          ME22301
        </span>

        {/* Theme popover trigger */}
        <div ref={popRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            title="Switch theme"
            style={{
              width: '34px', height: '34px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: open ? 'var(--accent-dim)' : 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              color: open ? 'var(--accent-text)' : 'var(--text-muted)',
            }}
          >
            {/* Flame icon — fitting for ThermOS */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
            </svg>
          </button>

          {open && (
            <div style={{
              position: 'absolute', top: '42px', right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '12px',
              minWidth: '160px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', padding: '0 4px' }}>
                Interface
              </p>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setActive(t.id); setOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: active === t.id ? 'var(--accent-dim)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: t.color,
                    boxShadow: `0 0 8px ${t.color}`,
                    flexShrink: 0,
                  }}/>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: '12px',
                    color: active === t.id ? 'var(--accent-text)' : 'var(--text)',
                    fontWeight: active === t.id ? 500 : 400,
                  }}>
                    {t.label}
                  </span>
                  {active === t.id && (
                    <svg style={{ marginLeft: 'auto' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" color={t.color}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}