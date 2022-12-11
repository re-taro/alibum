import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};
const icon = new URL(
    "../../assets/OGP_.png",
    import.meta.url,
).toString();

export default function () {
  return new ImageResponse(
    (
      <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          fontSize: 60,
          backgroundImage: `url(${icon})`,
        }}>
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
