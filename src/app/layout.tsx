import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Gunja Gupta — Homeopathy & Psychology",
  description: "Healing that treats the whole person. Dr. Gunja Gupta combines homeopathic medicine with psychological expertise. Book your consultation today.",
  keywords: "homeopathy, psychology, holistic healing, Dr. Gunja Gupta, natural medicine, mind-body therapy",
  openGraph: {
    title: "Dr. Gunja Gupta — Homeopathy & Psychology",
    description: "Healing that treats the whole person — mind, body, and spirit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
