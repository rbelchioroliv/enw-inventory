import "./globals.css";
import Link from "next/link";
import { Monitor, ShieldAlert } from "lucide-react";

export const metadata = { title: "ENW | Inventário de TI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-enwBlack text-white min-h-screen font-sans">
        <nav className="border-b border-enwGold/20 bg-enwDarkGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Monitor className="text-enwGold" size={28} />
                <span className="font-bold text-xl tracking-wider text-enwGold">
                  EYES <span className="text-white">NWHERE</span>
                </span>
              </div>
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 hover:text-enwGold transition px-3 py-2 rounded-md text-sm font-medium">
                  Visão Geral
                </Link>
                <Link href="/admin" className="text-enwBlack bg-enwGold hover:bg-yellow-400 transition px-3 py-2 rounded-md text-sm font-bold flex items-center gap-2">
                  <ShieldAlert size={16} /> Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}