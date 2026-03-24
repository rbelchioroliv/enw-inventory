"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Monitor, ArrowRight } from "lucide-react";
import { checkHasUsers, setupFirstAdmin } from "../user-actions";

export default function LoginPage() {
  const [hasUsers, setHasUsers] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkHasUsers().then(setHasUsers);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    if (!hasUsers) {
     
      const res = await setupFirstAdmin(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        window.location.reload();
      }
    } else {
      
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      const res = await signIn("credentials", { email, password, redirect: false });
      
      if (res?.error) {
        setError("Credenciais inválidas. Tente novamente.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    }
  }

  if (hasUsers === null) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-enwDarkGray border border-enwGold/20 p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Efeito luminoso de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-enwGold/10 blur-[50px] rounded-[100%]"></div>
        
        <div className="relative text-center mb-8">
          <div className="inline-flex p-3 bg-enwBlack rounded-xl border border-enwGold/30 text-enwGold mb-4 shadow-inner">
            {hasUsers ? <ShieldAlert size={32} /> : <Monitor size={32} />}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {hasUsers ? "Acesso Restrito" : "Bem-vindo ao EyesNwhere"}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {hasUsers ? "Insira as suas credenciais para gerir o inventário." : "Configure o primeiro Administrador do sistema."}
          </p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          {!hasUsers && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Nome Completo</label>
              <input type="text" name="name" required className="w-full bg-enwBlack border border-white/10 rounded-lg p-3 text-white focus:border-enwGold outline-none transition" />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">E-mail Corporativo</label>
            <input type="email" name="email" required className="w-full bg-enwBlack border border-white/10 rounded-lg p-3 text-white focus:border-enwGold outline-none transition" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Senha Segura</label>
            <input type="password" name="password" required className="w-full bg-enwBlack border border-white/10 rounded-lg p-3 text-white focus:border-enwGold outline-none transition" />
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-enwGold to-[#e6c65c] text-enwBlack font-bold py-3.5 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all mt-6 disabled:opacity-50">
            {loading ? "A processar..." : (hasUsers ? "Entrar no Sistema" : "Criar Administrador")} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}