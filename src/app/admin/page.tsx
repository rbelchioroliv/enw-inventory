import { getEquipments, deleteEquipment, addRepair } from "../actions";
import { Trash2, Wrench } from "lucide-react";
import AdminForm from "./AdminForm";

export default async function AdminPage() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-8">
      
      {/* O Componente do Formulário Client-Side (Com Modal de Erro) */}
      <AdminForm />

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
                <td className="p-3">
                  <span className="px-2 py-1 bg-enw text-enwGold border border-white/10 rounded text-xs">{eq.empresa}</span>
                </td>
                <td className="p-3 text-enwGold">{eq.usuarioAtual}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${eq.numeroReparos > 0 ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                    {eq.numeroReparos}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
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
            {equipamentos.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Nenhum equipamento cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}