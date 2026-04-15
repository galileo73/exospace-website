import { useMemo, useState } from "react";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  personalization: boolean;
};

const STORAGE_KEY = "exospace-cookie-preferences";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  personalization: false,
};

function readStoredPreferences() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as CookiePreferences;
  } catch {
    return null;
  }
}

function savePreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(
    () => readStoredPreferences() === null,
  );
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => readStoredPreferences() ?? defaultPreferences,
  );

  const summary = useMemo(() => {
    if (preferences.analytics && preferences.personalization) {
      return "Analytics and personalization preferences are enabled.";
    }

    if (preferences.analytics) {
      return "Analytics preferences are enabled.";
    }

    if (preferences.personalization) {
      return "Personalization preferences are enabled.";
    }

    return "Only necessary cookies are enabled.";
  }, [preferences]);

  function handleAcceptAll() {
    const nextPreferences = {
      necessary: true,
      analytics: true,
      personalization: true,
    } satisfies CookiePreferences;

    setPreferences(nextPreferences);
    savePreferences(nextPreferences);
    setVisible(false);
    setCustomizing(false);
  }

  function handleRejectAll() {
    setPreferences(defaultPreferences);
    savePreferences(defaultPreferences);
    setVisible(false);
    setCustomizing(false);
  }

  function handleSaveCustom() {
    savePreferences(preferences);
    setVisible(false);
    setCustomizing(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.12] bg-[linear-gradient(180deg,rgba(7,16,24,0.96),rgba(3,7,13,0.98))] text-steel-100 shadow-[0_-24px_60px_rgba(2,6,14,0.42)] backdrop-blur-xl">
      <div className="mx-auto max-w-none px-4 py-5 md:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-5xl">
            <h2 className="text-2xl font-semibold leading-tight text-white">
              We value your privacy
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-300 md:text-base">
              We use necessary cookies to keep the site working. Optional
              analytics and personalization settings can help us improve the
              website experience. You can accept all, reject optional cookies,
              or choose your preferences.
            </p>
            {customizing ? (
              <div className="mt-5 grid gap-3 rounded-md border border-white/[0.12] bg-white/[0.03] p-4 md:max-w-3xl">
                <label className="flex items-start justify-between gap-4 rounded-md border border-white/[0.12] bg-carbon-900/[0.78] px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      Strictly necessary
                    </span>
                    <span className="mt-1 block text-sm text-steel-300">
                      Required for essential site functions. Always active.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 h-4 w-4 accent-signal-blue"
                  />
                </label>
                <label className="flex items-start justify-between gap-4 rounded-md border border-white/[0.12] bg-carbon-900/[0.78] px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      Analytics
                    </span>
                    <span className="mt-1 block text-sm text-steel-300">
                      Helps us understand traffic and improve the website.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        analytics: event.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 accent-signal-blue"
                  />
                </label>
                <label className="flex items-start justify-between gap-4 rounded-md border border-white/[0.12] bg-carbon-900/[0.78] px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      Personalization
                    </span>
                    <span className="mt-1 block text-sm text-steel-300">
                      Stores optional preferences to improve the browsing
                      experience.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.personalization}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        personalization: event.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 accent-signal-blue"
                  />
                </label>
                <p className="text-sm text-steel-300">{summary}</p>
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:justify-end">
            {customizing ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-signal-blue px-6 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Save preferences
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCustomizing(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-signal-blue/70 px-6 text-sm font-semibold text-steel-100 transition hover:border-signal-blue hover:bg-white/[0.05]"
              >
                Customize
              </button>
            )}
            <button
              type="button"
              onClick={handleRejectAll}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-signal-blue/70 px-6 text-sm font-semibold text-steel-100 transition hover:border-signal-blue hover:bg-white/[0.05]"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-signal-blue px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(105,169,221,0.28)] transition hover:brightness-110"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
