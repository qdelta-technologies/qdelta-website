import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "QDelta Technologies - Web Design Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const icon = await readFile(path.join(process.cwd(), "public", "images", "qdelta-icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #06070A 0%, #12141b 100%)",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={220} height={220} alt="" style={{ borderRadius: 40 }} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 70 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>QDelta Technologies</div>
          <div style={{ marginTop: 22, fontSize: 38, color: "#FAB406" }}>Web Design Agency</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#a1a1aa" }}>
            High-converting landing pages and premium websites
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
