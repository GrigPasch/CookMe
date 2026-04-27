import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './ContactCTA.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta__content > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta__content', start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta__bg" />
      <div className="cta__content">
        <span className="section-label cta__label">Γίνετε πελάτης μας!</span>
        <h2 className="cta__title">
          Τα καλύτερα της φύσης,<br />
          <em>Στο πιάτο σας.</em>
        </h2>
        <p className="cta__sub">
          Δίπλα σας κάθε μέρα για να έχετε πάντα γεύση και ποιότητα σε κάθε σας γεύμα.
        </p>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn-dark hoverable">
            Γίνετε πελάτης.
            <svg className="btn-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Link>
          <a href="mailto:info@cookme.gr" className="cta__email hoverable">
            info@cookme.gr
          </a>
        </div>
      </div>
    </section>
  )
}
