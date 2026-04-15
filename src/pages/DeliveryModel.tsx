import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { deliveryPrinciples } from "../data/site";

export function DeliveryModel() {
  return (
    <>
      <PageHero
        eyebrow="Delivery Model"
        title="A company-based delivery model built for continuity and structured support."
        intro="ExoSpace is designed to support technical organizations as a complementary engineering partner, with accountable delivery, scalable support and a practical subcontractor mindset."
      />

      <section className="bg-carbon-950">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Not isolated staffing. Structured support around the work.
            </h2>
            <p className="mt-6 text-base leading-7 text-steel-300">
              ExoSpace is positioned for situations where a customer, prime or
              programme needs more than an individual profile. The aim is to
              provide accountable engineering support with continuity, internal
              coordination and a delivery logic that can adapt to the maturity
              of the work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {deliveryPrinciples.map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-6 shadow-line"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-steel-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-3">
          <div>
            <h3 className="text-2xl font-semibold">Where it fits best</h3>
          </div>
          <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
            <div className="border-t border-carbon-950/15 pt-5">
              <h4 className="text-lg font-semibold">Ongoing activities</h4>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Useful when a team needs senior support quickly without building
                a fragile dependency on a single individual.
              </p>
            </div>
            <div className="border-t border-carbon-950/15 pt-5">
              <h4 className="text-lg font-semibold">
                Procurements and tenders
              </h4>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Useful when a prime or partner needs a credible complementary
                engineering company for future opportunities.
              </p>
            </div>
            <div className="border-t border-carbon-950/15 pt-5">
              <h4 className="text-lg font-semibold">Defined work packages</h4>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Useful when scope, interfaces, responsibilities and acceptance
                logic are clear enough for work package delivery.
              </p>
            </div>
            <div className="border-t border-carbon-950/15 pt-5">
              <h4 className="text-lg font-semibold">Transition periods</h4>
              <p className="mt-3 text-base leading-7 text-carbon-800">
                Useful when programmes need continuity during reviews, readiness
                phases, migrations or technical restructuring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss the most suitable support model."
        body="A short discussion can clarify whether the best fit is capacity-based support, defined work package delivery, a targeted study or a short-term reinforcement model."
      />
    </>
  );
}
