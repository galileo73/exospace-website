import { useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import { company, services } from "../data/site";

export function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent("ExoSpace inquiry");
    const body = encodeURIComponent(
      [
        `Name: ${formData.get("name") ?? ""}`,
        `Email: ${formData.get("email") ?? ""}`,
        `Organization: ${formData.get("organization") ?? ""}`,
        `Area of support: ${formData.get("service") ?? ""}`,
        "",
        `${formData.get("message") ?? ""}`,
      ].join("\n"),
    );

    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setStatus(
      `Thank you. If your email client did not open, please send the inquiry to ${company.email}.`,
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your current or future technical activity."
        intro="Share the programme context, service need and expected timing. ExoSpace will be glad to explore whether a focused engineering or consulting engagement can support you."
        primaryCta="Email ExoSpace"
        primaryHref={`mailto:${company.email}`}
      />

      <section id="inquiry-form" className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Inquiries welcome
            </h2>
            <p className="mt-5 text-base leading-7 text-carbon-800">
              ExoSpace is best suited for senior technical support, technical
              consulting, validation and reviews, studies, digital support for
              technical organizations and knowledge transfer.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-carbon-800">
              <p>
                <span className="font-semibold text-carbon-950">Email: </span>
                <a
                  className="underline decoration-carbon-950/30 underline-offset-4"
                  href={`mailto:${company.email}`}
                >
                  {company.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-carbon-950">Website: </span>
                <a
                  className="underline decoration-carbon-950/30 underline-offset-4"
                  href={company.website}
                >
                  {company.website}
                </a>
              </p>
              <p>
                <span className="font-semibold text-carbon-950">
                  Location:{" "}
                </span>
                {company.location}
              </p>
            </div>
          </aside>

          <form
            className="grid gap-5 rounded-md border border-carbon-950/[0.15] bg-carbon-950 p-6 text-white md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  className="min-h-12 rounded-md border border-white/[0.15] bg-white/5 px-4 text-base text-white outline-none transition focus:border-signal-teal"
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Work email
                <input
                  className="min-h-12 rounded-md border border-white/[0.15] bg-white/5 px-4 text-base text-white outline-none transition focus:border-signal-teal"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium">
              Organization
              <input
                className="min-h-12 rounded-md border border-white/[0.15] bg-white/5 px-4 text-base text-white outline-none transition focus:border-signal-teal"
                name="organization"
                autoComplete="organization"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Area of support
              <select
                className="min-h-12 rounded-md border border-white/[0.15] bg-carbon-900 px-4 text-base text-white outline-none transition focus:border-signal-teal"
                name="service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select one
                </option>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Message
              <textarea
                className="min-h-40 rounded-md border border-white/[0.15] bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-signal-teal"
                name="message"
                required
                placeholder="Briefly describe the technical context, timing and expected support."
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-signal-teal px-6 text-sm font-semibold text-carbon-950 transition hover:bg-steel-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Send inquiry
            </button>
            {status ? (
              <p className="rounded-md border border-signal-teal/40 bg-signal-teal/10 p-4 text-sm leading-6 text-steel-100">
                {status}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}
