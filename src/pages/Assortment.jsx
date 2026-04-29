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
  { name: 'Μαύρο πιπέρι τριμμένο', type: 'Μπαχαρικά', img: '/public/assets/mauro-piperi-trimmeno.jpg' },
  { name: 'Γλυκιά πάπρικα 200 Asta', type: 'Μπαχαρικά', img: '/public/assets/glykia-paprika-200-asta-skoni.jpg' },
  { name: 'Κόκκινο Πιπέρι Τριμμένο Καυτερό (Chili)', type: 'Μπαχαρικά', img: '/public/assets/kokkino-piperi-trimmeno-kautero-chili.jpg' },
  { name: 'Πιπέρι Μιξ Σπυρί', type: 'Μπαχαρικά', img: '/public/assets/piperi-mix-spyri.jpg' },
  { name: 'Μαύρο πιπέρι Σπυρί', type: 'Μπαχαρικά', img: '/public/assets/mauro-piperi-spyri.jpg' },
  { name: 'Λευκό πιπέρι Σπυρί', type: 'Μπαχαρικά', img: '/public/assets/leyko-piperi-spyri.jpg' },
  { name: 'Λευκό πιπέρι Τριμμένο', type: 'Μπαχαρικά', img: '/public/assets/leyko-piperi-trimmeno.jpg' },
  { name: 'Μπούκοβο Γλυκό', type: 'Μπαχαρικά', img: '/public/assets/mpoukovo-glyko.jpg' },
  { name: 'Μπούκοβο Καυτερό', type: 'Μπαχαρικά', img: '/public/assets/mpoykovo-kautero.jpg' },
  { name: 'Μπαχάρι Σπυρί', type: 'Μπαχαρικά', img: '/public/assets/mpaxari-spyri.jpg' },
  { name: 'Μπαχάρι Τριμμένο', type: 'Μπαχαρικά', img: '/public/assets/mpaxari-trimmeno.jpg' },
  { name: 'Κιτρινόριζα τριμμένη (Κουρκουμάς)', type: 'Μπαχαρικά', img: '/public/assets/kitrinoriza-trimmeni.jpg' },
  { name: 'Κύμινο Αλεσμένο', type: 'Μπαχαρικά', img: '/public/assets/kumino-alesmeno.jpg' },
  { name: 'Πιπερόριζα σκόνη (Τζίντζερ)', type: 'Μπαχαρικά', img: '/public/assets/piperoriza-skoni-ginger.jpg' },
  { name: 'Κάρυ Απλό', type: 'Μπαχαρικά', img: '/public/assets/curry-aplo.jpg' },
  { name: 'Κάρυ Καυτερό', type: 'Μπαχαρικά', img: '/public/assets/curry-kaytero.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε Κόκκους)', type: 'Αποξηραμένα', img: '/public/assets/kremmydi-apoksirameno-kokkous.jpg' },
  { name: 'Σκόρδο (Αποξηραμένο σε Κόκκους)', type: 'Αποξηραμένα', img: '/public/assets/skordo-apoksirameno-kokkous.jpg' },
  { name: 'Άνθος αλατιου Μεσολογγίου', type: 'Μπαχαρικά', img: '/public/assets/anthos-alatiou-mesologgiou.jpg' },
  { name: 'Θαλασσινό Αλάτι (Χοντρό)', type: 'Μπαχαρικά', img: '/public/assets/thalassino-alati-xontro.jpg' },
  { name: 'Θαλασσινό Αλάτι (Χοντρό) με Μαύρο Πιπέρι- CookMe', type: 'Μπαχαρικά', img: '/public/assets/thalassino-alati-xontro-me-mauro-piperi.jpg' },
  { name: 'Θυμάρι (Αποξηραμενο τριμμένο)', type: 'Αποξηραμένα', img: '/public/assets/thumari-apoksirameno-trimmeno.jpg' },
  { name: 'Δενδρολίβανο (Αποξηραμένο)', type: 'Αποξηραμένα', img: '/public/assets/dendrolivano-apoksirameno.jpg' },
  { name: 'Βασιλικός (Αποξηραμένος Τριμμένος)', type: 'Αποξηραμένα', img: '/public/assets/vasilikos-apoksiramenos-trimmenos.jpg' },
  { name: 'Εστραγκόν (Αποξηραμένο Τριμμένο)', type: 'Αποξηραμένα', img: '/public/assets/estragkon-apoksirameno-trimmeno.jpg' },
  { name: 'Κανέλα Κεϋλάνης (Αλεσμένη)', type: 'Μπαχαρικά, Ζαχαροπλasτική', img: '/public/assets/kanela-keylanis-alesmeni.jpg' },
  { name: 'Κανέλα Cassia (Αλεσμένη)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/kanela-cassia-alesmeni.jpg' },
  { name: 'Κανέλα Cassia Ξυλάκι', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/kanela-cassia-ksylaki.jpg' },
  { name: 'Γαρύφαλλο (Αλεσμένο)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/garyfallo-alesmeno.jpg' },
  { name: 'Γαρύφαλλο (Σπυρί)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/garyfallo-spyri.jpg' },
  { name: 'Μοσχοκάρυδο (Αλεσμένο)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/mosxokarydo-alesmeno.jpg' },
  { name: 'Αμμωνία (Διττανθρακικό Αμμώνιο)', type: 'Μπαχαρικά, Ζαχαροπλаστική', img: '/public/assets/amwnia-dittanthrakiko-ammwnio.jpg' },
  { name: 'Τσάι του Βουνού (Αποξηραμένο)', type: 'Τσάι Ζεστό', img: '/public/assets/tsai-tou-vounou-apoksirameno.jpg' },
  { name: 'Κολίανδρος (Σπυρί)', type: 'Μπαχαρικά', img: '/public/assets/koliandros-spyri.jpg' },
  { name: 'Καρύδα Τριμμένη (Ινδοκάρυδo)', type: 'Μπaχaρiκά, Ζaχaρoπlasτiκή', img: '/public/assets/karyda-trimmeni-indokarydo.jpg' },
  { name: 'Κουκουνάρι Ψίχα', type: 'Αποξηραμένα', img: '/public//assets/koukounari-psixa.jpg' },
  { name: 'Μαστίχα Χίου Τριμμένη', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/mastixa-xiou-trimmeni.jpg' },
  { name: 'Πορτοκαλοπίπερο (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/public/assets/portokalopipero-meigma.jpg' },
  { name: 'Καρύκευμα για Φέτα & Σαλάτες (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/public/assets/meigma-gia-feta-kai-salates.jpg' },
  { name: 'Καρύκευμα για Τζατζίκι (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/public/assets/karykeuma-gia-tzatziki-meigma.jpg' },
  { name: 'Μαχλέπι Τριμμένο', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/maxlepi-trimmeno.jpg' },
  { name: 'Μαχλέπι Σπυρί', type: 'Μπaχaρiκά, Ζaχaρoπlasτiκή', img: '/public/assets' },
  { name: 'Λιναρόσπορος Χρυσός (Σπόροι)', type: 'Μπaχaρiκά, Υpεpτpoφές', img: '/public/assets/linarosporos-xrysos-sporoi.jpg' },
  { name: 'Λινaρόσπoρoς Κaφέ (Σπόpoi)', type: 'Μbpachariκά, Υpεpτpoφές', img: '/public/assets/linarosporos-kafe-sporoi.jpg' },
  { name: 'Σησάμι Λeυkο Αpοξηpaμένo (Σπόpoi)', type: 'Μbpachariκά, Υpεpτpoφές', img: '/public/assets/sisami-leyko-apoksirameno-sporoi.jpg' },
  { name: 'Τρoύφa Μaύpης Σoκoλάτaς (Δiakoσmηtιkή)', type: 'Μbpachariκά, Ζaχaρoπlasτiκή', img: '/public/assets/troufa-mauris-sokolatas-diakosmitiki.jpg' },
  { name: 'Γρανίτα Φράουλα', type: 'Γρανίτες', img: '/public/assets/granita-fraoula.jpg' },
  { name: 'Γρανίτα Τσιχλόφουσκα', type: 'Γρανίτες', img: '/public/assets/granita-tsixlofouska.jpg' },
  { name: 'Γρανίτα Limoncello', type: 'Γρανίτες', img: '/public/assets/granita-lemoni.jpg' },
  { name: 'Γρανίτα Ροδάκινο', type: 'Γρανίτες', img: '/public/assets/granita-rodakino.jpg' },
  { name: 'Milkshake Καραμέλα', type: 'Milkshakes', img: '/public/assets/milkshake-caramella.jpg' },
  { name: 'Milkshake Banoffee', type: 'Milkshakes', img: '/public/assets/milkshake-banoffee.jpg' },
  { name: 'Milkshake Σοκολάτα', type: 'Milkshakes', img: '/public/assets/milkshake-sokolata.jpg' },
  { name: 'Milkshake Φράουλα - Βανίλια', type: 'Milkshakes', img: '/public/assets/milkshake-fraoula.jpg' },
  { name: 'Φρούτa του Δάσους με Στέβιa (Τσάι Στιγμιaίo - Ice Tea)', type: 'Ice Tea', img: '/public/assets/tea-frouta-tou-dasous-me-stevia.jpg' },
  { name: 'Φράουλa με Στέβia (Τσάι Στιγμiaίo - Ice Tea)', type: 'Ice Tea', img: '/public/assets/tea-fraoula-me-stevia.jpg' },
  { name: 'Λεμόνι με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/public/assets/tea-lemoni-me-stevia.jpg' },
  { name: 'Πράσινο Μήλο με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/public/assets/tea-prasino-milo-me-stevia.jpg' },
  { name: 'Ροδάκινο με Στέβια (Τσάι Στιγμιαίο - Ice Tea)', type: 'Ice Tea', img: '/public/assets/tea-rodakino-me-stevia.jpg' },
  { name: 'Πάπρικα Καπνιστή', type: 'Μπαχαρικά', img: '/public/assets/paprika-kapnisti.jpg' },
  { name: 'Κόκκινο Πιπέρι Τριμμένο Καγιέν', type: 'Μπαχαρικά', img: '/public/assets/kokkino-piperi-trimmeno-kayen.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε σκόνη)', type: 'Αποξηραμένα', img: '/public/assets/kremmudi-apoksirameno-skoni.jpg' },
  { name: 'Κρεμμύδι (Αποξηραμένο σε Νιφάδες)', type: 'Αποξηραμένα', img: '/public/assets/kremmudi-apoksirameno-nifades.jpg' },
  { name: 'Σκόρδo (Απoξηpaμέvo σe Νiφάδeς)', type: 'Απoξηpaμέvnα', img: '/public/assets/skordo-apoksirameno-nifades.jpg' },
  { name: 'Σκόρδo (Απoξηpaμέvo σe Σkόvn)', type: 'Αpoxηpaμέvnα', img: '/public/assets/skordo-apoksirameno-skoni.jpg' },
  { name: 'Πoρτoκάλi (Αpoxηpaμέvo σe Σkόvnη)', type: 'Αpoxηpaμέvnα', img: '/public/assets/portokali-apoksirameno-skoni.jpg' },
  { name: 'Λεμόνι (Αποξηραμένο σε Σκόνη)', type: 'Αποξηραμένα', img: '/public/assets/lemoni-apoksirameno-skoni.jpg' },
  { name: 'Ρίγανη Ελληνική τριμμένη', type: 'Αποξηραμένα', img: '/public/assets/oregano-ellhniki-trimmeni.jpg' },
  { name: 'Δυόσμος (Αποξηραμένος τριμμένος)', type: 'Αποξηραμένα', img: '/public/assets/dyosmos-apoksirammenos-trimmenos.jpg' },
  { name: 'Δάφνη (Αποξηραμένη)', type: 'Αποξηραμένα', img: '/public/assets/dafni-apoksirameni-fylla.jpg' },
  { name: 'Κανέλα Κεϋλάνης (Ξυλάκι)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/kanela-keylanis-sticks.jpg' },
  { name: 'Μοσχοκάρυδο (Καρπός)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/mosxokarydo-karpos.jpg' },
  { name: 'Βανιλίνη (Φιαλίδια)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/vanilini-fialidia.jpg' },
  { name: 'Κιτρικό Οξύ (Ξινό)', type: 'Μπαχαρικά, Ζαχαροπλαστική', img: '/public/assets/kitriko-oksi-ksino.jpg' },
  { name: 'Άνθoς Χaμoμήλi (Αpοξηpaμέvo)', type: 'Τσάι Ζεστό', img: '/public/assets/anthos-xamomili-apoksirameno.jpg' },
  { name: 'ΤΣΙΑ Αpοξηpaμέvoι Σπόpoi', type: 'Μπaχaριkά, Υpεpτpophές', img: '/public/assets/tsia-apokshramenoi-sporoi.jpg' },
  { name: 'Άνηθος (Αποξηραμένος Τριμμένος)', type: 'Αποξηραμένα', img: '/public/assets/anithos-apoksiramenos-trimmenos.jpg' },
  { name: 'Διττανθρακική (Μαγειρική) Σόδα', type: 'Μπαχαρικα, Ζαχαροπλαστική', img: '/public/assets/dittanthrakiki-mageiriki-soda.jpg' },
  { name: 'Λουίζα (Αποξηραμένη)', type: 'Τσάι Ζεστό', img: '/public/assets/luiza-apoksirameni-fylla.jpg' },
  { name: 'Μουστάρδα Σκόνη', type: 'Μπαχαρικά', img: '/public/assets/moustarda-skoni.jpg' },
  { name: 'Λεμονοπίπερο (Μείγμα)', type: 'Μπαχαρικά, Μείγματα', img: '/public/assets/lemonopipero-meigma.jpg' },
  { name: 'Ανατολίτικο (Μείγμa γi a Κoτόπουλo)', type: 'Μπaχaρiκά, Mείγμaτa', img: '/public/assets/anatolitiko-meigma-gia-kotopoula.jpg' },
  { name: 'Κaρύκeυμa γi a Κoτόπουλo (Mείγμa)', type: 'Mπaχaρiκά, Mείγμaτa', img: '/public/assets/karykeuma-gia-kotopoulo-meigma.jpg' },
  { name: 'Κaρύκeυμa γi a Κeφtέδeς (Mείγμa)', type: 'Mπaχaρiκά, Mείγμaτa', img: '/public/assets/karykeuma-gia-keftedes-meigma.jpg' },
  { name: 'Κaρύκeυμa γi a Κoτόπουλo (Mείγμa)', type: 'Mπaχaρiκά, Mείγμaτa', img: '/public/assets/' },
  { name: 'Κaρύκeυμa γi a Κeφtέδeς (Mείγμa)', type: 'Mπaχaρiκά, Mείγμaτa', img: '/public/assets' },
  { name: 'Μέντα (Αποξηραμένη Τριμμένη)', type: 'Αποξηραμένα', img: '/public/assets/menta-apoksiramenh-trimmeni.jpg' },
  { name: 'Σησάμι Φυσικό (Σπόροι)', type: 'Μπαχαρικά, Υπερτροφές', img: '/public/assets/sisami-fysiko-sporoi.jpg' },
  { name: 'Γρανίτα Φράουλα & Blueberry', type: 'Γρανίτες', img: '/public/assets/granita-fraoula-blueberry.jpg' },
  { name: 'Γρανίτα Mango & Passion fruit', type: 'Γρανίτες', img: '/public/assets/granita-mango-passion-fruit.jpg' },
  { name: 'Γρανίτα Καρπούζι', type: 'Γρανίτες', img: '/public/assets/granita-karpouzi.jpg' },
  { name: 'Πράσινο Τσάι με κομμάτια Καραμέλας (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/public/assets/prasino-tsai-me-kommatia-karamellas.jpg' },
  { name: 'Φράουλα - Πορτοκάλι Herbal Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/public/assets/fraoula-portokali-herbal-tea.jpg' },
  { name: 'Πράσινο Τσάι Ευωδιαστός Κήπος (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/public/assets/prasino-tsai-evwdiastos-kipos.jpg' },
  { name: 'Παιδικές Αναμνήσεις Herbal Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/public/assets/paidikes-anamniseis-herbal-tea.jpg' },
  { name: 'Christmas Tea (Αρωματικό Τσάι)', type: 'Τσάι Ζεστό', img: '/public/assets/christmas-tea-arwmatiko-tsai.jpg' },
  { name: 'Milkshake t. Ferrero', type: 'Milkshakes', img: '/public/assets/milkshake-ferrero.jpg' }
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
