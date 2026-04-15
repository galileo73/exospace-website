import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { company, differentiators } from "../data/site";
import { SiteLink } from "../components/SiteLink";

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A Prague-based boutique engineering and consulting company."
        intro="ExoSpace is built to support complex technical programmes with senior engineering capability, structured delivery and a partner-oriented operating model."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Positioning
            </h2>
          </div>

          <div className="space-y-6 text-base leading-7 text-steel-300">
            <p>
              {company.shortName} is positioned as a complementary engineering
              partner for organizations that need credible technical support
              without depending on an isolated staffing logic.
            </p>
            <p>
              The focus is on senior engineering and consulting activities
              across system and service engineering, validation and assurance,
              technical studies, security-oriented support, training and digital
              enablement.
            </p>
            <p>
              The company model is intended to support ongoing activities,
              procurements, future tenders and demanding technical contexts
              where continuity, accountability and structured integration
              matter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              What makes ExoSpace different
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item) => (
              <article
                key={item}
                className="rounded-md border border-carbon-950/10 bg-carbon-950/[0.02] p-6"
              >
                <p className="text-base leading-7 text-carbon-900">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-3">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              How ExoSpace works
            </h2>
          </div>

          <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Complementary partner logic
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                ExoSpace is designed to complement customer and prime teams,
                adding focused technical depth, reinforcement and continuity
                where needed.
              </p>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Senior capability with practical scope
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                The focus is not generic volume staffing. It is targeted support
                for engineering, reviews, validation, studies, security,
                training and digital solutions.
              </p>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Structured delivery
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                Support can be shaped around capacity-based delivery, defined
                work packages or focused technical studies depending on the
                maturity of the task.
              </p>
            </article>

            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">
                Technical and programme awareness
              </h3>
              <p className="mt-4 text-base leading-7 text-steel-300">
                ExoSpace works best in environments where engineering decisions
                must stay aligned with reviews, interfaces, governance, risk and
                operational realities.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                A partner-oriented company profile.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-7 text-carbon-800">
              <p>
                ExoSpace is especially relevant for organizations that need a
                serious technical counterpart able to integrate quickly, support
                work with low administrative friction and contribute in a way
                that remains aligned with programme logic.
              </p>
              <p>
                This includes support to engineering activities, review
                preparation, validation logic, delivery structure, training and
                digital enablement where needed.
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <SiteLink
                  href="/delivery-model"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-carbon-950/15 px-6 text-base font-semibold text-carbon-950 transition hover:bg-carbon-950 hover:text-white"
                >
                  Explore the delivery model
                </SiteLink>
                <SiteLink
                  href="/contact#inquiry-form"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-carbon-950 px-6 text-base font-semibold text-white transition hover:opacity-90"
                >
                  Contact ExoSpace
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss whether ExoSpace is the right complementary partner."
        body="A short conversation can quickly show whether the right fit is technical reinforcement, a structured delivery model, a focused study, training support or digital platform work."
      />
    </>
  );
}
