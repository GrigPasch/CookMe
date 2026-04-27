import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ProductSection from '../components/ProductSection'
import AboutSection from '../components/AboutSection'
import StatsSection from '../components/StatsSection'
import ContactCTA from '../components/ContactCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProductSection />
      <AboutSection />
      <Marquee dark />
      <StatsSection />
      <ContactCTA />
    </main>
  )
}
