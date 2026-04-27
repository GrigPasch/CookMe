import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Home from './pages/Home'
import Assortment from './pages/Assortment'
import About from './pages/About'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

// Page transition curtain
function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const curtain = curtainRef.current
    // Wipe in, pause, wipe out
    const tl = gsap.timeline()
    tl.set(curtain, { scaleY: 0, transformOrigin: 'top', display: 'block' })
      .to(curtain, { scaleY: 1, duration: 0.5, ease: 'power4.in' })
      .to(curtain, {
        scaleY: 0, transformOrigin: 'bottom',
        duration: 0.5, ease: 'power4.out', delay: 0.05,
        onComplete: () => gsap.set(curtain, { display: 'none' }),
      })

    // Kill stale ScrollTriggers on navigation
    ScrollTrigger.getAll().forEach((t) => t.kill())
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {/* Transition curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed', inset: 0,
          background: 'var(--green-deep)',
          zIndex: 9998,
          display: 'none',
          transformOrigin: 'top',
        }}
      />
      {children}
    </>
  )
}

function Layout() {
  useLenis()
  const location = useLocation()

  return (
    <>
      <Cursor />
      <Nav />
      <PageTransition key={location.pathname}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/καταλογος" element={<Assortment />} />
          <Route path="/καταλογος" element={<Assortment />} />
          <Route path="/about"      element={<About />} />
          <Route path="/contact"    element={<Contact />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
