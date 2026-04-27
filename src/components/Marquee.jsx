import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Marquee.css'

const ITEMS = [
  'Κανέλα', '·', 'Μπαχάρι', '·', 'Μαστίχα', '·',
  '500+ γεύσεις', '·', 'Πάπρικα', '·',
  'Οικογενειακή Επιχείρηση', '·', 'est 2010', '·',
  'Μείγματα', '·', 'Τσάι', '·', 'Βότανα', '·',
  '500+ γεύσεις', '·', 'Κύμινο', '·',
  'Κάρυ', '·', 'Πιπέρι', '·',
]

export default function Marquee({ dark = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Duplicate items so it loops seamlessly
    const clone = track.cloneNode(true)
    track.parentElement.appendChild(clone)

    const totalW = track.offsetWidth
    const tween = gsap.to([track, clone], {
      x: `-=${totalW}`,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalW),
      },
    })

    return () => tween.kill()
  }, [])

  return (
    <div className={`marquee ${dark ? 'marquee--dark' : ''}`} aria-hidden="true">
      <div className="marquee__inner">
        <div ref={trackRef} className="marquee__track">
          {ITEMS.map((item, i) => (
            <span key={i} className="marquee__item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
