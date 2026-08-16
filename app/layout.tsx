import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parash Shah | Software Development Engineer",
  description:
    "Portfolio of Parash Shah, an AWS Software Development Engineer focused on cloud security infrastructure, cross-account access, observability, and reliability.",
  applicationName: "Parash Portfolio",
  authors: [{ name: "Parash Shah" }],
  creator: "Parash Shah",
  openGraph: {
    title: "Parash Shah | Software Development Engineer",
    description:
      "Cloud security infrastructure, operational detection, reliability engineering, and validated projects by Parash Shah.",
    siteName: "Parash Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Parash Shah | Software Development Engineer",
    description:
      "Cloud security infrastructure, operational detection, reliability engineering, and validated projects by Parash Shah.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
