import { Helmet } from 'react-helmet-async'
import { PageShell } from '../components/layout/PageShell'
import { Hero } from '../components/sections/Hero'
import { Benefits } from '../components/sections/Benefits'
import { FeaturedProducts } from '../components/sections/FeaturedProducts'
import { Philosophy } from '../components/sections/Philosophy'
import { Process } from '../components/sections/Process'
import { Testimonials } from '../components/sections/Testimonials'
import { Newsletter } from '../components/sections/Newsletter'

export default function HomePage() {
  return (
    <PageShell fullBleed>
      <Helmet>
        <title>PURALUXE — The era of major oils | Rare Elixir</title>
        <meta
          name="description"
          content="Premium botanical cosmetics. Cold-extracted Rare Elixir serums. cosmetic bio."
        />
      </Helmet>
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Philosophy />
      <Process />
      <Testimonials />
      <Newsletter />
    </PageShell>
  )
}
