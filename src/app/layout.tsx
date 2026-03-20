import "./globals.css";
import Link from "next/link";
import { Monitor, ShieldAlert, LayoutDashboard } from "lucide-react";

export const metadata = { title: "ENW | Inventário de TI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body className="bg-enwBlack text-gray-100 min-h-screen font-sans selection:bg-enwGold selection:text-enwBlack">
        
        {/* Navbar com efeito translúcido (Glassmorphism) */}
        <nav className="sticky top-0 z-50 border-b border-enwGold/10 bg-enwDarkGray/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo e Nome */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2.5 bg-enwBlack rounded-xl border border-enwGold/20 group-hover:border-enwGold/50 transition-all duration-300 shadow-inner">
                  <Monitor className="text-enwGold group-hover:scale-110 transition-transform duration-300" size={24} />
                </div>
                <span className="font-bold text-2xl tracking-widest text-enwGold flex items-center gap-1">
                  EYES<span className="text-white font-medium">NWHERE</span>
                </span>
              </Link>

              {/* Links de Navegação */}
              <div className="flex items-center space-x-6">
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-enwGold flex items-center gap-2 transition-colors duration-200 text-sm font-medium"
                >
                  <LayoutDashboard size={18} />
                  Visão Geral
                </Link>
                
                {/* Botão Admin Premium */}
                <Link 
                  href="/admin" 
                  className="group flex items-center gap-2 bg-gradient-to-r from-enwGold to-[#e6c65c] text-enwBlack px-5 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ShieldAlert size={18} className="group-hover:animate-pulse" /> 
                  Painel Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Área Principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-enwDarkGray/30 border border-white/5 rounded-2xl p-6 min-h-[70vh] shadow-xl">
            {children}
          </div>
        </main>
        
      </body>
    </html>
  );
}