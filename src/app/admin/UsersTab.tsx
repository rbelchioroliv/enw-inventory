"use client";

import { useState, useRef } from "react";
import { addUser, deleteUser } from "../user-actions";
import { Trash2, User, Mail, ShieldCheck, AlertTriangle } from "lucide-react";

export default function UsersTab({ users }: { users: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await addUser(formData);
    setLoading(false);
    if (res?.error) setError(res.error);
    else { setError(null); formRef.current?.reset(); }
  }

  async function handleDelete(id: string) {
    if(!confirm("Remover permanentemente este acesso?")) return;
    const res = await deleteUser(id);
    if (res?.error) setError(res.error);
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-enwGold mb-6 flex items-center gap-2">
          <ShieldCheck size={24} /> Conceder Acesso Administrador
        </h2>
        
        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6">
            <AlertTriangle size={20} className="shrink-0"/> <p className="text-sm">{error}</p>
          </div>
        )}

        <form ref={formRef} action={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="name" placeholder="Nome do Admin" required className="bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
          <input type="email" name="email" placeholder="E-mail" required className="bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
          <input type="password" name="password" placeholder="Senha Provisória" required className="bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
          <button type="submit" disabled={loading} className="md:col-span-3 bg-enwGold text-enwBlack font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg mt-2 disabled:opacity-50">
            {loading ? "A Criar Perfil..." : "Adicionar Administrador"}
          </button>
        </form>
      </div>

      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl shadow-xl overflow-x-auto">
        <h2 className="text-xl font-bold text-enwGold mb-4">Administradores Ativos</h2>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 bg-enwBlack/50">
              <th className="p-3 font-semibold rounded-tl-lg">Nome</th>
              <th className="p-3 font-semibold">E-mail de Acesso</th>
              <th className="p-3 font-semibold">Permissão</th>
              <th className="p-3 font-semibold rounded-tr-lg w-20">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-800 hover:bg-enwBlack/80 transition">
                <td className="p-3 text-white font-medium flex items-center gap-2"><User size={16} className="text-enwGold"/> {u.name}</td>
                <td className="p-3 text-gray-300"><div className="flex items-center gap-2"><Mail size={14} className="text-gray-500"/> {u.email}</div></td>
                <td className="p-3"><span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded">TOTAL</span></td>
                <td className="p-3">
                  <button onClick={() => handleDelete(u.id)} title="Excluir Acesso" className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/20">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}