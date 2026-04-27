import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text block staggered reveal
      gsap.fromTo(
        '.about__text > *',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__text', start: 'top 75%' },
        }
      )

      // Image clip-path wipe reveal
      gsap.fromTo(
        '.about__img-wrap',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about__img-wrap', start: 'top 75%' },
        }
      )

      // Parallax on inner image
      gsap.to('.about__img-inner', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__img-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Year number counter animation
      const yearEl = document.querySelector('.about__year')
      if (yearEl) {
        gsap.fromTo(
          yearEl,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: yearEl, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about">
      <div className="about__inner">
        {/* Left: text */}
        <div className="about__text">
          <span className="section-label">Σχετικά με εμάς</span>
          <h2 className="about__title">
            Μια οικογενειακή επιχείρηση<br />
            <em>με γνώμονα την ποιότητα</em>
          </h2>
          <p className="about__body">
            Από την έδρα μας, στο Βαλτοτόπι Σερρών
            προμηθεύουμε κουζίνες σε όλη την Ελλάδα
            με μπαχαρικά ανωτέρας ποιότητας.
          </p>
          <p className="about__body">
            Μπαχαρικά και καρυκεύματα τα οποία ξεχωρίζουν σε κάθε τραπέζι.
          </p>
          <div className="about__values">
            {['ΠΟΙΌΤΗΤΑ', 'ΓΕΎΣΗ', 'ΑΞΙΟΠΙΣΤΊΑ'].map((v) => (
              <span key={v} className="about__value-tag">{v}</span>
            ))}
          </div>
        </div>

        {/* Right: image with year overlay */}
        <div className="about__media">
          <div className="about__img-wrap">
            <div className="about__img-inner">
              {/* Placeholder image — large lush greenhouse aesthetic */}
              <div className="about__img-placeholder" />
            </div>
            <div className="about__img-overlay" />
          </div>
          <span className="about__year">2021</span>
        </div>
      </div>
    </section>
  )
}
