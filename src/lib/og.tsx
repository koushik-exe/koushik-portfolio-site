import { ImageResponse } from "next/og";

import { brandColors } from "./brand-colors";
import { siteConfig } from "./site";

/** Phase 10: shared 1200x630 social card (DESIGN 10.4). */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${siteConfig.name}, ${siteConfig.role}`;

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 600;
  style: "normal";
};

/** Convert a Node Buffer to the ArrayBuffer `ImageResponse` expects. */
export function toArrayBuffer(data: Uint8Array): ArrayBuffer {
  return data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength,
  ) as ArrayBuffer;
}

export function renderOgImage(font?: OgFont) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brandColors.paper,
          color: brandColors.ink,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 2,
              background: brandColors.accent,
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: brandColors.inkMuted,
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: font ? font.name : undefined,
              fontSize: 112,
              fontWeight: font ? 600 : 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 40,
              color: brandColors.inkMuted,
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${brandColors.border}`,
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 24, color: brandColors.inkMuted }}>
            SQL · Excel · Python · Business Analytics
          </div>
          <div style={{ fontSize: 22, color: brandColors.inkMuted }}>
            {siteConfig.location}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [font] : undefined,
    },
  );
}
