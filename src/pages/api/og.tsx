import type { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const backGroundPng = new URL(
    "../../assets/OGP_.png",
    import.meta.url,
).toString();

const font = fetch(
    new URL("../../assets/KosugiMaru-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const HasTitle = searchParams.has("title");
    const Title = HasTitle 
    ? searchParams.get("title")?.slice(0, 100)
    : "Alibum";
    const FontData = await font;
  return new ImageResponse(
    (
      <div style={{
          width: '100%',
          height: '100%',
          padding: '20px 80px',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          wordBreak: 'break-all',
          backgroundImage: `url(${backGroundPng})`,
        }}>
        <p style={{
            fontFamily: 'KosugiMaru',
            fontSize: '60px',
            fontWeight: 'bold',
        }}>
          { Title }
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      emoji: "twemoji",
      fonts: [
        {
          name: "KosugiMaru",
          data: FontData,
          style: "normal",
        },
      ],
    },

    );
};
