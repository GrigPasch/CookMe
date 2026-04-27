import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import './PageStyles.css'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['Όλα', 'Μπαχαρικά', 'Βότανα', 'Τσάι']

const PRODUCTS = [
  { name: 'Κύμινο', origin: 'Ισπανία · Μπαρτσελώνα', type: 'Μπαχαρικά', hue: '#6b2437' },
  { name: 'Πράσινο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#c84b3a' },
  { name: 'Πάπρικα', origin: 'Αίγυπτος · Κάιρο', type: 'Μπαχαρικά', hue: '#8b4c8b' },
  { name: 'Δυόσμος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#d4607a' },
  { name: 'Βασιλικός', origin: 'Ελλάδα', type: 'Βότανα', hue: '#2a5c18' },
  { name: 'Μπαχάρι', origin: 'Ιταλία · Ρώμη', type: 'Μπαχαρικά', hue: '#e8a820' },
  { name: 'Μαύρο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#3a6a22' },
  { name: 'Μαστίχα', origin: 'Χίος', type: 'Βότανα', hue: '#c87040' },
  { name: 'Ευκάλυπτος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#4a7a5a' },
  { name: 'Κύμινο', origin: 'Ισπανία · Μπαρτσελώνα', type: 'Μπαχαρικά', hue: '#6b2437' },
  { name: 'Πράσινο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#c84b3a' },
  { name: 'Πάπρικα', origin: 'Αίγυπτος · Κάιρο', type: 'Μπαχαρικά', hue: '#8b4c8b' },
  { name: 'Δυόσμος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#d4607a' },
  { name: 'Βασιλικός', origin: 'Ελλάδα', type: 'Βότανα', hue: '#2a5c18' },
  { name: 'Μπαχάρι', origin: 'Ιταλία · Ρώμη', type: 'Μπαχαρικά', hue: '#e8a820' },
  { name: 'Μαύρο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#3a6a22' },
  { name: 'Μαστίχα', origin: 'Χίος', type: 'Βότανα', hue: '#c87040' },
  { name: 'Ευκάλυπτος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#4a7a5a' },
  { name: 'Κύμινο', origin: 'Ισπανία · Μπαρτσελώνα', type: 'Μπαχαρικά', hue: '#6b2437' },
  { name: 'Πράσινο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#c84b3a' },
  { name: 'Πάπρικα', origin: 'Αίγυπτος · Κάιρο', type: 'Μπαχαρικά', hue: '#8b4c8b' },
  { name: 'Δυόσμος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#d4607a' },
  { name: 'Βασιλικός', origin: 'Ελλάδα', type: 'Βότανα', hue: '#2a5c18' },
  { name: 'Μπαχάρι', origin: 'Ιταλία · Ρώμη', type: 'Μπαχαρικά', hue: '#e8a820' },
  { name: 'Μαύρο Τσάι', origin: 'Ολλανδία', type: 'Τσάι | Βότανα', hue: '#3a6a22' },
  { name: 'Μαστίχα', origin: 'Χίος', type: 'Βότανα', hue: '#c87040' },
  { name: 'Ευκάλυπτος', origin: 'Ελλάδα', type: 'Βότανα', hue: '#4a7a5a' },
]

export default function Assortment() {
  const pageRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('Όλα')

  const filteredProducts = activeFilter === 'Όλα'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.type.includes(activeFilter))

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.page-hero__content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.assortment-grid__item',
        { y: 40, opacity: 0, clipPath: 'inset(20% 0% 0% 0%)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
          stagger: 0.08, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.assortment-grid', start: 'top 80%' },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo(
      '.assortment-grid__item',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: 'power2.out' }
    )
  }, [activeFilter])

  return (
    <div ref={pageRef}>
      <section className="page-hero page-hero--light">
        <div className="page-hero__content">
          <span className="section-label">Κατάλογος</span>
          <h1 className="page-hero__title">
            Πάνω από 500<br />
            <em>μοναδικές γεύσεις</em>
          </h1>
          <p className="page-hero__sub">
            Μπαχαρικά, τσάι, βότανα και μείγματα ανωτέρας ποιότητας.
          </p>
        </div>
      </section>

      <Marquee />

      <section className="assortment-section">
        <div className="assortment-filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn hoverable ${f === activeFilter ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}  // ← wire up the click
            >
              {f}
            </button>
          ))}
        </div>

        <div className="assortment-grid">
          {filteredProducts.map((p, i) => (
            <div key={i} className="assortment-grid__item hoverable">
              <div
                className="assortment-grid__img"
                style={{
                  background: `radial-gradient(ellipse at 40% 30%, ${p.hue}44 0%, transparent 60%),
                    linear-gradient(150deg, ${p.hue}22 0%, ${p.hue}08 100%), #f0ebe0`,
                }}
              >
                <div className="assortment-grid__circle" style={{ borderColor: p.hue + '55' }} />
              </div>
              <div className="assortment-grid__info">
                <span className="assortment-grid__type">{p.type}</span>
                <h3 className="assortment-grid__name">{p.name}</h3>
                <span className="assortment-grid__origin">{p.origin}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
