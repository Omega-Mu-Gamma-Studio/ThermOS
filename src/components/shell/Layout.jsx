import TopBar from './TopBar'

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '56px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </>
  )
}