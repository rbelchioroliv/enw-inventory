"use client";

import { useState } from "react";
import { Trash2, Wrench, Pencil, X, AlertTriangle } from "lucide-react";
import { deleteEquipment, addRepair, editEquipment } from "../actions";

export default function AdminTable({ equipamentos }: { equipamentos: any[] }) {
  const [editingEq, setEditingEq] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  let defaultCpu = "";
  let defaultRam = "";
  let defaultStorageType = "SSD";
  let defaultStorageInterface = "NVMe";
  let defaultStorageCapacity = "";

  if (editingEq?.configuracoes) {
    const parts = editingEq.configuracoes.split(" | ");
    if (parts.length === 3) {
      defaultCpu = parts[0].replace("CPU: ", "");
      defaultRam = parts[1].replace("RAM: ", "");
      const storageParts = parts[2].split(" ");
      if (storageParts.length >= 3) {
        defaultStorageType = storageParts[0];
        defaultStorageInterface = storageParts[1];
        defaultStorageCapacity = storageParts.slice(2).join(" ");
      }
    }
  }

  async function handleEditSubmit(formData: FormData) {
    setLoading(true);
    const result = await editEquipment(editingEq.id, formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setEditingEq(null); 
      setError(null);
    }
  }

  return (
    <>
      {/* SEÇÃO DA TABELA */}
      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl overflow-x-auto shadow-xl">
        <h2 className="text-xl font-bold text-enwGold mb-4">Gerenciamento Rápido</h2>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 bg-enwBlack/50">
              <th className="p-3 font-semibold rounded-tl-lg">Patrimônio</th>
              <th className="p-3 font-semibold">Empresa</th>
              <th className="p-3 font-semibold">Usuário</th>
              <th className="p-3 font-semibold">Reparos</th>
              <th className="p-3 font-semibold rounded-tr-lg">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map((eq) => (
              <tr key={eq.id} className="border-b border-gray-800 hover:bg-enwBlack/80 transition">
                <td className="p-3 font-mono text-enwGold">{eq.patrimonio}</td>
                <td className="p-3"><span className="px-2 py-1 bg-enwBlack text-enwGold border border-white/10 rounded text-xs">{eq.empresa}</span></td>
                <td className="p-3 text-enwGold">{eq.usuarioAtual}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${eq.numeroReparos > 0 ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                    {eq.numeroReparos}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button type="button" onClick={() => setEditingEq(eq)} title="Editar Equipamento" className="p-2 bg-yellow-500/10 text-yellow-400 rounded hover:bg-yellow-500/30 transition border border-yellow-500/20">
                    <Pencil size={16} />
                  </button>
                  <form action={addRepair.bind(null, eq.id)}>
                    <button type="submit" title="Adicionar Reparo" className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/30 transition border border-blue-500/20">
                      <Wrench size={16} />
                    </button>
                  </form>
                  <form action={deleteEquipment.bind(null, eq.id)}>
                    <button type="submit" title="Excluir Equipamento" className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/20">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDIÇÃO */}
      {editingEq && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setEditingEq(null)}>
          <div className="bg-enwDarkGray border border-enwGold/30 rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEditingEq(null)} className="absolute top-4 right-4 p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-enwGold mb-6 flex items-center gap-2">
              <Pencil size={24} /> Editando: {editingEq.modelo}
            </h2>

            <form action={handleEditSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-950/50 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-center gap-3">
                  <AlertTriangle size={20} className="shrink-0"/> <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <select name="empresa" defaultValue={editingEq.empresa} required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
                  <option value="ENW">ENW</option>
                  <option value="DOGMA">DOGMA</option>
                </select>
                <input type="text" name="patrimonio" defaultValue={editingEq.patrimonio} required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                <input type="text" name="numeroSerie" defaultValue={editingEq.numeroSerie || ""} placeholder="S/N (Opcional)" className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                <input type="text" name="macAddress" defaultValue={editingEq.macAddress} required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                <input type="text" name="modelo" defaultValue={editingEq.modelo} required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                
                {/* CAMPO: IDADE HARDWARE */}
                <input type="number" name="idadeHardware" defaultValue={editingEq.idadeHardware} placeholder="Anos de uso" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" title="Idade do Hardware (Anos)" />
                
                {/* NOVO CAMPO: NÚMERO DE REPAROS */}
                <input type="number" name="numeroReparos" defaultValue={editingEq.numeroReparos} placeholder="Nº de Reparos" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" title="Número de Reparos" />
                
                <input type="text" name="usuarioAtual" defaultValue={editingEq.usuarioAtual} required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                <input type="email" name="emailCorporativo" defaultValue={editingEq.emailCorporativo} required className="md:col-span-2 lg:col-span-4 bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
              </div>

              <div className="border border-white/10 p-5 rounded-lg bg-enwBlack/40 space-y-4">
                <h3 className="text-sm font-bold text-enwGold uppercase tracking-wider border-b border-white/5 pb-2">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Processador (CPU)</label>
                    <input type="text" name="cpu" defaultValue={defaultCpu} required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Memória RAM</label>
                    <input type="text" name="ram" defaultValue={defaultRam} required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Armazenamento</label>
                    <select name="storageType" defaultValue={defaultStorageType} className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
                      <option value="SSD">SSD</option>
                      <option value="HD">HD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Interface</label>
                    <select name="storageInterface" defaultValue={defaultStorageInterface} className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
                      <option value="NVMe">NVMe</option>
                      <option value="SATA">SATA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Capacidade</label>
                    <input type="text" name="storageCapacity" defaultValue={defaultStorageCapacity} required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-enwGold text-enwBlack font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg mt-2 disabled:opacity-50">
                {loading ? "A Atualizar..." : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}