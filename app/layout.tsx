import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parash Shah | Software Engineer",
  description:
    "Engineering portfolio of Parash Shah — distributed systems, cloud infrastructure, security engineering, and AI infrastructure.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
