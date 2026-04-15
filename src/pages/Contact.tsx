import { useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import { company } from "../data/site";

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      "form-name": "contact",
      "bot-field": String(formData.get("bot-field") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      inquiryType: String(formData.get("inquiryType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      setIsSubmitting(true);
      setStatus("");

      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeForm(payload),
      });

      form.reset();
      setStatus(
        "Thanks. Your message has been sent. ExoSpace will get back to you soon.",
      );
    } catch {
      setStatus(
        `There was a problem sending the form. Please email ${company.email} directly.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Tell us about your technical context and support need."
        intro="ExoSpace can discuss ongoing engineering support, partnership models, technical reviews, validation, training, digital platforms or a more focused technical study."
        primaryCta="Email ExoSpace"
        primaryHref={`mailto:${company.email}`}
      />

      <section id="inquiry-form" className="bg-white text-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              How to frame your inquiry
            </h2>
            <p className="mt-5 text-base leading-7 text-carbon-800">
              A short message is enough. The most useful inputs are the type of
              activity, the programme or organizational context, the expected
              timing and the kind of support being considered.
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

            <div className="mt-10 rounded-md border border-carbon-950/10 bg-carbon-950/[0.03] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-signal-blue">
                Typical inquiry topics
              </p>
              <div className="mt-4 grid gap-3 text-base leading-7 text-carbon-800">
                <p>Engineering reinforcement</p>
                <p>Delivery model or partnership discussion</p>
                <p>Technical reviews or validation support</p>
                <p>Training and knowledge transfer</p>
                <p>Digital platforms and web engineering</p>
                <p>Focused technical studies or assessments</p>
              </div>
            </div>
          </aside>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="grid gap-5 rounded-md border border-carbon-950/[0.15] bg-carbon-950 p-6 text-white md:p-8"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Do not fill this out if you are human:{" "}
                <input name="bot-field" />
              </label>
            </p>

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
              Inquiry type
              <select
                className="min-h-12 rounded-md border border-white/[0.15] bg-carbon-900 px-4 text-base text-white outline-none transition focus:border-signal-teal"
                name="inquiryType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Engineering reinforcement</option>
                <option>Delivery model / partnership discussion</option>
                <option>Technical reviews and validation</option>
                <option>Training and knowledge transfer</option>
                <option>Digital solutions and web engineering</option>
                <option>Technical study or expert assessment</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Message
              <textarea
                className="min-h-40 rounded-md border border-white/[0.15] bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-signal-teal"
                name="message"
                required
                placeholder="Briefly describe the context, timing and the kind of support you are looking for."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-signal-teal px-6 text-sm font-semibold text-carbon-950 transition hover:bg-steel-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send inquiry"}
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
