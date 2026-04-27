import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './StatsSection.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 500, suffix: '+', label: 'Μοναδικά καρυκεύματα, μπαχαρικά και πολλά άλλα' },
  { value: 5, suffix: ' χρόνια', label: 'Οικογενειακή Επιχείρηση' },
  { value: 100, suffix: '%', label: 'Ποιοτικά προϊόντα' },
]

export default function StatsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each number on scroll enter
      gsap.utils.toArray('.stats__num').forEach((el) => {
        const target = parseInt(el.dataset.target, 10)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              {
                val: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate() {
                  el.textContent = Math.round(this.targets()[0].val).toLocaleString()
                },
              }
            )
          },
        })
      })

      // Section entrance
      gsap.fromTo(
        '.stats__item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="stats">
      <div className="stats__inner">
        {STATS.map((s, i) => (
          <div key={i} className="stats__item">
            <div className="stats__value">
              <span className="stats__num" data-target={s.value}>{s.value}</span>
              <span className="stats__suffix">{s.suffix}</span>
            </div>
            <p
              className="stats__label"
              dangerouslySetInnerHTML={{ __html: s.label }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
