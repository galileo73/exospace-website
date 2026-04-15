import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { trainingTopics } from "../data/site";

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

      <CTASection
        title="Discuss a training need or knowledge transfer gap."
        body="Training can be shaped around a technical topic, a programme milestone, a new team context or an operational readiness need."
      />
    </>
  );
}
