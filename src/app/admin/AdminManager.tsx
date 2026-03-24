"use client";

import { useState } from "react";
import AdminForm from "./AdminForm";
import AdminTable from "./AdminTable";
import UsersTab from "./UsersTab";
import { Monitor, Users, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminManager({ equipamentos, users, currentUserEmail }: { equipamentos: any[], users: any[], currentUserEmail?: string | null }) {
  const [activeTab, setActiveTab] = useState<"equipments" | "users">("equipments");

  return (
    <div className="space-y-6 max-w-full overflow-hidden px-2 sm:px-0">
      
      {/* Navegação de Abas do Admin - Mobile Friendly */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-enwDarkGray border border-enwGold/20 p-3 sm:p-4 rounded-xl shadow-lg gap-3">
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2">
          <button onClick={() => setActiveTab("equipments")} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-lg font-bold transition-all ${activeTab === "equipments" ? 'bg-enwGold text-enwBlack shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-enwBlack text-gray-400 hover:text-white border border-white/10'}`}>
            <Monitor size={18} /> Equipamentos
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-lg font-bold transition-all ${activeTab === "users" ? 'bg-enwGold text-enwBlack shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-enwBlack text-gray-400 hover:text-white border border-white/10'}`}>
            <Users size={18} /> Perfis de Acesso
          </button>
        </div>
        
        {/* Botão de Sair - Full width no mobile */}
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all font-semibold">
          <LogOut size={18} /> Sair do Painel
        </button>
      </div>

      {activeTab === "equipments" ? (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <AdminForm />
          <AdminTable equipamentos={equipamentos} />
        </div>
      ) : (
        <UsersTab users={users} currentUserEmail={currentUserEmail} /> 
      )}
    </div>
  );
}