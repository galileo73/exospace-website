import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { sectors } from "../data/site";
import { SiteLink } from "../components/SiteLink";

export function Sectors() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Support for space, secure infrastructure and demanding technical organizations."
        intro="ExoSpace is positioned for organizations operating in complex technical environments where engineering continuity, structured delivery and senior judgement are important."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Sector coverage built around real programme contexts.
            </h2>
            <p className="mt-6 text-base leading-7 text-steel-300">
              ExoSpace supports organizations where technical delivery depends
              on requirements, architecture, validation, operational readiness,
              risk awareness and structured coordination across stakeholders.
            </p>
          </div>

          <div className="mt-14 grid gap-8">
            {sectors.map((sector) => (
              <article
                key={sector.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <div className="grid gap-8 xl:grid-cols-[0.5fr_0.75fr_0.75fr]">
                  <div>
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">
                      {sector.title}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                      Typical context
                    </p>
                    <p className="mt-4 text-base leading-7 text-steel-300">
                      {sector.needs}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                      How ExoSpace can support
                    </p>
                    <p className="mt-4 text-base leading-7 text-steel-300">
                      {sector.support}
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
              A good fit where technical work must stay structured.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-7 text-carbon-800">
            <p>
              ExoSpace is especially relevant where delivery cannot rely on a
              generic profile alone and where technical work must remain aligned
              with lifecycle logic, review expectations, operational realities
              and programme constraints.
            </p>
            <p>
              This includes system engineering support, technical reviews,
              validation planning, security-oriented assessments, operational
              transition support, training and technical digital enablement.
            </p>
            <p>
              The strongest fit is usually a context where there is a real
              technical need, a demanding environment and a benefit in using a
              structured complementary partner.
            </p>

            <div className="pt-4">
              <SiteLink
                href="/delivery-model"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-carbon-950/15 px-6 text-base font-semibold text-carbon-950 transition hover:bg-carbon-950 hover:text-white"
              >
                Explore the delivery model
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss the sector context you are working in."
        body="A short discussion can help determine whether the right support is systems engineering, validation, technical reviews, operational readiness, training, digital support or a blended model."
      />
    </>
  );
}
