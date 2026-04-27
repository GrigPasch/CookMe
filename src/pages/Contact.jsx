import { useEffect } from 'react'
import gsap from 'gsap'
import './PageStyles.css'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      '.contact-grid > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div>
      <section className="page-hero page-hero--light">
        <div className="page-hero__content">
          <span className="section-label">Επικοινωνία</span>
          <h1 className="page-hero__title">
            Επικοινωνήστε<br />
            <em>μαζί μας</em>
          </h1>
          <p className="page-hero__sub">
            Έχετε κάποια ερώτηση ή ενδιαφέρεστε για συνεργασία?<br />
            Καλέστε μας ή στείλτε e-mail.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-block">
              <span className="section-label">Διεύθυνση</span>
              <p className="contact-addr"> Βαλτοτόπι Σερρών <br />Δήμος Εμμανουήλ Παππά</p>
            </div>
            <div className="contact-block">
              <span className="section-label">Get in touch</span>
              <a href="τηλ:+306940944225" className="contact-link hoverable">+30 6940944225</a>
              <a href="mailto:info@cookme.gr" className="contact-link hoverable">info@cookme.gr</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="contact-form__title">Send a message</h2>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label>Όνομα</label>
                <input type="text" placeholder="Γιάννης" />
              </div>
              <div className="contact-form__field">
                <label>Επώνυμο</label>
                <input type="text" placeholder="Γιαννακίδης" />
              </div>
            </div>
            <div className="contact-form__field">
              <label>Email</label>
              <input type="email" placeholder="giannis@email.gr" />
            </div>
            <div className="contact-form__field">
              <label>Εταιρεία</label>
              <input type="text" placeholder="Όνομα εταιρείας" />
            </div>
            <div className="contact-form__field">
              <label>Μήνυμα</label>
              <textarea rows={5} placeholder="Τι βοήθεια χρειάζεστε" />
            </div>
            <button type="submit" className="btn btn-light hoverable" style={{ marginTop: '0.5rem' }}>
              Αποστολή
              <svg className="btn-arrow" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
