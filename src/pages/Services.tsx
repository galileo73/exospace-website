import { CTASection } from '../components/CTASection'
import { PageHero } from '../components/PageHero'
import { services } from '../data/site'

export function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering and consulting support with a clear technical scope."
        intro="ExoSpace supports complex programmes through senior systems engineering, technical consulting, validation, studies, digital support and knowledge transfer."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6">
            {services.map((service) => (
              <article
                key={service.title}
                className="grid gap-8 rounded-md border border-white/10 bg-white/[0.03] p-6 transition duration-200 hover:border-signal-teal/50 hover:bg-white/[0.05] md:p-8 lg:grid-cols-[0.85fr_1.15fr]"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-steel-300">
                    {service.summary}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-signal-teal">
                    Where it helps
                  </p>
                  <p className="mt-3 text-sm leading-6 text-steel-300">{service.helps}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase text-steel-200">
                    Typical support scope
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {service.scope.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-md border border-white/10 bg-carbon-950/60 p-4 text-sm leading-6 text-steel-200"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a specific service mix?"
        body="Most engagements combine more than one capability. ExoSpace can help define the right support model around the work, the maturity of the programme and the decision timeline."
      />
    </>
  )
}
