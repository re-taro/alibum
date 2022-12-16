import type { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { OgCard } from "../../components/card/og";
import type { OgCardProps } from "../../components/card/og";

export const config = {
  runtime: "experimental-edge",
};

export default async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name")?.slice(0, 100) ?? "Alibum";
    const backGroundPng = new URL(
      "../../assets/OGP_.png",
      import.meta.url,
    ).toString();
    const font = fetch(
      new URL("../../assets/KosugiMaru.woff2", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const fontData = await font;
    const info: OgCardProps = {
      name,
      backGroundPng,
    };
    return new ImageResponse(<OgCard {...info} />, {
      width: 1200,
      height: 600,
      emoji: "twemoji",
      fonts: [
        {
          name: "KosugiMaru",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
};
