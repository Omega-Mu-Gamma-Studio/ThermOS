import { useParams, useNavigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const MODULE_MAP = {
  'pvt-explorer':        lazy(() => import('../modules/pvt-explorer/index.jsx')),
  'cycle-builder':       lazy(() => import('../modules/cycle-builder/index.jsx')),
  'energy-balancer':     lazy(() => import('../modules/energy-balancer/index.jsx')),
  'entropy-visualizer':  lazy(() => import('../modules/entropy-visualizer/index.jsx')),
  'property-solver':     lazy(() => import('../modules/property-solver/index.jsx')),
}

function LoadingSpinner() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--mono)',
      fontSize: '13px',
      letterSpacing: '0.08em',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" style={{ animation: 'spin 1s linear infinite', transformOrigin: 'center' }}/>
      </svg>
      LOADING MODULE...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function ModulePage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const Module = MODULE_MAP[moduleId]

  if (!Module) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--mono)',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>MODULE NOT FOUND</p>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            color: 'var(--accent-text)',
            background: 'var(--accent-dim)',
            border: '1px solid var(--accent-border)',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}
        >
          ← BACK TO HOME
        </button>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Module />
    </Suspense>
  )
}