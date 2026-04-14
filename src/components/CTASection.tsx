import { ButtonLink } from "./ButtonLink";

type CTASectionProps = {
  title?: string;
  body?: string;
  cta?: string;
};

export function CTASection({
  title = "Discuss a current or future technical activity.",
  body = "Share the context, maturity and constraints of the work. ExoSpace will help assess whether a focused engineering or consulting engagement is the right fit.",
  cta = "Contact Us",
}: CTASectionProps) {
  return (
    <section className="bg-white text-carbon-950">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 border-y border-carbon-950/[0.15] py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-7 text-carbon-800">{body}</p>
          </div>
          <ButtonLink href="/contact" className="w-fit" variant="primary">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
