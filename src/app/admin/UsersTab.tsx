"use client";

import { useState, useRef } from "react";
import { addUser, deleteUser, editUser } from "../user-actions";
import { Trash2, User, Mail, ShieldCheck, AlertTriangle, Pencil, X } from "lucide-react";

export default function UsersTab({ users, currentUserEmail }: { users: any[], currentUserEmail?: string | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await addUser(formData);
    setLoading(false);
    if (res?.error) setError(res.error);
    else { setError(null); formRef.current?.reset(); }
  }

  async function handleEditSubmit(formData: FormData) {
    setLoading(true);
    const res = await editUser(editingUser.id, formData);
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
      setEditingUser(null);
    }
  }


  async function handleDelete(id: string) {
    if(!confirm("Remover permanentemente este acesso?")) return;
    const res = await deleteUser(id, currentUserEmail);
    if (res?.error) setError(res.error);
  }

  const isCurrentUser = editingUser?.email === currentUserEmail;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-enwGold mb-6 flex items-center gap-2">
          <ShieldCheck size={24} /> Conceder Acesso Administrador
        </h2>
        
        {error && !editingUser && (
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
              <th className="p-3 font-semibold rounded-tr-lg w-24">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-800 hover:bg-enwBlack/80 transition">
                <td className="p-3 text-white font-medium flex items-center gap-2"><User size={16} className="text-enwGold"/> {u.name}</td>
                <td className="p-3 text-gray-300"><div className="flex items-center gap-2"><Mail size={14} className="text-gray-500"/> {u.email}</div></td>
                <td className="p-3"><span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded">TOTAL</span></td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => { setEditingUser(u); setError(null); }} title="Editar Utilizador" className="p-2 bg-yellow-500/10 text-yellow-400 rounded hover:bg-yellow-500/30 transition border border-yellow-500/20">
                    <Pencil size={16} />
                  </button>
                  
                  {/* LÓGICA DE BLOQUEIO DE EXCLUSÃO */}
                  {u.email === currentUserEmail ? (
                    <button disabled title="Você não pode excluir o seu próprio perfil" className="p-2 bg-gray-500/10 text-gray-600 rounded cursor-not-allowed border border-gray-500/20">
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <button onClick={() => handleDelete(u.id)} title="Excluir Acesso" className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/20">
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL DE EDIÇÃO ================= */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setEditingUser(null)}>
          <div className="bg-enwDarkGray border border-enwGold/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEditingUser(null)} className="absolute top-4 right-4 p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-enwGold mb-6 flex items-center gap-2">
              <Pencil size={24} /> Editar Perfil
            </h2>

            {error && (
              <div className="bg-red-950/50 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6">
                <AlertTriangle size={20} className="shrink-0"/> <p className="text-sm">{error}</p>
              </div>
            )}

            <form action={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Nome Completo</label>
                <input type="text" name="name" defaultValue={editingUser.name} required className="w-full bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">E-mail de Acesso</label>
                <input type="email" name="email" defaultValue={editingUser.email} required className="w-full bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
              </div>

              {isCurrentUser ? (
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-xs font-bold text-enwGold uppercase mb-3">Alterar Senha</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 ml-1">Senha Antiga</label>
                      <input type="password" name="oldPassword" placeholder="Obrigatório se for mudar a senha" className="w-full bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 ml-1">Nova Senha</label>
                      <input type="password" name="password" placeholder="Deixe em branco para manter a atual" className="w-full bg-enwBlack border border-gray-700 text-white p-3 rounded-lg focus:border-enwGold outline-none transition" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-xs text-gray-500 italic text-center">
                    Por motivos de segurança, você só pode redefinir a senha do seu próprio perfil.
                  </p>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-enwGold text-enwBlack font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg mt-4 disabled:opacity-50">
                {loading ? "A Guardar..." : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}