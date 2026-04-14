import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'

const principles = [
  'Selective engagements where senior technical judgement matters',
  'Managing-director-led delivery with clear accountability',
  'Practical support model for ongoing activities, tenders and future programmes',
  'European boutique profile based in Prague, Czech Republic',
]

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A boutique engineering company built for focused technical support."
        intro="ExoSpace Engineering & Consulting s.r.o. is a Prague-based company serving organizations that need senior engineering capacity, structured technical thinking and reliable support for demanding work."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Senior, discreet and practical by design.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-7 text-steel-300">
            <p>
              ExoSpace is not positioned as a broad management consultancy or a
              generic digital agency. It is a focused engineering and consulting
              company for technical organizations that need practical senior support.
            </p>
            <p>
              The company combines systems engineering, service engineering,
              validation, technical review, secure infrastructure awareness and
              knowledge transfer. Work can be shaped around defined scopes, capacity
              support or targeted studies where the interfaces and responsibilities
              are clear.
            </p>
            <p>
              The operating style is calm, accountable and direct: understand the
              technical problem, define the useful support model, deliver with
              discipline and keep communication readable for decision-makers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
            A lean company structure for high-value work.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle} className="border-t border-carbon-950/20 pt-5">
                <p className="text-lg leading-7">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a precise conversation."
        body="The best first step is a short discussion about the technical context, constraints and decision timeline."
      />
    </>
  )
}
