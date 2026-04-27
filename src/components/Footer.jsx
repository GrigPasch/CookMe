import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo hoverable">CookMe</Link>
          <p className="footer__tagline">Τα καλύτερα της φύσης.</p>
        </div>

        <div className="footer__nav">
          <div className="footer__col">
            <span className="footer__col-title">ΜΕΝΟΥ</span>
            <Link to="/" className="footer__link hoverable">ΑΡΧΙΚΗ</Link>
            <Link to="/καταλογος" className="footer__link hoverable">ΠΡΟΪΌΝΤΑ</Link>
            <Link to="/about" className="footer__link hoverable">ΣΧΕΤΙΚΆ</Link>
            <Link to="/contact" className="footer__link hoverable">ΕΠΙΚΟΙΝΩΝΆΑ</Link>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Προϊόντα</span>
            <Link to="/καταλογος/μπαχαρικα" className="footer__link hoverable">Μπαχαρικά</Link>
            <Link to="/καταλογος/βοτανα" className="footer__link hoverable">Βότανα</Link>
            <Link to="/καταλογος/τσαι" className="footer__link hoverable">Τσάι</Link>
            <a href="/καταλογος" className="footer__link hoverable">Κατάλογος</a>
          </div>

          <div className="footer__col">
            <span className="footer__col-title">Επικοινωνία</span>
            <p className="footer__address">
              Βαλτοτόπι Σερρών<br />
              Δήμος Εμμανουήλ Παππά<br />
              62100 Σέρρες | Ελλάδα
            </p>
            <a href="tel:+306940944225" className="footer__link hoverable">+30 6940944225</a>
            <a href="mailto:info@cookme.gr" className="footer__link hoverable">
              info@cookme.gr
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© {new Date().getFullYear()} CookMe. All rights reserved.</span>
        <div className="footer__social">
          {['Facebook', 'LinkedIn', 'YouTube', 'Instagram'].map((s) => (
            <a key={s} href="#" className="footer__social-link hoverable">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
