import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/shell/Layout'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import './styles/index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}