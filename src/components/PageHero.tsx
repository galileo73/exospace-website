import { ButtonLink } from "./ButtonLink";
import { SpaceBackdrop } from "./SpaceBackdrop";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta?: string;
  primaryHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  primaryCta = "Contact Us",
  primaryHref = "/contact",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-carbon-900">
      <SpaceBackdrop density={190} className="opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,13,0.8)_0%,rgba(7,16,24,0.56)_54%,rgba(3,7,13,0.3)_100%)]" />
      <div className="absolute inset-0 bg-technical-grid bg-[size:48px_48px] opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:px-8 lg:grid-cols-[1fr_18rem] lg:items-end lg:py-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase text-signal-teal">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel-200">
            {intro}
          </p>
          <div className="mt-9">
            <ButtonLink href={primaryHref}>{primaryCta}</ButtonLink>
          </div>
        </div>
        <div className="hidden rounded-md border border-white/10 bg-[linear-gradient(180deg,rgba(3,7,13,0.72),rgba(7,16,24,0.58))] p-5 text-sm leading-6 text-steel-300 shadow-line backdrop-blur-md lg:block">
          <p className="font-semibold uppercase text-steel-100">
            ExoSpace profile
          </p>
          <p className="mt-4">
            Focused, senior and selective support for engineering teams,
            programme managers and technical decision-makers.
          </p>
        </div>
      </div>
    </section>
  );
}
