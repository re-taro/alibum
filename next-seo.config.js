/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Alibum",
  titleTemplate: "%s | Alibum",
  defaultTitle: "Alibumへようこそ",
  description: "日頃の感謝でサプライズをしよう",
  canonical: "https://alibum.re-taro.dev",
  openGraph: {
    url: "https://alibum.re-taro.dev",
    title: "Alibum",
    description: "日頃の感謝でサプライズをしよう",
    images: [
      {
        url: "https://alibum.re-taro.dev/api/og?title=Alibum",
        alt: "alibum",
      },
    ],
    site_name: "Alibum",
  },
  twitter: {
    handle: "@10969_rintaro",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
