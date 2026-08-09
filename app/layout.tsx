import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parash Portfolio | Software Engineer",
  description:
    "Interactive engineering portfolio of Parash Shah, showcasing distributed systems, cloud infrastructure, security engineering, reliability, and AI infrastructure.",
  applicationName: "Parash Portfolio",
  authors: [{ name: "Parash Shah" }],
  creator: "Parash Shah",
  openGraph: {
    title: "Parash Portfolio | Software Engineer",
    description:
      "Distributed systems, cloud infrastructure, security engineering, reliability, and AI projects by Parash Shah.",
    siteName: "Parash Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Parash Portfolio | Software Engineer",
    description:
      "Distributed systems, cloud infrastructure, security engineering, reliability, and AI projects by Parash Shah.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
