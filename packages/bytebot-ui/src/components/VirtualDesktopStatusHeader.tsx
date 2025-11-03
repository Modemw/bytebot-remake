"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

// Status types based on the image
export type VirtualDesktopStatus =
  | "running"
  | "needs_attention"
  | "failed"
  | "canceled"
  | "pending"
  | "user_control"
  | "completed"
  | "live_view";

interface StatusConfig {
  indicator: "black" | "green" | "orange" | "red" | "gray" | "pink";
  gradient: string;
  titleKey: string;
  subtextKey: string;
  altKey: string;
}

const statusConfig: Record<VirtualDesktopStatus, StatusConfig> = {
  live_view: {
    indicator: "black",
    gradient: "from-gray-700 to-gray-900",
    titleKey: "desktop.status.liveView.title",
    subtextKey: "desktop.status.liveView.subtext",
    altKey: "desktop.status.liveView.alt",
  },
  running: {
    indicator: "green",
    gradient: "from-green-700 to-green-900",
    titleKey: "desktop.status.running.title",
    subtextKey: "desktop.status.running.subtext",
    altKey: "desktop.status.running.alt",
  },
  needs_attention: {
    indicator: "orange",
    gradient: "from-yellow-600 to-orange-700",
    titleKey: "desktop.status.needsAttention.title",
    subtextKey: "desktop.status.needsAttention.subtext",
    altKey: "desktop.status.needsAttention.alt",
  },
  failed: {
    indicator: "red",
    gradient: "from-red-700 to-red-900",
    titleKey: "desktop.status.failed.title",
    subtextKey: "desktop.status.failed.subtext",
    altKey: "desktop.status.failed.alt",
  },
  canceled: {
    indicator: "gray",
    gradient: "from-gray-400 to-gray-600",
    titleKey: "desktop.status.canceled.title",
    subtextKey: "desktop.status.canceled.subtext",
    altKey: "desktop.status.canceled.alt",
  },
  pending: {
    indicator: "gray",
    gradient: "from-gray-400 to-gray-600",
    titleKey: "desktop.status.pending.title",
    subtextKey: "desktop.status.pending.subtext",
    altKey: "desktop.status.pending.alt",
  },
  user_control: {
    indicator: "pink",
    gradient: "from-pink-500 to-fuchsia-700",
    titleKey: "desktop.status.userControl.title",
    subtextKey: "desktop.status.userControl.subtext",
    altKey: "desktop.status.userControl.alt",
  },
  completed: {
    indicator: "green",
    gradient: "from-green-700 to-green-900",
    titleKey: "desktop.status.completed.title",
    subtextKey: "desktop.status.completed.subtext",
    altKey: "desktop.status.completed.alt",
  },
};

export interface VirtualDesktopStatusHeaderProps {
  status: VirtualDesktopStatus;
  subtext?: string; // allow override
  className?: string;
}

export const VirtualDesktopStatusHeader: React.FC<
  VirtualDesktopStatusHeaderProps
> = ({ status, subtext, className }) => {
  const { t } = useTranslation();
  const config = statusConfig[status];
  const indicatorAlt = t(config.altKey);
  const title = t(config.titleKey);
  const defaultSubtext = t(config.subtextKey);
  const resolvedSubtext = subtext ?? defaultSubtext;
  const showSubtext = resolvedSubtext.trim().length > 0;

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span className="mt-1 flex items-center justify-center">
        <Image
          src={`/indicators/indicator-${config.indicator}.svg`}
          alt={indicatorAlt}
          width={15}
          height={15}
        />
      </span>
      <div>
        <span
          className={cn(
            "text-md text-base font-semibold",
            config.gradient ? "bg-clip-text text-transparent" : "text-zinc-600",
          )}
          style={
            config.gradient
              ? {
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }
              : undefined
          }
        >
          <span
            className={cn(
              config.gradient
                ? `bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`
                : "",
            )}
          >
            {title}
          </span>
        </span>
        {showSubtext && (
          <span className="block text-[12px] text-zinc-400">
            {resolvedSubtext}
          </span>
        )}
      </div>
    </div>
  );
};
