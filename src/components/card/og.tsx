export type OgCardProps = {
  name: string;
  backGroundPng: string;
};

export const OgCard = ({ name, backGroundPng }: OgCardProps) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${backGroundPng})`,
    }}
  >
    <p
      style={{
        fontFamily: "KosugiMaru",
        fontSize: 72,
      }}
    >
      {name}
    </p>
  </div>
);
