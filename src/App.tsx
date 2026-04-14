import { NavigationProvider } from "./components/NavigationProvider";
import { useEffect, useMemo, useState } from "react";
import { SEO } from "./components/SEO";
import { seo } from "./data/site";
import { SiteLayout } from "./layouts/SiteLayout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Sectors } from "./pages/Sectors";
import { Services } from "./pages/Services";
import { getPathname } from "./utils/path";

const pages = {
  "/": { component: <Home />, seo: seo.home },
  "/services": { component: <Services />, seo: seo.services },
  "/sectors": { component: <Sectors />, seo: seo.sectors },
  "/about": { component: <About />, seo: seo.about },
  "/contact": { component: <Contact />, seo: seo.contact },
};

type PagePath = keyof typeof pages;

function resolvePath(pathname: string): PagePath {
  const normalized = getPathname(pathname);
  return normalized in pages ? (normalized as PagePath) : "/";
}

function App() {
  const [currentPath, setCurrentPath] = useState<PagePath>(() =>
    resolvePath(window.location.pathname),
  );

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(resolvePath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useMemo(
    () => (href: string) => {
      const url = new URL(href, window.location.origin);
      const nextPath = resolvePath(url.pathname);
      const nextHref = `${nextPath}${url.hash}`;
      const currentHref = `${currentPath}${window.location.hash}`;

      if (nextHref !== currentHref) {
        window.history.pushState({}, "", nextHref);
        setCurrentPath(nextPath);

        window.requestAnimationFrame(() => {
          if (url.hash) {
            const target = document.querySelector<HTMLElement>(url.hash);

            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              return;
            }
          }

          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    },
    [currentPath],
  );

  const page = pages[currentPath];

  return (
    <NavigationProvider navigate={navigate}>
      <SEO entry={page.seo} />
      <SiteLayout currentPath={currentPath}>{page.component}</SiteLayout>
    </NavigationProvider>
  );
}

export default App;
