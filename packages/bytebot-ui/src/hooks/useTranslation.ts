"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";

export function useTranslation() {
  const context = useLanguageContext();
  return context;
}
