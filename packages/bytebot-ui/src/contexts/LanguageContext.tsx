"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fallbackLanguage,
  LANGUAGES,
  Language,
  LanguageDefinition,
  translations,
} from "@/locales/translations";

type TranslationParams = Record<string, string | number>;

export type TranslationFunction = (
  key: string,
  params?: TranslationParams,
) => string;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
  languages: LanguageDefinition[];
}

const STORAGE_KEY = "bytebot-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function isLanguage(value: string): value is Language {
  return (LANGUAGES as LanguageDefinition[]).some(
    (language) => language.code === value,
  );
}

function normalizeLocale(locale: string): string {
  return locale.replace(/_/g, "-").toLowerCase();
}

function findLanguageByLocale(locale: string): Language | undefined {
  const normalized = normalizeLocale(locale);

  const exactMatch = LANGUAGES.find(
    (language) => language.code.toLowerCase() === normalized,
  );
  if (exactMatch) {
    return exactMatch.code;
  }

  const startsWithMatch = LANGUAGES.find((language) =>
    normalized.startsWith(language.code.toLowerCase()),
  );
  if (startsWithMatch) {
    return startsWithMatch.code;
  }

  if (normalized.startsWith("zh")) {
    if (/(hant|hk|mo|tw)/.test(normalized)) {
      return "zh-TW";
    }
    return "zh-CN";
  }

  return undefined;
}

function getBrowserLanguage(): Language | undefined {
  if (typeof navigator === "undefined") {
    return undefined;
  }

  const browserLocales: string[] = Array.isArray(navigator.languages)
    ? navigator.languages
        .filter((value): value is string => typeof value === "string")
        .filter((value) => value.length > 0)
    : navigator.language
        ? [navigator.language]
        : [];

  for (const locale of browserLocales) {
    const match = findLanguageByLocale(locale);
    if (match) {
      return match;
    }
  }

  return undefined;
}

function resolveTranslation(
  language: Language,
  key: string,
): string | undefined {
  const segments = key.split(".");

  const traverse = (
    lang: Language,
  ): string | Record<string, unknown> | undefined => {
    return segments.reduce<unknown>((accumulator, segment) => {
      if (
        typeof accumulator === "object" &&
        accumulator !== null &&
        segment in accumulator
      ) {
        return (accumulator as Record<string, unknown>)[segment];
      }
      return undefined;
    }, translations[lang]);
  };

  const value = traverse(language);
  if (typeof value === "string") {
    return value;
  }

  const fallback = traverse(fallbackLanguage);
  return typeof fallback === "string" ? fallback : undefined;
}

function interpolate(value: string, params?: TranslationParams): string {
  if (!params) {
    return value;
  }

  return value.replace(/{{\s*([^{}\s]+)\s*}}/g, (_, key) => {
    const paramKey = key.trim();
    const replacement = params[paramKey];
    return replacement !== undefined ? String(replacement) : "";
  });
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(fallbackLanguage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored && isLanguage(stored)) {
      setLanguageState(stored);
      return;
    }

    const browserLanguage = getBrowserLanguage();

    if (browserLanguage) {
      setLanguageState(browserLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    }
  }, []);

  const translate = useCallback<TranslationFunction>(
    (key, params) => {
      const resolved = resolveTranslation(language, key);
      return resolved ? interpolate(resolved, params) : key;
    },
    [language],
  );

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translate,
      languages: LANGUAGES,
    }),
    [language, setLanguage, translate],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }
  return context;
}
