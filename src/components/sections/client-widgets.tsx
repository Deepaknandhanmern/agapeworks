"use client";

import dynamic from "next/dynamic";

// Fixed-position overlay widgets - none are needed for first paint (each
// starts closed/dismissed), so they're code-split out of the main bundle
// and hydrated after it instead of shipping their JS to every page upfront.
// `ssr: false` requires a Client Component boundary, hence this wrapper
// rather than calling dynamic() directly from the (server) root layout.
const AnnouncementToast = dynamic(
  () => import("@/components/sections/announcement-toast").then((m) => m.AnnouncementToast),
  { ssr: false },
);
const ViviraTeaser = dynamic(
  () => import("@/components/sections/vivira-teaser").then((m) => m.ViviraTeaser),
  { ssr: false },
);
const ConciergeChat = dynamic(
  () => import("@/components/sections/concierge-chat").then((m) => m.ConciergeChat),
  { ssr: false },
);
const BackToTopButton = dynamic(
  () => import("@/components/ui/back-to-top-button").then((m) => m.BackToTopButton),
  { ssr: false },
);
const TabTitleAway = dynamic(
  () => import("@/components/ui/tab-title-away").then((m) => m.TabTitleAway),
  { ssr: false },
);

export function ClientWidgets() {
  return (
    <>
      <AnnouncementToast />
      <ViviraTeaser />
      <ConciergeChat />
      <BackToTopButton />
      <TabTitleAway />
    </>
  );
}
