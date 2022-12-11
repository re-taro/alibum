import { ImageResponse } from '@vercel/og';
export const config = {
  runtime: 'experimental-edge',
};

const backGroundPng = new URL(
    "../../assets/OGP_.png",
    import.meta.url,
).toString();

export default function() {
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
            fontFamily: 'sans-serif, "Material Icons"',
        }}>
        </option> 
        <p style={{
            fontSize: '60px',
        }}>
          
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
};
