import "./globals.css";
import Link from "next/link";
import { Monitor, ShieldAlert, LayoutDashboard } from "lucide-react";

export const metadata = {
  title: "ENW | Inventário de TI",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body className="bg-enwBlack text-gray-100 min-h-screen font-sans selection:bg-enwGold selection:text-enwBlack">

        
        <nav className="sticky top-0 z-50 border-b border-enwGold/10 bg-enwDarkGray/80 backdrop-blur-md shadow-sm">
       
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:h-20 gap-4">

             
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-enwBlack rounded-lg border border-enwGold/20 group-hover:border-enwGold/50 transition-all duration-300">
                  <Monitor className="text-enwGold" size={20} />
                </div>
                <span className="font-bold text-xl tracking-widest text-enwGold flex items-center gap-1">
                  EYES<span className="text-white font-medium">NWHERE</span>
                </span>
              </Link>

              
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-enwGold flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Visão
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 bg-enwGold text-enwBlack px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <ShieldAlert size={16} />
                  Admin
                </Link>
              </div>

            </div>
          </div>
        </nav>

        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-enwDarkGray/30 border border-white/5 rounded-2xl p-6 min-h-[70vh] shadow-xl">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}