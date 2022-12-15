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
    const hasTitle = searchParams.has("title");
    const title = hasTitle 
    ? searchParams.get("title")?.slice(0, 100)
    : "alibum";
    const fontData = await font;
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
        <option style={{
            fontFamily: 'KosugiMaru',
            
        }} /> 
        <p style={{
            fontSize: '60px',
            fontWeight: 'bold',
        }}>
          { title }
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
          data: fontData,
          style: "normal",
        },
      ],
    },

    );
};
