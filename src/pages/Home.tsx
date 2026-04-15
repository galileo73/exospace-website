import { CTASection } from "../components/CTASection";
import { company, differentiators, sectors, services } from "../data/site";
import { SiteLink } from "../components/SiteLink";

export function Home() {
  const featuredServices = services.slice(0, 6);
  const featuredSectors = sectors.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-carbon-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(38,120,196,0.22),transparent_36%),radial-gradient(circle_at_top_right,rgba(0,212,201,0.14),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pb-28 md:pt-28">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-signal-teal">
              Prague, Czech Republic
            </p>
            <h1 className="mt-6 max-w-6xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              Senior engineering support for space, mission-critical and digital
              technical programmes.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-steel-300 md:text-xl">
              {company.shortName} operates as a complementary engineering
              partner for organizations that need accountable technical support,
              continuity of delivery and a company-based model rather than
              isolated staffing.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <SiteLink
                href="/contact#inquiry-form"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-signal-teal px-6 text-base font-semibold text-carbon-950 transition hover:brightness-110"
              >
                Discuss a support need
              </SiteLink>
              <SiteLink
                href="/delivery-model"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-6 text-base font-semibold text-white transition hover:bg-white/[0.05]"
              >
                Explore the delivery model
              </SiteLink>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Positioning
              </p>
              <p className="mt-4 text-lg font-medium leading-8 text-white">
                A complementary engineering partner designed for demanding
                technical contexts.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Coverage
              </p>
              <p className="mt-4 text-lg font-medium leading-8 text-white">
                Systems engineering, validation, technical studies, security,
                training and digital solutions.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Delivery Logic
              </p>
              <p className="mt-4 text-lg font-medium leading-8 text-white">
                Company-based, scalable and suitable for ongoing work,
                procurements and future tenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-signal-blue">
              Why ExoSpace
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              A stronger fit when the work needs more than a generic resource.
            </h2>
          </div>

          <div className="grid gap-5">
            {differentiators.map((item) => (
              <div
                key={item}
                className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] px-5 py-5"
              >
                <p className="text-base leading-7 text-carbon-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-signal-teal">
              Capability Framework
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Practical engineering support across the programme lifecycle.
            </h2>
            <p className="mt-6 text-base leading-7 text-steel-300">
              ExoSpace combines engineering depth, technical assurance, training
              and digital support in a way that fits complex programme
              environments rather than isolated one-off tasks.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <article
                key={service.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 shadow-line"
              >
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-steel-300">
                  {service.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <SiteLink
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-signal-blue px-6 text-base font-semibold text-white transition hover:bg-signal-blue hover:text-carbon-950"
            >
              View all services and solutions
            </SiteLink>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-signal-blue">
                Where ExoSpace Fits
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                Support for technical organizations, infrastructure and
                demanding programme contexts.
              </h2>
              <p className="mt-6 text-base leading-7 text-carbon-800">
                The strongest fit is where technical delivery needs engineering
                judgement, continuity and structured support across interfaces,
                evidence, reviews and operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredSectors.map((sector) => (
                <article
                  key={sector.title}
                  className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] p-6"
                >
                  <h3 className="text-xl font-semibold">{sector.title}</h3>
                  <p className="mt-4 text-base leading-7 text-carbon-800">
                    {sector.support}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <SiteLink
              href="/sectors"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-carbon-950/15 px-6 text-base font-semibold text-carbon-950 transition hover:bg-carbon-950 hover:text-white"
            >
              Explore sectors and programme contexts
            </SiteLink>
          </div>
        </div>
      </section>

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Delivery Model
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Company-based and scalable
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                ExoSpace can support capacity-based delivery, complementary
                engineering reinforcement and defined work packages where scope
                and interfaces are mature enough.
              </p>
              <div className="mt-6">
                <SiteLink
                  href="/delivery-model"
                  className="text-sm font-semibold text-signal-teal hover:text-white"
                >
                  Learn more about the delivery model
                </SiteLink>
              </div>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Training
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Knowledge transfer that stays useful
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                Training can be delivered as a standalone course, embedded in a
                project context or used as continuous knowledge transfer for a
                team.
              </p>
              <div className="mt-6">
                <SiteLink
                  href="/training"
                  className="text-sm font-semibold text-signal-teal hover:text-white"
                >
                  Explore training support
                </SiteLink>
              </div>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Digital Solutions
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Web, integration and trusted workflows
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                ExoSpace also supports digital platforms, web engineering,
                integration and data-driven workflows for serious technical
                organizations.
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
        title="Discuss a current or future technical activity."
        body="A short conversation can quickly clarify whether the right fit is engineering reinforcement, validation support, a focused study, training, digital platform work or a broader delivery model discussion."
      />
    </>
  );
}
