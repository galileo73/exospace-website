import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { trainingTopics } from "../data/site";
import { SiteLink } from "../components/SiteLink";

export function Training() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Training and knowledge transfer connected to real technical work."
        intro="ExoSpace provides training and knowledge transfer for organizations that need practical technical understanding, smoother handover and stronger alignment across engineering and programme teams."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {trainingTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 shadow-line"
              >
                <h2 className="text-xl font-semibold text-white">
                  {topic.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-steel-300">
                  {topic.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
            Possible delivery modes
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border-t border-carbon-950/15 pt-5">
              <h3 className="text-lg font-semibold">Standalone sessions</h3>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Focused training sessions built around a defined topic and
                target audience.
              </p>
            </div>
            <div className="border-t border-carbon-950/15 pt-5">
              <h3 className="text-lg font-semibold">
                Embedded project training
              </h3>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Knowledge transfer integrated into ongoing project activities,
                reviews or technical support tasks.
              </p>
            </div>
            <div className="border-t border-carbon-950/15 pt-5">
              <h3 className="text-lg font-semibold">
                Continuous knowledge transfer
              </h3>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Ongoing transfer model for organizations that need stronger
                internal continuity and technical understanding over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Related entry points
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <SiteLink
              href="/services"
              className="rounded-md border border-white/10 bg-white/[0.03] p-6 transition hover:border-signal-blue/40 hover:bg-white/[0.05]"
            >
              <span className="block text-xl font-semibold text-white">
                Services
              </span>
              <span className="mt-3 block text-base leading-7 text-steel-300">
                Explore broader engineering and assurance support.
              </span>
            </SiteLink>
            <SiteLink
              href="/delivery-model"
              className="rounded-md border border-white/10 bg-white/[0.03] p-6 transition hover:border-signal-blue/40 hover:bg-white/[0.05]"
            >
              <span className="block text-xl font-semibold text-white">
                Delivery Model
              </span>
              <span className="mt-3 block text-base leading-7 text-steel-300">
                See how training can fit a broader support model.
              </span>
            </SiteLink>
            <SiteLink
              href="/contact#inquiry-form"
              className="rounded-md border border-white/10 bg-white/[0.03] p-6 transition hover:border-signal-blue/40 hover:bg-white/[0.05]"
            >
              <span className="block text-xl font-semibold text-white">
                Contact
              </span>
              <span className="mt-3 block text-base leading-7 text-steel-300">
                Discuss a training or knowledge transfer need.
              </span>
            </SiteLink>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss a training need or knowledge transfer gap."
        body="Training can be shaped around a technical topic, a programme milestone, a new team context or an operational readiness need."
      />
    </>
  );
}
