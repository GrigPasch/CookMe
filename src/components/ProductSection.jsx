import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './ProductSection.css'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  {
    id: 'μπαχαρικα',
    label: '01',
    title: 'Μπαχαρικά',
    sub: 'From exotic to beloved classics — everything you need.',
    bg: 'linear-gradient(135deg, #1a3a0f 0%, #2d6020 40%, #1e4a15 70%, #0f2008 100%)',
    accent: '#6ab04c',
    link: '/καταλογος/μπαχαρικα',
  },
  {
    id: 'βότανα',
    label: '02',
    title: 'Βότανα',
    sub: 'From trusted greens to rare specimens for true connoisseurs.',
    bg: 'linear-gradient(135deg, #0a2515 0%, #1a4a2a 40%, #0f3520 70%, #061508 100%)',
    accent: '#4caf7d',
    link: '/καταλογος/βοτανα',
  },
  {
    id: 'τσαι',
    label: '03',
    title: 'Τσάι',
    sub: 'Finishing touches that elevate every arrangement.',
    bg: 'linear-gradient(135deg, #2a1a08 0%, #5a3a10 40%, #3a2508 70%, #1a0f02 100%)',
    accent: '#c49a4a',
    link: '/καταλογος',
  },
]

export default function ProductSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.ps__header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ps__header', start: 'top 80%' },
        }
      )

      // Card reveals — clip-path wipe from bottom
      gsap.utils.toArray('.ps__card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0% 0% 0%)', y: 30 },
          {
            clipPath: 'inset(0% 0% 0% 0%)', y: 0,
            duration: 1.1, ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: i * 0.08,
          }
        )

        // Parallax image inside card
        gsap.to(card.querySelector('.ps__card-img'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ps">
      <div className="ps__header">
        <span className="section-label">Κατάλογος</span>
        <h2 className="ps__title">
          Μπαχαρικά<br />
          <em>από διαλεγμένους προμηθευτές</em>
        </h2>
        <p className="ps__desc">
          Διαλεγμένα για την ποιότητα και την γεύση τους.
        </p>
        <Link to="/καταλογος" className="btn btn-light hoverable">
          Εξερευνήστε όλα τα προϊόντα
          <svg className="btn-arrow" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </Link>
      </div>

      <div className="ps__grid">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} to={cat.link} className="ps__card hoverable">
            <div className="ps__card-img" style={{ background: cat.bg }}>
              {/* Decorative botanical element */}
              <svg className="ps__card-deco" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="70" stroke={cat.accent} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4"/>
                <circle cx="100" cy="100" r="45" stroke={cat.accent} strokeWidth="0.5" opacity="0.25"/>
                <line x1="100" y1="30" x2="100" y2="170" stroke={cat.accent} strokeWidth="0.5" opacity="0.3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke={cat.accent} strokeWidth="0.5" opacity="0.3"/>
                <circle cx="100" cy="100" r="4" fill={cat.accent} opacity="0.5"/>
              </svg>
            </div>
            <div className="ps__card-body">
              <span className="ps__card-num">{cat.label}</span>
              <h3 className="ps__card-title">{cat.title}</h3>
              <p className="ps__card-sub">{cat.sub}</p>
              <span className="ps__card-cta">
                Ανακαλύψτε
                <svg viewBox="0 0 16 16" fill="none" width="14">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
