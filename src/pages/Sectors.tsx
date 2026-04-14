import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { sectors } from '../data/site'

export function Sectors() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Focused support for space, secure infrastructure and technical organizations."
        intro="ExoSpace is positioned for environments where technical maturity, operational readiness, validation evidence and discreet senior support are important."
      />

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-8">
          {sectors.map((sector) => (
            <article
              key={sector.title}
              className="grid gap-6 border-t border-carbon-950/[0.15] pt-8 lg:grid-cols-[0.7fr_1.3fr]"
            >
              <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
                {sector.title}
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase text-carbon-800">
                    Typical needs
                  </h3>
                  <p className="mt-3 text-base leading-7 text-carbon-800">
                    {sector.needs}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase text-carbon-800">
                    ExoSpace support
                  </h3>
                  <p className="mt-3 text-base leading-7 text-carbon-800">
                    {sector.support}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Explore whether ExoSpace fits your programme context."
        body="A short discussion can clarify the sector context, the maturity of the work and the most useful form of senior support."
      />
    </>
  )
}
