import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import './ProductCard.css'
import { RiArrowDownLongFill } from "react-icons/ri";

export default function ProductCard({ product, index }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef   = useRef(null)
  const innerRef  = useRef(null)
  const glintRef  = useRef(null)
  const backItems = useRef([])

  const handleFlip = () => {
    const card  = cardRef.current
    const inner = innerRef.current
    const glint = glintRef.current

    if (flipped) {
      // ── FLIP BACK ──
      gsap.timeline()
        .to(inner, {
          rotateY: 0,
          scale: 1.06,
          duration: 0.55,
          ease: 'power3.inOut',
        })
        .to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' }, '-=0.05')
      setFlipped(false)
    } else {
      // ── FLIP FORWARD ──
      const tl = gsap.timeline({
        onStart: () => setFlipped(true),
      })

      // 1. Card lifts & tilts slightly before flip
      tl.to(inner, {
        scale: 1.07,
        rotateX: 3,
        duration: 0.2,
        ease: 'power2.out',
      })

      // 2. The actual flip — push toward viewer with translateZ
      tl.to(inner, {
        rotateY: 180,
        scale: 1.04,
        duration: 0.65,
        ease: 'power3.inOut',
      }, '-=0.05')

      // 3. Settle back to natural size
      tl.to(inner, {
        scale: 1,
        rotateX: 0,
        duration: 0.3,
        ease: 'back.out(1.2)',
      }, '-=0.15')

      // Glint sweep — timed to hit at the midpoint of the flip
      gsap.timeline()
        .set(glint, { x: '-110%', opacity: 1 })
        .to(glint, {
          x: '110%',
          opacity: 0.6,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(glint, { opacity: 0 }),
        })

      // Back content staggers in after flip completes
      gsap.fromTo(
        backItems.current.filter(Boolean),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: 'power2.out',
          delay: 0.6,
        }
      )
    }
  }

  // Subtle idle float animation
  useEffect(() => {
    const card = cardRef.current
    const delay = (index % 4) * 0.4

    const float = gsap.to(card, {
      y: -5,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay,
      paused: flipped,
    })

    return () => float.kill()
  }, [flipped])

  // Mouse tilt on hover (front only)
  const handleMouseMove = (e) => {
    if (flipped) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(innerRef.current, {
      rotateY: x * 10,
      rotateX: -y * 8,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (flipped) return
    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div
      ref={cardRef}
      className={`pcard ${flipped ? 'pcard--flipped' : ''}`}
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glint overlay — sweeps across on flip */}
      <div ref={glintRef} className="pcard__glint" />

      <div ref={innerRef} className="pcard__inner">

        {/* ── FRONT ── */}
        <div className="pcard__face pcard__face--front">
          <div className="pcard__img-wrap">
            <img
              src={product.img}
              alt={product.name}
              className="pcard__img"
              onError={(e) => { e.target.src = '/assets/placeholder.png' }}
            />
            <div className="pcard__img-overlay" />
          </div>

          <div className="pcard__front-footer">
            <span className="pcard__type">{product.type}</span>
            <h3 className="pcard__name">{product.name}</h3>
          </div>

          <div className="pcard__hint-front">
            <span>Λεπτομέρειες</span>
            <svg viewBox="0 0 20 20" fill="none" width="11">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="pcard__face pcard__face--back">
          {/* Animated botanical rings */}
          <svg className="pcard__back-deco" viewBox="0 0 300 300" fill="none">
            <circle className="pcard__deco-ring1" cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 8" opacity="0.15"/>
            <circle className="pcard__deco-ring2" cx="150" cy="150" r="90"  stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            <circle cx="150" cy="150" r="5" fill="currentColor" opacity="0.15"/>
          </svg>

          <div className="pcard__back-content">
            <span
              ref={el => backItems.current[0] = el}
              className="pcard__type pcard__type--back"
            >
              {product.type}
            </span>

            <h3
              ref={el => backItems.current[1] = el}
              className="pcard__back-title"
            >
              {product.name}
            </h3>

            {product.origin && (
              <p
                ref={el => backItems.current[2] = el}
                className="pcard__back-origin"
              >
                <svg viewBox="0 0 16 16" fill="none" width="11" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5C12.5 3.51 10.49 1.5 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor" opacity="0.7"/>
                </svg>
                {product.origin}
              </p>
            )}

            {product.desc && (
              <p
                ref={el => backItems.current[3] = el}
                className="pcard__back-desc"
              >
                {product.desc}
              </p>       
            )}

                <h3><RiArrowDownLongFill /> Τύποι Συσκευασιών <RiArrowDownLongFill /></ h3>
            {product.package && (
                
              <p
                ref={el => backItems.current[3] = el}
                className="pcard__back-desc"
              >
                {product.package}
              </p>       
            )}
          </div>

          <button
            ref={el => backItems.current[4] = el}
            className="pcard__close"
            aria-label="Κλείσιμο"
          >
            <svg viewBox="0 0 20 20" fill="none" width="13">
              <path d="M16 10H4M10 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Πίσω</span>
          </button>
        </div>

      </div>
    </div>
  )
}