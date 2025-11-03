"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 16,
  className
}) => {
  const { t } = useTranslation();
  return (
    <Image
      src="/loader.svg"
      alt={t("loader.alt")}
      width={size}
      height={size}
      className={cn("animate-spin", className)}
    />
  );
};