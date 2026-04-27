import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef    = useRef(null)
  const bgRef      = useRef(null)
  const headRef    = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const scrollRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into lines for stagger reveal
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        '.hero__line-inner',
        { y: '110%', rotation: 2 },
        { y: '0%', rotation: 0, stagger: 0.12, duration: 1.1, ease: 'power4.out' }
      )
        .fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.55'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.3'
        )

      // Subtle parallax on background
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      {/* Layered background */}
      <div ref={bgRef} className="hero__bg">
        <div className="hero__bg-grad" />
        {/* Placeholder nature image via CSS gradient */}
        <div className="hero__bg-img" />
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <span className="section-label hero__eyebrow">ΕΠΙΛΕΓΜΈΝΑ ΜΠΑΧΑΡΙΚΆ ΚΑΙ ΚΑΡΥΚΕΎΜΑΤΑ</span>

        <h1 className="hero__headline">
          <span className="hero__line">
            <span className="hero__line-inner">Ανακαλύψτε</span>
          </span>
          <span className="hero__line hero__line--italic">
            <span className="hero__line-inner">ΠΡΑΓΜΑΤΙΚΉ</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">γεύση.</span>
          </span>
        </h1>

        <p ref={subRef} className="hero__sub">
          Από επιλεγμένους προμηθευτές, στο σπίτι σας!.
        </p>

        <div ref={ctaRef} className="hero__cta">
          <Link to="/καταλογος" className="btn btn-dark hoverable">
            Ανακαλύψτε γεύσεις
            <svg className="btn-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Link>
          <Link to="/about" className="hero__link hoverable">Σχετικά</Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Bottom info bar */}
      <div className="hero__bottom-bar">
        <div className="hero__stat">
          <span className="hero__stat-num">500+</span>
          <span className="hero__stat-label">μοναδικές γεύσεις μπαχαρικών</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num">24/7</span>
          <span className="hero__stat-label">Παραδόσεις</span>
        </div>
      </div>
    </section>
  )
}
