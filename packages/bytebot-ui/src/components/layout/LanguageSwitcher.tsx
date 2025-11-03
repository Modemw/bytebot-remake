"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage, languages, t } = useTranslation();
  const activeLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          aria-label={t("common.language")}
        >
          <span className="text-xs font-semibold">
            {(activeLanguage?.shortLabel ?? language).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => {
          const labelKey =
            lang.code === "en"
              ? "languageSwitcher.english"
              : lang.code === "zh-CN"
                ? "languageSwitcher.simplified"
                : "languageSwitcher.traditional";

          return (
            <DropdownMenuItem
              key={lang.code}
              className={cn(
                "flex cursor-pointer items-center justify-between",
                lang.code === language && "bg-muted",
              )}
              onClick={() => setLanguage(lang.code)}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{t(labelKey)}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeLabel}</span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {lang.shortLabel.toUpperCase()}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
