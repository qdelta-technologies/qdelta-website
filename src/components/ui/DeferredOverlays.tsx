"use client";

import dynamic from "next/dynamic";

const QDeltaAIChatbot = dynamic(() => import("@/components/ui/QDeltaAIChatbot"), {
  ssr: false,
});

export default function DeferredOverlays() {
  return <QDeltaAIChatbot />;
}
