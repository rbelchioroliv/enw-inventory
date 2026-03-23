"use client";

import { useState } from "react";
import AdminForm from "./AdminForm";
import AdminTable from "./AdminTable";
import UsersTab from "./UsersTab";
import { Monitor, Users, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminManager({ equipamentos, users }: { equipamentos: any[], users: any[] }) {
  const [activeTab, setActiveTab] = useState<"equipments" | "users">("equipments");

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-center bg-enwDarkGray border border-enwGold/20 p-4 rounded-xl shadow-lg gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <button onClick={() => setActiveTab("equipments")} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === "equipments" ? 'bg-enwGold text-enwBlack shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-enwBlack text-gray-400 hover:text-white border border-white/10'}`}>
            <Monitor size={18} /> <span className="hidden sm:inline">Equipamentos</span>
          </button>
          <button onClick={() => setActiveTab("users")} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === "users" ? 'bg-enwGold text-enwBlack shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-enwBlack text-gray-400 hover:text-white border border-white/10'}`}>
            <Users size={18} /> <span className="hidden sm:inline">Perfis de Acesso</span>
          </button>
        </div>
        
   
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all font-semibold">
          <LogOut size={18} /> Sair do Painel
        </button>
      </div>

     
      {activeTab === "equipments" ? (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <AdminForm />
          <AdminTable equipamentos={equipamentos} />
        </div>
      ) : (
        <UsersTab users={users} />
      )}
    </div>
  );
}