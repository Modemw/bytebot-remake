"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScreenshotData } from '@/utils/screenshotUtils';
import { useTranslation } from '@/hooks/useTranslation';

interface ScreenshotViewerProps {
  screenshot: ScreenshotData | null;
  className?: string;
}

export function ScreenshotViewer({ screenshot, className = '' }: ScreenshotViewerProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(screenshot);
  const { t } = useTranslation();

  useEffect(() => {
    if (screenshot?.id !== currentScreenshot?.id) {
      setCurrentScreenshot(screenshot);
    }
  }, [screenshot, currentScreenshot]);

  if (!currentScreenshot) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="mb-2 text-4xl">📷</div>
          <p className="text-sm">{t('screenshots.noneTitle')}</p>
          <p className="text-xs mt-1">{t('screenshots.noneDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={`data:image/png;base64,${currentScreenshot.base64Data}`}
        alt={t('screenshots.alt')}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
