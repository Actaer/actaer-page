"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  startTransition,
  type ReactNode,
} from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

// Increment this when cookie policy changes to re-prompt users
const CONSENT_VERSION = 1;
const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 12 months in seconds

export interface ConsentPreferences {
  essential: boolean; // Always true, required for site functionality
  functional: boolean; // Enhanced features like preferences
  analytics: boolean; // Analytics tracking (Vercel, Clarity)
  marketing: boolean; // Future marketing/advertising cookies
}

interface ConsentState extends ConsentPreferences {
  hasConsented: boolean;
  consentVersion: number;
}

interface GTMConsentMode {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  personalization_storage: "granted" | "denied";
  security_storage: "granted";
}

interface CookieConsentContextType {
  consent: ConsentState;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<ConsentPreferences>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  getConsentMode: () => GTMConsentMode;
}

const defaultConsent: ConsentState = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  hasConsented: false,
  consentVersion: 0,
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null,
);

// Safe hook that doesn't throw - returns default values if no provider
export function useCookieConsentSafe(): CookieConsentContextType | null {
  return useContext(CookieConsentContext);
}

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}

function parseConsentCookie(): ConsentState | null {
  try {
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) return null;

    const parsed = JSON.parse(cookie as string);

    // Validate parsed data has required fields
    if (
      typeof parsed.essential !== "boolean" ||
      typeof parsed.functional !== "boolean" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.consentVersion !== "number"
    ) {
      return null;
    }

    return {
      essential: true, // Always true
      functional: parsed.functional,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      hasConsented: true,
      consentVersion: parsed.consentVersion,
    };
  } catch {
    return null;
  }
}

function saveConsentCookie(consent: ConsentState): void {
  setCookie(
    COOKIE_NAME,
    JSON.stringify({
      essential: consent.essential,
      functional: consent.functional,
      analytics: consent.analytics,
      marketing: consent.marketing,
      consentVersion: consent.consentVersion,
    }),
    {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load consent from cookie on mount
  useEffect(() => {
    const savedConsent = parseConsentCookie();

    startTransition(() => {
      if (savedConsent) {
        // Check if consent version is outdated
        if (savedConsent.consentVersion < CONSENT_VERSION) {
          // Reset consent to prompt user again
          setConsent(defaultConsent);
          deleteCookie(COOKIE_NAME);
        } else {
          setConsent(savedConsent);
        }
      }

      setIsHydrated(true);
    });
  }, []);

  const acceptAll = useCallback(() => {
    const newConsent: ConsentState = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      hasConsented: true,
      consentVersion: CONSENT_VERSION,
    };
    setConsent(newConsent);
    saveConsentCookie(newConsent);
    setIsPreferencesOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    const newConsent: ConsentState = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      hasConsented: true,
      consentVersion: CONSENT_VERSION,
    };
    setConsent(newConsent);
    saveConsentCookie(newConsent);
    setIsPreferencesOpen(false);
  }, []);

  const updatePreferences = useCallback(
    (preferences: Partial<ConsentPreferences>) => {
      const newConsent: ConsentState = {
        ...consent,
        ...preferences,
        essential: true, // Always true
        hasConsented: true,
        consentVersion: CONSENT_VERSION,
      };
      setConsent(newConsent);
      saveConsentCookie(newConsent);
      setIsPreferencesOpen(false);
    },
    [consent],
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const getConsentMode = useCallback((): GTMConsentMode => {
    return {
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: consent.functional ? "granted" : "denied",
      personalization_storage: consent.functional ? "granted" : "denied",
      security_storage: "granted", // Always granted for security cookies
    };
  }, [consent.marketing, consent.analytics, consent.functional]);

  // Don't render until hydrated to prevent hydration mismatch
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isPreferencesOpen,
        acceptAll,
        rejectAll,
        updatePreferences,
        openPreferences,
        closePreferences,
        getConsentMode,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
