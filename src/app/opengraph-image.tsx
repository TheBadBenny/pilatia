import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Pilatia · Pilates y barre en Madrid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf6f1",
          color: "#2a2622",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "ui-serif, Georgia, serif",
        }}
      >
        {/* Sage organic blob */}
        <svg
          width="780"
          height="780"
          viewBox="0 0 500 500"
          style={{
            position: "absolute",
            top: -180,
            right: -260,
          }}
        >
          <path
            fill="#8fa68e"
            opacity="0.32"
            d="M421,317.5Q380,385,310,419Q240,453,170,419Q100,385,82,310Q64,235,124,180Q184,125,250,100Q316,75,380,135Q444,195,432.5,272.5Q421,350,421,317.5Z"
          />
        </svg>
        {/* Rose blob bottom-left */}
        <svg
          width="520"
          height="520"
          viewBox="0 0 500 500"
          style={{
            position: "absolute",
            bottom: -180,
            left: -160,
          }}
        >
          <path
            fill="#e8c4b8"
            opacity="0.28"
            d="M425,310Q400,370,340,410Q280,450,200,432Q120,414,90,338Q60,262,98,196Q136,130,210,108Q284,86,355,128Q426,170,440,235Q454,300,425,310Z"
          />
        </svg>
        {/* Content layer */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="44" height="44" viewBox="0 0 28 28" fill="#8fa68e">
              <path d="M14 2.5c4.2 3.1 7 7 7 11.7 0 4.4-2.7 8.4-7 10.3-4.3-1.9-7-5.9-7-10.3 0-4.7 2.8-8.6 7-11.7z" />
              <circle cx="14" cy="17" r="2" fill="#faf6f1" />
            </svg>
            <span style={{ fontSize: "44px", fontWeight: 500 }}>Pilatia</span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "22px",
                color: "#5c544d",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Pilates y barre en Madrid
            </div>
            <div
              style={{
                fontSize: "92px",
                lineHeight: 1.02,
                fontWeight: 500,
                maxWidth: "950px",
                letterSpacing: "-0.01em",
              }}
            >
              Compara los estudios de tu ciudad.
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "#5c544d",
                marginTop: "28px",
                maxWidth: "880px",
                lineHeight: 1.3,
              }}
            >
              29 estudios verificados · precios desde 52 € hasta 745 €/mes ·
              datos honestos, sin afiliaciones.
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "24px",
              color: "#5c544d",
            }}
          >
            <span>thebadbenny.github.io/pilatia</span>
            <span
              style={{
                background: "#8fa68e",
                color: "#faf6f1",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "22px",
              }}
            >
              Comparar estudios →
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
