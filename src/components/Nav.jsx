import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './Nav.css'

export default function Nav() {
  const navRef    = useRef(null)
  const overlayRef = useRef(null)
  const menuLinksRef = useRef([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('gr')
  const lastScroll = useRef(0)
  const location = useLocation()

  // Detect scroll direction → hide/show nav
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const nav = navRef.current
      if (!nav) return
      if (current < 80) {
        nav.classList.remove('nav--hidden')
        nav.classList.remove('nav--scrolled')
      } else if (current > lastScroll.current) {
        nav.classList.add('nav--hidden')
      } else {
        nav.classList.remove('nav--hidden')
        nav.classList.add('nav--scrolled')
      }
      lastScroll.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { closeMenu() }, [location.pathname])

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
    const tl = gsap.timeline()
    tl.to(overlayRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' })
      .fromTo(
        menuLinksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: 'power3.out' },
        '-=0.3'
      )
  }

  const closeMenu = () => {
    if (!menuOpen && overlayRef.current?.style.clipPath !== 'inset(0% 0% 0% 0%)') return
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) })
    tl.to(menuLinksRef.current, { y: -30, opacity: 0, stagger: 0.04, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'power4.inOut' }, '-=0.1')
    document.body.style.overflow = ''
  }

  const toggleMenu = () => menuOpen ? closeMenu() : openMenu()

  const navLinks = [
    { to: '/',           label: 'Αρχική' },
    { to: '/καταλογος', label: 'Γεύσεις' },
    { to: '/about',      label: 'Σχετικά με εμάς' },
    { to: '/contact',    label: 'Επικοινωνία' },
  ]

  return (
    <>
      <nav ref={navRef} className="nav">
        <Link to="/" className="nav__logo">CookMe!</Link>

        <div className="nav__right">
          <div className="nav__lang">
            <button
              className={`nav__lang-btn ${lang === 'gr' ? 'active' : ''}`}
              onClick={() => setLang('gr')}
            >EL</button>
            <span className="nav__lang-sep">·</span>
          </div>

          <a href="/καταλογος" className="nav__webshop hoverable">Κατάλογος</a>

          <button
            className={`nav__burger hoverable ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div ref={overlayRef} className="menu-overlay">
        <button className="menu-overlay__close hoverable" onClick={closeMenu}>
          <span /><span />
        </button>

        <nav className="menu-overlay__nav">
          {navLinks.map((link, i) => (
            <div
              key={link.to}
              className="menu-overlay__item clip-wrap"
              ref={el => menuLinksRef.current[i] = el}
            >
              <Link to={link.to} className="menu-overlay__link hoverable">
                <span className="menu-overlay__num">0{i + 1}</span>
                {link.label}
                <span className="menu-overlay__arrow">↗</span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="menu-overlay__footer">
          <p>Βαλτοτόπι Σερρών | Δήμος Εμμανουήλ Παππά</p>
          <a href="mailto:info@cookme.gr" className="hoverable">info@cookme.gr</a>
          <p>Τηλέφωνο | 6940944225</p>
        </div>
      </div>
    </>
  )
}
