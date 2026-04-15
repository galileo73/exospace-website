import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { company, navigation, sectors, services } from "../data/site";
import { CookieBanner } from "../components/CookieBanner";
import { SiteLink } from "../components/SiteLink";
import { useNavigation } from "../utils/navigation-context";
import exospaceWordmark from "../assets/exospace-wordmark.png";

type SiteLayoutProps = {
  children: ReactNode;
  currentPath: string;
};

type PanelKey = "services" | "sectors" | null;

type SearchEntry = {
  title: string;
  meta: string;
  href: string;
};

function chunkItems<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteLayout({ children, currentPath }: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigation();
  const closeTimerRef = useRef<number | null>(null);

  const serviceColumns = useMemo(() => chunkItems(services, 3), []);
  const sectorColumns = useMemo(() => chunkItems(sectors, 2), []);

  const searchEntries = useMemo<SearchEntry[]>(
    () => [
      { title: "Services & Solutions", meta: "Main page", href: "/services" },
      { title: "Sectors", meta: "Main page", href: "/sectors" },
      { title: "Delivery Model", meta: "Main page", href: "/delivery-model" },
      { title: "Training", meta: "Main page", href: "/training" },
      {
        title: "Digital Solutions",
        meta: "Main page",
        href: "/digital-solutions",
      },
      { title: "About Us", meta: "Company profile", href: "/about" },
      {
        title: "Contact Us",
        meta: "Get in touch",
        href: "/contact#inquiry-form",
      },
      ...services.map((service) => ({
        title: service.title,
        meta: "Service",
        href:
          service.title === "Training and Knowledge Transfer"
            ? "/training"
            : service.title === "Digital Platforms and Web Engineering"
              ? "/digital-solutions"
              : "/services",
      })),
      ...sectors.map((sector) => ({
        title: sector.title,
        meta: "Sector",
        href: "/sectors",
      })),
    ],
    [],
  );

  const filteredSearchEntries = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return searchEntries.slice(0, 8);
    }

    return searchEntries
      .filter(
        (entry) =>
          entry.title.toLowerCase().includes(normalized) ||
          entry.meta.toLowerCase().includes(normalized),
      )
      .slice(0, 10);
  }, [searchEntries, searchTerm]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function closeMenu() {
    setMenuOpen(false);
    setActivePanel(null);
    clearCloseTimer();
  }

  function openSearch() {
    setSearchOpen(true);
    setSearchTerm("");
    setActivePanel(null);
    clearCloseTimer();
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchTerm("");
  }

  function handleSearchNavigate(href: string) {
    setActivePanel(null);
    setMenuOpen(false);
    closeSearch();
    clearCloseTimer();
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPanel(panel: Exclude<PanelKey, null>) {
    clearCloseTimer();
    setActivePanel(panel);
  }

  function scheduleClosePanel() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActivePanel(null);
      closeTimerRef.current = null;
    }, 220);
  }

  function renderMegaPanel(panel: PanelKey) {
    if (panel === "services") {
      return (
        <div
          className="absolute inset-x-0 top-full z-50 border-t border-signal-blue/[0.22] bg-[linear-gradient(180deg,rgba(4,10,18,0.985),rgba(3,7,13,0.995))] text-steel-100 shadow-[0_30px_90px_rgba(2,6,14,0.42)]"
          onMouseEnter={() => openPanel("services")}
          onMouseLeave={scheduleClosePanel}
        >
          <div className="mx-auto w-full max-w-[1480px] px-5 md:px-8">
            <div className="grid gap-10 py-10 xl:grid-cols-[360px_1fr]">
              <div className="border-r border-signal-blue/[0.2] pr-10">
                <p className="text-[18px] font-semibold text-white">
                  Services & Solutions
                </p>
                <p className="mt-8 max-w-[260px] text-[17px] leading-8 text-steel-300">
                  Engineering support, technical assurance, training and digital
                  capabilities for complex programme environments.
                </p>
                <div className="mt-10 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleSearchNavigate("/services")}
                    className="inline-flex min-h-12 items-center justify-center rounded-md border border-signal-blue px-6 text-[16px] font-semibold text-white transition hover:bg-signal-blue hover:text-carbon-950"
                  >
                    View all services
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSearchNavigate("/delivery-model")}
                    className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-6 text-[16px] font-semibold text-white transition hover:bg-white/[0.05]"
                  >
                    Delivery model
                  </button>
                </div>
              </div>

              <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Engineering and Assurance
                  </p>
                  <div className="mt-6 grid gap-5">
                    {(serviceColumns[0] ?? []).map((service) => (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => handleSearchNavigate("/services")}
                        className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Operations and Security
                  </p>
                  <div className="mt-6 grid gap-5">
                    {(serviceColumns[1] ?? []).map((service) => (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => handleSearchNavigate("/services")}
                        className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Training and Digital
                  </p>
                  <div className="mt-6 grid gap-5">
                    {(serviceColumns[2] ?? []).map((service) => {
                      const href =
                        service.title === "Training and Knowledge Transfer"
                          ? "/training"
                          : service.title ===
                              "Digital Platforms and Web Engineering"
                            ? "/digital-solutions"
                            : "/services";

                      return (
                        <button
                          key={service.title}
                          type="button"
                          onClick={() => handleSearchNavigate(href)}
                          className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                        >
                          {service.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (panel === "sectors") {
      return (
        <div
          className="absolute inset-x-0 top-full z-50 border-t border-signal-blue/[0.22] bg-[linear-gradient(180deg,rgba(4,10,18,0.985),rgba(3,7,13,0.995))] text-steel-100 shadow-[0_30px_90px_rgba(2,6,14,0.42)]"
          onMouseEnter={() => openPanel("sectors")}
          onMouseLeave={scheduleClosePanel}
        >
          <div className="mx-auto w-full max-w-[1480px] px-5 md:px-8">
            <div className="grid gap-10 py-10 xl:grid-cols-[360px_1fr]">
              <div className="border-r border-signal-blue/[0.2] pr-10">
                <p className="text-[18px] font-semibold text-white">Sectors</p>
                <p className="mt-8 max-w-[260px] text-[17px] leading-8 text-steel-300">
                  Explore the kinds of technical environments where ExoSpace can
                  integrate as a complementary engineering partner.
                </p>
                <button
                  type="button"
                  onClick={() => handleSearchNavigate("/sectors")}
                  className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md border border-signal-blue px-6 text-[16px] font-semibold text-white transition hover:bg-signal-blue hover:text-carbon-950"
                >
                  View all sectors
                </button>
              </div>

              <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Space and Infrastructure
                  </p>
                  <div className="mt-6 grid gap-5">
                    {(sectorColumns[0] ?? []).map((sector) => (
                      <button
                        key={sector.title}
                        type="button"
                        onClick={() => handleSearchNavigate("/sectors")}
                        className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                      >
                        {sector.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Technical Organizations
                  </p>
                  <div className="mt-6 grid gap-5">
                    {(sectorColumns[1] ?? []).map((sector) => (
                      <button
                        key={sector.title}
                        type="button"
                        onClick={() => handleSearchNavigate("/sectors")}
                        className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                      >
                        {sector.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[17px] font-semibold text-signal-blue">
                    Related entry points
                  </p>
                  <div className="mt-6 grid gap-5">
                    <button
                      type="button"
                      onClick={() => handleSearchNavigate("/services")}
                      className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                    >
                      Services & Solutions
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSearchNavigate("/delivery-model")}
                      className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                    >
                      Delivery Model
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSearchNavigate("/contact#inquiry-form")
                      }
                      className="text-left text-[17px] leading-8 text-white transition hover:text-signal-blue"
                    >
                      Contact ExoSpace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="min-h-screen bg-carbon-950 text-steel-100">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-carbon-950"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-carbon-950/[0.08] bg-[linear-gradient(180deg,rgba(242,246,250,0.96),rgba(224,232,240,0.94))] shadow-[0_8px_30px_rgba(20,32,43,0.08)] backdrop-blur-xl">
        <div className="relative">
          <nav
            className="mx-auto flex h-[82px] w-full max-w-[1480px] items-center justify-between px-5 md:px-8"
            aria-label="Main navigation"
          >
            <SiteLink
              href="/"
              className="group flex items-center focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue"
              onClick={closeMenu}
              aria-label="ExoSpace home"
            >
              <img
                src={exospaceWordmark}
                alt="ExoSpace Engineering & Consulting"
                className="h-auto w-[210px] max-w-full md:w-[235px] lg:w-[260px]"
              />
            </SiteLink>

            <div className="hidden items-center justify-end gap-9 lg:flex lg:flex-1">
              <div
                className="relative"
                onMouseEnter={() => openPanel("services")}
                onMouseLeave={scheduleClosePanel}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 text-[15px] font-medium leading-none tracking-normal transition hover:text-signal-blue focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue ${
                    currentPath === "/services" ||
                    currentPath === "/training" ||
                    currentPath === "/digital-solutions" ||
                    activePanel === "services"
                      ? "text-signal-blue"
                      : "text-carbon-900"
                  }`}
                  onClick={() =>
                    setActivePanel((current) =>
                      current === "services" ? null : "services",
                    )
                  }
                  aria-expanded={activePanel === "services"}
                  aria-haspopup="true"
                >
                  <span>Services & Solutions</span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-signal-blue"
                  />
                </button>
              </div>

              <div
                className="relative"
                onMouseEnter={() => openPanel("sectors")}
                onMouseLeave={scheduleClosePanel}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 text-[15px] font-medium leading-none tracking-normal transition hover:text-signal-blue focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue ${
                    currentPath === "/sectors" || activePanel === "sectors"
                      ? "text-signal-blue"
                      : "text-carbon-900"
                  }`}
                  onClick={() =>
                    setActivePanel((current) =>
                      current === "sectors" ? null : "sectors",
                    )
                  }
                  aria-expanded={activePanel === "sectors"}
                  aria-haspopup="true"
                >
                  <span>Sectors</span>
                  <span
                    aria-hidden="true"
                    className="inline-block h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-signal-blue"
                  />
                </button>
              </div>

              {navigation
                .filter(
                  (item) =>
                    item.href !== "/services" && item.href !== "/sectors",
                )
                .map((item) => (
                  <SiteLink
                    key={item.href}
                    href={
                      item.href === "/contact"
                        ? "/contact#inquiry-form"
                        : item.href
                    }
                    className={`inline-flex items-center text-[15px] font-medium leading-none tracking-normal transition hover:text-signal-blue focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue ${
                      currentPath === item.href
                        ? "text-signal-blue"
                        : "text-carbon-900"
                    }`}
                  >
                    {item.label}
                  </SiteLink>
                ))}

              <button
                type="button"
                onClick={openSearch}
                aria-label="Open search"
                className="inline-flex items-center justify-center text-signal-blue transition hover:text-carbon-900 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue"
              >
                <SearchIcon />
              </button>
            </div>

            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-md border border-carbon-950/[0.12] bg-white/[0.5] px-4 text-sm font-semibold text-carbon-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-blue lg:hidden"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </nav>

          {activePanel ? (
            <div
              className="absolute inset-x-0 top-full z-40 h-3"
              onMouseEnter={() => openPanel(activePanel)}
              onMouseLeave={scheduleClosePanel}
            />
          ) : null}

          {renderMegaPanel(activePanel)}
        </div>

        {menuOpen ? (
          <div
            id="mobile-menu"
            className="border-t border-carbon-950/[0.08] bg-[linear-gradient(180deg,rgba(242,246,250,0.98),rgba(231,238,245,0.98))] lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 px-5 py-5 md:px-8">
              <SiteLink
                href="/services"
                onClick={closeMenu}
                className="rounded-md px-2 py-3 text-base font-medium text-carbon-900 hover:bg-carbon-950/[0.04] hover:text-signal-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-blue"
              >
                Services & Solutions
              </SiteLink>
              <SiteLink
                href="/training"
                onClick={closeMenu}
                className="rounded-md px-2 py-3 text-base font-medium text-carbon-900 hover:bg-carbon-950/[0.04] hover:text-signal-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-blue"
              >
                Training
              </SiteLink>
              <SiteLink
                href="/digital-solutions"
                onClick={closeMenu}
                className="rounded-md px-2 py-3 text-base font-medium text-carbon-900 hover:bg-carbon-950/[0.04] hover:text-signal-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-blue"
              >
                Digital Solutions
              </SiteLink>
              {navigation
                .filter((item) => item.href !== "/services")
                .map((item) => (
                  <SiteLink
                    key={item.href}
                    href={
                      item.href === "/contact"
                        ? "/contact#inquiry-form"
                        : item.href
                    }
                    onClick={closeMenu}
                    className="rounded-md px-2 py-3 text-base font-medium text-carbon-900 hover:bg-carbon-950/[0.04] hover:text-signal-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-blue"
                  >
                    {item.label}
                  </SiteLink>
                ))}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openSearch();
                }}
                className="inline-flex items-center gap-3 rounded-md px-2 py-3 text-base font-medium text-carbon-900 hover:bg-carbon-950/[0.04] hover:text-signal-blue"
              >
                <SearchIcon />
                <span>Search</span>
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main-content">{children}</main>
      <CookieBanner />

      {searchOpen ? (
        <div className="fixed inset-0 z-[60] bg-[rgba(28,34,42,0.48)] backdrop-blur-xl">
          <div
            className="absolute inset-0"
            onClick={closeSearch}
            aria-hidden="true"
          />
          <div className="relative mx-auto flex min-h-screen max-w-[1480px] items-start justify-center px-5 pt-28 md:px-8">
            <div className="w-full max-w-[900px]">
              <div className="mb-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="text-white transition hover:text-signal-blue focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="overflow-hidden rounded-md bg-white shadow-[0_18px_50px_rgba(3,7,13,0.32)]">
                <div className="flex items-center gap-4 px-5">
                  <input
                    autoFocus
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search the site..."
                    className="min-h-[68px] w-full border-0 bg-transparent text-[20px] text-carbon-900 outline-none placeholder:text-carbon-800/60"
                  />
                  <span className="text-signal-blue">
                    <SearchIcon />
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-md bg-white/[0.08] p-4 backdrop-blur-md">
                <div className="grid gap-3">
                  {filteredSearchEntries.map((entry) => (
                    <button
                      key={`${entry.meta}-${entry.title}`}
                      type="button"
                      onClick={() => handleSearchNavigate(entry.href)}
                      className="rounded-md border border-white/[0.08] bg-white/[0.04] px-4 py-4 text-left transition hover:border-signal-blue/[0.4] hover:bg-white/[0.08]"
                    >
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-blue">
                        {entry.meta}
                      </span>
                      <span className="mt-1 block text-[18px] font-medium text-white">
                        {entry.title}
                      </span>
                    </button>
                  ))}
                  {filteredSearchEntries.length === 0 ? (
                    <div className="rounded-md border border-white/[0.08] bg-white/[0.04] px-4 py-5 text-steel-300">
                      No matching pages or topics found.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="border-t border-white/10 bg-carbon-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl">
            <p className="text-xl font-semibold text-white">{company.name}</p>
            <p className="mt-4 text-base leading-7 text-steel-400">
              Senior engineering and consulting support for space,
              mission-critical and digital technical programmes.
            </p>
            <div className="mt-6 space-y-2 text-sm text-steel-400">
              <p>{company.location}</p>
              <a
                href={`mailto:${company.email}`}
                className="inline-block transition hover:text-signal-teal"
              >
                {company.email}
              </a>
            </div>
          </div>

          <div className="grid gap-y-3 gap-x-8 text-sm text-steel-300 sm:grid-cols-2 lg:justify-self-end">
            <SiteLink
              href="/services"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Services & Solutions
            </SiteLink>
            <SiteLink
              href="/training"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Training
            </SiteLink>
            <SiteLink
              href="/delivery-model"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Delivery Model
            </SiteLink>
            <SiteLink
              href="/digital-solutions"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Digital Solutions
            </SiteLink>
            <SiteLink
              href="/sectors"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              Sectors
            </SiteLink>
            <SiteLink
              href="/about"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal"
            >
              About Us
            </SiteLink>
            <SiteLink
              href="/contact#inquiry-form"
              className="transition hover:text-signal-teal focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-teal sm:col-span-2"
            >
              Contact Us
            </SiteLink>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-steel-500 md:px-8">
            Copyright 2026 ExoSpace Engineering & Consulting s.r.o. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
