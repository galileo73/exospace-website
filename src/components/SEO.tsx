import { useEffect } from "react";
import { company, type SeoEntry } from "../data/site";

type SEOProps = {
  entry: SeoEntry;
};

function setMeta(
  selector: string,
  attribute: "content" | "href",
  value: string,
) {
  const element = document.head.querySelector<
    HTMLMetaElement | HTMLLinkElement
  >(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

function ensureMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function ensureLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function SEO({ entry }: SEOProps) {
  useEffect(() => {
    const canonical = new URL(entry.path, company.website).toString();
    const image = new URL("/og-exospace.png", company.website).toString();

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      url: company.website,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Prague",
        addressCountry: "CZ",
      },
      sameAs: [],
      description: company.tagline,
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: company.shortName,
      url: company.website,
      inLanguage: "en",
    };

    document.title = entry.title;
    ensureMeta("name", "description", entry.description);
    ensureMeta("property", "og:title", entry.title);
    ensureMeta("property", "og:description", entry.description);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:url", canonical);
    ensureMeta("property", "og:image", image);
    ensureMeta("property", "og:site_name", company.shortName);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", entry.title);
    ensureMeta("name", "twitter:description", entry.description);
    ensureMeta("name", "twitter:image", image);
    ensureLink("canonical", canonical);

    let script = document.getElementById(
      "structured-data",
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "structured-data";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify([organizationSchema, websiteSchema]);

    setMeta('meta[name="theme-color"]', "content", "#06080a");
  }, [entry]);

  return null;
}
