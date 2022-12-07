/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "ありばむ",
  titleTemplate: "%s | ありばむ",
  defaultTitle: "ありばむへようこそ",
  description: "「ありばむ」で日頃の感謝をサプライズしよう",
  canonical: "https://alibum.re-taro.dev",
  openGraph: {
    url: "https://alibum.re-taro.dev",
    title: "ありばむ",
    description: "「ありばむ」で日頃の感謝をサプライズしよう",
    images: [
      {
        url: "https://alibum.re-taro.dev/api/ogp?title=ありばむ",
        alt: "ありばむ",
      },
    ],
    site_name: "ありばむ",
  },
  twitter: {
    handle: "@10969_rintaro",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
