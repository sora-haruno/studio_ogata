import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- ここがAI検索対策のキモ：メタデータ設定 ---
export const metadata: Metadata = {
  title: {
    default: "STUDIO OGATA | 映像作家・フォトグラファー 尾形 賢",
    template: "%s | STUDIO OGATA"
  },
  description: "写真家・映像作家として40年以上のキャリアを持つ尾形 賢（STUDIO OGATA）の公式ポートフォリオ。昭和の名車、路面電車、東京点描など、情緒豊かな映像美の世界を公開。",
  keywords: ["尾形賢", "STUDIO OGATA", "映像作家", "フォトグラファー", "ヒーリングタイム", "昭和の名車", "東京点描"],
  authors: [{ name: "Ken Ogata" }],
  openGraph: {
    title: "STUDIO OGATA | 映像作家・フォトグラファー 尾形 賢",
    description: "40年のキャリアが紡ぐ、心地よい映像の世界。",
    url: "https://studio-ogata.jp", // 後で実際のドメインが決まったら修正
    siteName: "STUDIO OGATA",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO OGATA | 映像作家・フォトグラファー 尾形 賢",
    description: "40年のキャリアが紡ぐ、心地よい映像の世界。",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* 全体の背景色を黒に固定し、文字を白にする設定をbodyに追加 */}
        <div className="bg-black text-white min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}