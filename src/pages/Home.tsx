import { ButtonLink } from "../components/ButtonLink";
import { CTASection } from "../components/CTASection";
import { SectionHeader } from "../components/SectionHeader";
import { SpaceBackdrop } from "../components/SpaceBackdrop";
import { SiteLink } from "../components/SiteLink";
import { company, differentiators, sectors, services } from "../data/site";

const heroSignals = [
  "Systems engineering",
  "Validation and reviews",
  "Technical studies",
  "Digital support",
];

const heroHighlights = [
  "Requirements, architecture and interface control",
  "Verification, validation and operational readiness",
  "Independent technical reviews and expert assessments",
];

export function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-carbon-950">
        <div className="relative min-h-[calc(100svh-82px)]">
          <SpaceBackdrop density={170} className="opacity-100" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,13,0.58)_0%,rgba(5,11,19,0.24)_48%,rgba(3,7,13,0.10)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(57,216,208,0.10),transparent_22%),radial-gradient(circle_at_22%_16%,rgba(243,199,117,0.06),transparent_16%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-carbon-950 via-carbon-950/42 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1fr_21rem] lg:items-center lg:py-16 xl:py-20">
            <div className="max-w-4xl">
              <div className="mb-5 flex w-fit items-center gap-3 rounded-md border border-white/[0.15] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase text-steel-200 shadow-line backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-signal-blue shadow-[0_0_18px_rgba(105,169,221,0.7)]" />
                Prague-based engineering consultancy
              </div>

              <h1 className="text-4xl font-semibold leading-[1.03] text-white md:text-6xl xl:text-7xl">
                Senior engineering support for complex technical programmes.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-steel-200 md:text-xl">
                {company.shortName} supports demanding engineering work from
                requirements and architecture to validation, technical reviews,
                studies and focused digital support for technical organizations.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">
                  Request an introductory discussion
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  View services
                </ButtonLink>
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/[0.14] pt-5 text-sm text-steel-300 md:grid-cols-3">
                {heroHighlights.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-md border border-white/[0.15] bg-[linear-gradient(180deg,rgba(3,7,13,0.72),rgba(7,16,24,0.62))] p-5 shadow-glow backdrop-blur-md">
              <p className="text-sm font-semibold uppercase text-signal-teal">
                Focus areas
              </p>
              <div className="mt-5 grid gap-3">
                {heroSignals.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-sm text-steel-200"
                  >
                    <span>{item}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-signal-blue" />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-steel-400">
                Built for selective, high-value support across tenders, reviews,
                delivery phases and technical decision points.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-carbon-800">
              Credibility
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              A focused technical partner for high-value engineering work.
            </h2>
          </div>
          <div className="grid gap-6 text-base leading-7 text-carbon-800 md:grid-cols-3">
            <p>
              ExoSpace provides senior engineering and consulting support for
              space, mission-critical and technical programmes.
            </p>
            <p>
              It helps programme managers, engineering directors and specialist
              teams move through complex technical decisions with clearer
              evidence.
            </p>
            <p>
              Engagements can support ongoing activities, procurements, tenders,
              technical studies, validation work and knowledge transfer.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-carbon-900">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-teal/[0.45] to-transparent" />
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeader
            eyebrow="Core services"
            title="Six practical pillars for demanding technical work."
            intro="The offer is selective by design: senior support where technical clarity, review maturity and delivery discipline matter."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <SiteLink
                key={service.title}
                href="/services"
                className="group rounded-md border border-white/10 bg-white/[0.03] p-6 transition duration-200 hover:-translate-y-1 hover:border-signal-teal/60 hover:bg-white/[0.06] hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
              >
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-steel-300">
                  {service.summary}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-signal-teal">
                  Read service scope
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-carbon-950">
        <div className="absolute inset-0 bg-technical-grid bg-[size:54px_54px] opacity-[0.08]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Why ExoSpace"
            title="Boutique attention, senior technical delivery."
            intro="ExoSpace is designed for organizations that need clear technical support without the overhead of a large consultancy or the looseness of a generic contractor."
          />
          <div className="grid gap-4">
            {differentiators.map((item, index) => (
              <div
                key={item}
                className="grid gap-4 rounded-md border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:grid-cols-[4rem_1fr]"
              >
                <span className="text-sm font-semibold text-signal-teal">
                  0{index + 1}
                </span>
                <p className="text-lg leading-7 text-steel-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeader
            eyebrow="Sectors"
            title="Support for technical organizations and programme environments."
            intro="ExoSpace is most relevant where engineering judgement, structured validation and clear communication need to travel together."
            tone="dark"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div
                key={sector.title}
                className="border-t border-carbon-950/20 pt-5"
              >
                <h3 className="text-xl font-semibold">{sector.title}</h3>
                <p className="mt-4 text-sm leading-6 text-carbon-800">
                  {sector.support}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/sectors">Explore sectors</ButtonLink>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
