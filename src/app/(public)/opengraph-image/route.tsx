import { OG_CONTENT_TYPE } from "@/lib/og";
import { renderSocialImage } from "@/lib/social-image";

export const dynamic = "force-static";

export async function GET() {
  const image = await renderSocialImage();

  return new Response(image.body, {
    headers: {
      "Content-Type": OG_CONTENT_TYPE,
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
