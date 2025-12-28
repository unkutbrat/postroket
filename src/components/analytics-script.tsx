"use client";

import { useEffect } from "react";

export function AnalyticsScript({ locale }: { locale: string }) {
  useEffect(() => {
    const device = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
    const payload = { path: window.location.pathname, locale, device, referrer: document.referrer };
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, [locale]);
  return null;
}
