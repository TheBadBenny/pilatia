import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf6f1",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          fill="#8fa68e"
        >
          <path d="M14 2.5c4.2 3.1 7 7 7 11.7 0 4.4-2.7 8.4-7 10.3-4.3-1.9-7-5.9-7-10.3 0-4.7 2.8-8.6 7-11.7z" />
          <circle cx="14" cy="17" r="2" fill="#faf6f1" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
