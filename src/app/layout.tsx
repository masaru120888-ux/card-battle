import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "性格診断ダンジョンRPG",
  description:
    "ランダムな性格診断で動物の役職が決まる、デッキ構築ダンジョンRPG。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-serif">
        {/* Mobile-portrait-first frame (375–430px). */}
        <div className="oracle-bg relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
