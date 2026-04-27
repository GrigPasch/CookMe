import { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger'
import StatsSection from '../components/StatsSection'
import Marquee from '../components/Marquee'
import ContactCTA from '../components/ContactCTA'
import './PageStyles.css'


gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-hero__content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.timeline__item',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline', start: 'top 75%' },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <section className="page-hero page-hero--dark">
        <div className="page-hero__content">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Η Ιστορία μας</span>
          <h1 className="page-hero__title" style={{ color: 'var(--white)' }}>
            Δίπλα σας σε κάθε γεύμα<br />
            <em>από το 2021</em>
          </h1>
          <p className="page-hero__sub" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Η CookMe, σαν αυθεντική οικογενειακή επιχείρηση, βρίσκετε δίπλα σας σε κάθε γεύμα με προιόντα που θυμίζουν αγάπη.
          </p>
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-values-grid">
          {[
            { title: 'Χωρις συμβιβασμούς', body: 'Στην ποιότητα, δεν χωράνε συμβιβασμοί. Για αυτό και εμείς δεν κάνουμε κανέναν.' },
            { title: 'Εταιρεία με πρόσωπο', body: 'Κάθε παραγγελία επεξεργάζεται και συσκευάζεται με προσοχή και αγάπη από εμάς.' },
          ].map((v, i) => (
            <div key={i} className="about-value-card">
              <span className="about-value-num">0{i + 1}</span>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee />
      <StatsSection />
      <ContactCTA />
    </div>
  )
}
