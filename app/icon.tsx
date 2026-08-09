import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "#07090c",
          color: "#f5f7fa",
          fontSize: "15px",
          fontWeight: 800,
          letterSpacing: "-1px",
          border: "1px solid rgba(124, 243, 200, 0.5)",
        }}
      >
        PS<span style={{ color: "#7cf3c8" }}>.</span>
      </div>
    ),
    size,
  );
}
