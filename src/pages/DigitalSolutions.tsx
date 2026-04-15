import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { digitalCapabilities } from "../data/site";

export function DigitalSolutions() {
  return (
    <>
      <PageHero
        eyebrow="Digital Solutions"
        title="Digital platforms and web engineering for serious technical organizations."
        intro="ExoSpace supports digital platforms, web engineering and integration work where technical credibility, maintainability and operational fit matter as much as visual design."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {digitalCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 shadow-line"
              >
                <h2 className="text-xl font-semibold text-white">
                  {capability.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-steel-300">
                  {capability.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Digital work that fits a technical context.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-7 text-carbon-800">
            <p>
              ExoSpace does not approach digital delivery as a generic agency
              exercise. The focus is on usable, structured and maintainable
              platforms that support technical workflows, operational clarity
              and long-term evolution.
            </p>
            <p>
              This can include customer-facing platforms, internal business
              applications, workflow support, API integration, data-oriented
              tools and traceability-oriented digital environments.
            </p>
            <p>
              The strongest fit is where digital work must connect to a serious
              engineering, programme or mission-critical context.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss a digital platform or technical web need."
        body="A short discussion can clarify whether the right support is web engineering, platform design, integration support, digital modernization or a more focused technical digital task."
      />
    </>
  );
}
