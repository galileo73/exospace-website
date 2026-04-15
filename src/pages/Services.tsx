import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { services } from "../data/site";
import { SiteLink } from "../components/SiteLink";

export function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services & Solutions"
        title="Engineering support with a clear technical scope."
        intro="ExoSpace supports complex technical programmes through senior systems engineering, technical consulting, validation, studies, operational support, training and digital solutions."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              A capability framework shaped around real technical needs.
            </h2>
            <p className="mt-6 text-base leading-7 text-steel-300">
              The service structure is designed for organizations that need
              credible support across architecture, validation, reviews,
              operational readiness, risk-aware delivery, training and digital
              enablement. The goal is not generic staffing, but support to
              specific technical outcomes with continuity and judgement.
            </p>
          </div>

          <div className="mt-14 grid gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <div className="grid gap-8 xl:grid-cols-[0.7fr_0.75fr_0.55fr]">
                  <div>
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-steel-300">
                      {service.summary}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                      Typical scope
                    </p>
                    <ul className="mt-4 grid gap-3 text-base leading-7 text-steel-200">
                      {service.scope.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-signal-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                      Best used when
                    </p>
                    <p className="mt-4 text-base leading-7 text-steel-300">
                      {service.helps}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              How services are typically combined
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] p-6">
              <h3 className="text-xl font-semibold">Engineering + reviews</h3>
              <p className="mt-4 text-base leading-7 text-carbon-800">
                Useful when architecture, requirements and milestone reviews
                need stronger coordination and technical depth.
              </p>
            </article>
            <article className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] p-6">
              <h3 className="text-xl font-semibold">Validation + readiness</h3>
              <p className="mt-4 text-base leading-7 text-carbon-800">
                Useful when evidence, testing, readiness logic and operational
                transition need structured follow-up.
              </p>
            </article>
            <article className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] p-6">
              <h3 className="text-xl font-semibold">
                Training + digital support
              </h3>
              <p className="mt-4 text-base leading-7 text-carbon-800">
                Useful when organizations need internal continuity, knowledge
                transfer and practical technical platforms.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-3">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Closely related support areas
            </h2>
          </div>

          <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Training and knowledge transfer
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                For teams that need practical technical understanding, smoother
                handover and stronger continuity across engineering activities.
              </p>
              <div className="mt-6">
                <SiteLink
                  href="/training"
                  className="text-sm font-semibold text-signal-teal hover:text-white"
                >
                  Explore training
                </SiteLink>
              </div>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Digital platforms and web engineering
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                For organizations that need modern digital tools, integration
                and maintainable technical platforms connected to real
                operations.
              </p>
              <div className="mt-6">
                <SiteLink
                  href="/digital-solutions"
                  className="text-sm font-semibold text-signal-teal hover:text-white"
                >
                  Explore digital solutions
                </SiteLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss which service combination fits your current need."
        body="A support need often spans more than one capability. The right structure may combine systems engineering, reviews, validation, security, training or digital support depending on maturity and timing."
      />
    </>
  );
}
