import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import './PageStyles.css'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = [
                  'Όλα', 'Μπαχαρικά', 'Αποξηραμένα', 'Ζαχαροπλαστική',
                  'Τσάι Ζεστό', 'Ice Tea', 'Μείγματα', 'Υπερτροφές', 
                  'Γρανίτες', 'Milkshakes']

const PRODUCTS = [
  { name: 'Μαύρο πιπέρι τριμμένο', type: 'Μπαχαρικά', img: '/assets/mauro-piperi-trimmeno.jpg' },
  { name: 'Γλυκιά πάπρικα 200 Asta', type: 'Μπαχαρικά', img: '/assets/glykia-paprika-200-asta-skoni.jpg' },
  { name: 'Κόκκινο Πιπέρι Τριμμένο Καυτερό (Chili)', type: 'Μπαχαρικά', img: '/assets/kokkino-piperi-trimmeno-kautero-chili.jpg' },
  { name: 'Πιπέρι Μιξ Σπυρί', type: 'Μπαχαρικά', img: '/assets/piperi-mix-spyri.jpg' },
  { name: 'Μαύρο πιπέρι Σπυρί', type: 'Μπαχαρικά', img: '/assets/mauro-piperi-spyri.jpg' },
  { name: 'Λευκό πιπέρι Σπυρί', type: 'Μπαχαρικά', img: '/assets/leyko-piperi-spyri.jpg' },
  { name: 'Λευκό πιπέρι Τριμμένο', type: 'Μπαχαρικά', img: '/assets/leyko-piperi-trimmeno.jpg' },
  { name: 'Μπούκοβο Γλυκό', type: 'Μπαχαρικά', img: '/assets/mpoukovo-glyko.jpg' },
  { name: 'Μπούκοβο Καυτερό', type: 'Μπαχαρικά', img: '/assets/mpoykovo-kautero.jpg' },
  { name: 'Μπαχάρι Σπυρί', type: 'Μπαχαρικά', img: '/assets/mpaxari-spyri.jpg' },
  { name: 'Μπαχάρι Τριμμένο', type: 'Μπαχαρικά', img: '/assets/mpaxari-trimmeno.jpg' },
  { name: 'Κιτρινόριζα τριμμένη (Κουρκουμάς)', type: 'Μπαχαρικά', img: '/assets/kitrinoriza-trimmeni.jpg' },
  { name: 'Κύμινο Αλεσμένο', type: 'Μπαχαρικά', img: '/assets/kumino-alesmeno.jpg' },
  { name: 'Πιπερόριζα σκόνη (Τζίντζερ)', type: 'Μπαχαρικά', img: '/assets/piperoriza-skoni-ginger.jpg' },
  { name: 'Κάρυ Απλό', type: 'Μπαχαρικά', img: '/assets/curry-aplo.jpg' },
  { name: 'Κάρυ Καυτερό', type: 'Μπαχαρικά', img: '/assets/curry-kaytero.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε Κόκκους)', type: 'Αποξηραμένα', img: '/assets/kremmydi-apoksirameno-kokkous.jpg' },
  { name: 'Σκόρδο (Αποξηραμένο σε Κόκκους)', type: 'Αποξηραμένα', img: '/assets/skordo-apoksirameno-kokkous.jpg' },
  { name: 'Άνθος αλατιου Μεσολογγίου', type: 'Μπαχαρικά', img: '/assets/anthos-alatiou-mesologgiou.jpg' },
  { name: 'Θαλασσινό Αλάτι (Χοντρό)', type: 'Μπαχαρικά', img: '/assets/thalassino-alati-xontro.jpg' },
  { name: 'Θαλασσινό Αλάτι (Χοντρό) με Μαύρο Πιπέρι', type: 'Μπαχαρικά', img: '/assets/thalassino-alati-xontro-me-mauro-piperi.jpg' },
  { name: 'Θυμάρι (Αποξηραμενο τριμμένο)', type: 'Αποξηραμένα', img: '/assets/thumari-apoksirameno-trimmeno.jpg' },
  { name: 'Δενδρολίβανο (Αποξηραμένο)', type: 'Αποξηραμένα', img: '/assets/dendrolivano-apoksirameno.jpg' },
  { name: 'Βασιλικός (Αποξηραμένος Τριμμένος)', type: 'Αποξηραμένα', img: '/assets/vasilikos-apoksiramenos-trimmenos.jpg' },
  { name: 'Εστραγκόν (Αποξηραμένο Τριμμένο)', type: 'Αποξηραμένα', img: '/assets/estragkon-apoksirameno-trimmeno.jpg' },
  { name: 'Κανέλα Κεϋλάνης (Αλεσμένη)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/kanela-keylanis-alesmeni.jpg' },
  { name: 'Κανέλα Cassia (Αλεσμένη)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/kanela-cassia-alesmeni.jpg' },
  { name: 'Κανέλα Cassia Ξυλάκι', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/kanela-cassia-ksylaki.jpg' },
  { name: 'Γαρύφαλλο (Αλεσμένο)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/garyfallo-alesmeno.jpg' },
  { name: 'Γαρύφαλλο (Σπυρί)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/garyfallo-spyri.jpg' },
  { name: 'Μοσχοκάρυδο (Αλεσμένο)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/mosxokarydo-alesmeno.jpg' },
  { name: 'Αμμωνία (Διττανθρακικό Αμμώνιο)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/amwnia-dittanthrakiko-ammwnio.jpg' },
  { name: 'Τσάι του Βουνού (Αποξηραμένο)', type: 'Τσάι Ζεστό', img: '/assets/tsai-tou-vounou-apoksirameno.jpg' },
  { name: 'Κολίανδρος (Σπυρί)', type: 'Μπαχαρικά', img: '/assets/koliandros-spyri.jpg' },
  { name: 'Καρύδα Τριμμένη (Ινδοκάρυδo)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/karyda-trimmeni-indokarydo.jpg' },
  { name: 'Κουκουνάρι Ψίχα', type: 'Αποξηραμένα', img: '/assets/koukounari-psixa.jpg' },
  { name: 'Μαστίχα Χίου Τριμμένη', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/mastixa-xiou-trimmeni.jpg' },
  { name: 'Πορτοκαλοπίπερο (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/portokalopipero-meigma.jpg' },
  { name: 'Καρύκευμα για Φέτα & Σαλάτες (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/meigma-gia-feta-kai-salates.jpg' },
  { name: 'Καρύκευμα για Τζατζίκι (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/karykeuma-gia-tzatziki-meigma.jpg' },
  { name: 'Μαχλέπι Τριμμένο', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/maxlepi-trimmeno.jpg' },
  { name: 'Μαχλέπι Σπυρί', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/maxlepi-spyri.jpg' },
  { name: 'Λιναρόσπορος Χρυσός (Σπόροι)', type: 'Μπαχαρικά, Υpεpτpoφές', img: '/assets/linarosporos-xrysos-sporoi.jpg' },
  { name: 'Λιναρόσπορος Καφέ (Σπόροι)', type: 'Μπαχαρικά, Υpεpτpoφές', img: '/assets/linarosporos-kafe-sporoi.jpg' },
  { name: 'Σησάμι Λευκό Αποξηραμένο (Σπόροι)', type: 'Μπαχαρικά, Υπερτροφές', img: '/assets/sisami-leyko-apoksirameno-sporoi.jpg' },
  { name: 'Τρούφα Μαύρης Σοκολάτας (Διακοσμητική)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/troufa-mauris-sokolatas-diakosmitiki.jpg' },
  { name: 'Γρανίτα Φράουλα', type: 'Γρανίτες', img: '/assets/granita-fraoula.jpg' },
  { name: 'Γρανίτα Τσιχλόφουσκα', type: 'Γρανίτες', img: '/assets/granita-tsixlofouska.jpg' },
  { name: 'Γρανίτα Limoncello', type: 'Γρανίτες', img: '/assets/granita-lemoni.jpg' },
  { name: 'Γρανίτα Ροδάκινο', type: 'Γρανίτες', img: '/assets/granita-rodakino.jpg' },
  { name: 'Milkshake Καραμέλα', type: 'Milkshakes', img: '/assets/milkshake-caramella.jpg' },
  { name: 'Milkshake Banoffee', type: 'Milkshakes', img: '/assets/milkshake-banoffee.jpg' },
  { name: 'Milkshake Σοκολάτα', type: 'Milkshakes', img: '/assets/milkshake-sokolata.jpg' },
  { name: 'Milkshake Φράουλα - Βανίλια', type: 'Milkshakes', img: '/assets/milkshake-fraoula.jpg' },
  { name: 'Φρούτα του Δάσους με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/assets/tea-frouta-tou-dasous-me-stevia.jpg' },
  { name: 'Φράουλα με Στέβiα (Τσάι Στιγμiαίo - Ice Tea)', type: 'Ice Tea', img: '/assets/tea-fraoula-me-stevia.jpg' },
  { name: 'Λεμόνι με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/assets/tea-lemoni-me-stevia.jpg' },
  { name: 'Πράσινο Μήλο με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/assets/tea-prasino-milo-me-stevia.jpg' },
  { name: 'Ροδάκινο με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/assets/tea-rodakino-me-stevia.jpg' },
  { name: 'Πάπρικα Καπνιστή', type: 'Μπαχαρικά', img: '/assets/paprika-kapnisti.jpg' },
  { name: 'Κόκκινο Πιπέρι Τριμμένο Καγιέν', type: 'Μπαχαρικά', img: '/assets/kokkino-piperi-trimmeno-kayen.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε Σκόνη)', type: 'Αποξηραμένα', img: '/assets/kremmudi-apoksirameno-skoni.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε Νιφάδες)', type: 'Αποξηραμένα', img: '/assets/kremmudi-apoksirameno-nifades.jpg' },
  { name: 'Σκόρδo (Αποξηραμένο σe Νiφάδeς)', type: 'Απoξηpaμέvnα', img: '/assets/skordo-apoksirameno-nifades.jpg' },
  { name: 'Σκόρδo (Αποξηραμένο σe Σκόνη)', type: 'Αποξηραμένα', img: '/assets/skordo-apoksirameno-skoni.jpg' },
  { name: 'Πoρτoκάλi (Αποξηραμένο σe Σκόνη)', type: 'Αποξηραμένα', img: '/assets/portokali-apoksirameno-skoni.jpg' },
  { name: 'Λεμόνι (Αποξηραμένο σε Σκόνη)', type: 'Αποξηραμένα', img: '/assets/lemoni-apoksirameno-skoni.jpg' },
  { name: 'Ρίγανη Ελληνική τριμμένη', type: 'Αποξηραμένα', img: '/assets/oregano-ellhniki-trimmeni.jpg' },
  { name: 'Δυόσμος (Αποξηραμένος τριμμένος)', type: 'Αποξηραμένα', img: '/assets/dyosmos-apoksirammenos-trimmenos.jpg' },
  { name: 'Δάφνη (Αποξηραμένη)', type: 'Αποξηραμένα', img: '/assets/dafni-apoksirameni-fylla.jpg' },
  { name: 'Κανέλα Κεϋλάνης (Ξυλάκι)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/kanela-keylanis-sticks.jpg' },
  { name: 'Μοσχοκάρυδο (Καρπός)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/mosxokarydo-karpos.jpg' },
  { name: 'Βανιλίνη (Φιαλίδια)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/vanilini-fialidia.jpg' },
  { name: 'Κιτρικό Οξύ (Ξινό)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/kitriko-oksi-ksino.jpg' },
  { name: 'Άνθoς Χαμομήλι (Αποξηραμένο)', type: 'Τσάι Ζεστό', img: '/assets/anthos-xamomili-apoksirameno.jpg' },
  { name: 'ΤΣΙΑ Αποξηραμένοι Σπόροι', type: 'Μπαχαρικά, Υπερτροφές', img: '/assets/tsia-apokshramenoi-sporoi.jpg' },
  { name: 'Άνηθος (Αποξηραμένος Τριμμένος)', type: 'Αποξηραμένα', img: '/assets/anithos-apoksiramenos-trimmenos.jpg' },
  { name: 'Διττανθρακική (Μαγειρική) Σόδα', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/assets/dittanthrakiki-mageiriki-soda.jpg' },
  { name: 'Λουίζα (Αποξηραμένη)', type: 'Τσάι Ζεστό', img: '/assets/luiza-apoksirameni-fylla.jpg' },
  { name: 'Μουστάρδα Σκόνη', type: 'Μπαχαρικά', img: '/assets/moustarda-skoni.jpg' },
  { name: 'Λεμονοπίπερο (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/lemonopipero-meigma.jpg' },
  { name: 'Ανατολίτικο (Μείγμα για Κoτόπουλo)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/anatolitiko-meigma-gia-kotopoula.jpg' },
  { name: 'Καρύκευμα για Κοτόπουλο(Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/karykeuma-gia-kotopoulo-meigma.jpg' },
  { name: 'Καρύκευμα για Κεφτέδες (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/karykeuma-gia-keftedes-meigma.jpg' },
  { name: 'Καρύκευμα για Ψητά (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/karykeuma-gia-psita-meigma.jpg' },
  { name: 'Καρύκευμα για Πατάτες (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/assets/karykeuma-gia-patates-meigma.jpg' },
  { name: 'Μέντα (Αποξηραμένη Τριμμένη)', type: 'Αποξηραμένα', img: '/assets/menta-apoksiramenh-trimmeni.jpg' },
  { name: 'Σησάμι Φυσικό (Σπόροι)', type: 'Μπαχαρικά, Υπερτροφές', img: '/assets/sisami-fysiko-sporoi.jpg' },
  { name: 'Γρανίτα Φράουλα & Blueberry', type: 'Γρανίτες', img: '/assets/granita-fraoula-blueberry.jpg' },
  { name: 'Γρανίτα Mango & Passion fruit', type: 'Γρανίτες', img: '/assets/granita-mango-passion-fruit.jpg' },
  { name: 'Γρανίτα Καρπούζι', type: 'Γρανίτες', img: '/assets/granita-karpouzi.jpg' },
  { name: 'Πράσινο Τσάι με κομμάτια Καραμέλας (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/assets/prasino-tsai-me-kommatia-karamellas.jpg' },
  { name: 'Φράουλα - Πορτοκάλι Herbal Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/assets/fraoula-portokali-herbal-tea.jpg' },
  { name: 'Πράσινο Τσάι Ευωδιαστός Κήπος (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/assets/prasino-tsai-evwdiastos-kipos.jpg' },
  { name: 'Παιδικές Αναμνήσεις Herbal Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/assets/paidikes-anamniseis-herbal-tea.jpg' },
  { name: 'Christmas Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/assets/christmas-tea-arwmatiko-tsai.jpg' },
  { name: 'Milkshake t. Ferrero', type: 'Milkshakes', img: '/assets/milkshake-ferrero.jpg' }
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
              <div className="assortment-grid__img">
                <div className="assortment-grid__circle" style={{ borderColor: '#e0dcd0' }} />
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="product-image-render"
                    onError={(e) => { e.target.src = '/assets/placeholder.png'; }}
                  />
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
