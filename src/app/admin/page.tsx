import { addEquipment, getEquipments, deleteEquipment, addRepair } from "../actions";
import { Trash2, Wrench } from "lucide-react";

export default async function AdminPage() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-8">
      
      {/* SEÇÃO DO FORMULÁRIO */}
      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-enwGold mb-6">Cadastrar Novo Equipamento</h2>
        
        <form action={addEquipment} className="space-y-6">
          
          {/* Dados Gerais do Equipamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select name="empresa" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
              <option value="ENW">ENW</option>
              <option value="DOGMA">DOGMA</option>
            </select>
            <input type="text" name="patrimonio" placeholder="Patrimônio (Ex: ENW-001)" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="text" name="numeroSerie" placeholder="Serial Number (Opcional)" className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="text" name="macAddress" placeholder="MAC Address" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="text" name="modelo" placeholder="Modelo (Ex: Dell Latitude)" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="number" name="idadeHardware" placeholder="Anos de uso (Ex: 2)" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="text" name="usuarioAtual" placeholder="Nome do Usuário" required className="bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
            <input type="email" name="emailCorporativo" placeholder="E-mail Corporativo" required className="md:col-span-2 lg:col-span-2 bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
          </div>

          {/* Bloco de Especificações Técnicas (Substitui o Configs antigo) */}
          <div className="border border-white/10 p-5 rounded-lg bg-enwBlack/40 space-y-4">
            <h3 className="text-sm font-bold text-enwGold uppercase tracking-wider border-b border-white/5 pb-2">
              Especificações Técnicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Processador (CPU)</label>
                <input type="text" name="cpu" placeholder="Ex: Intel Core i5-12400" required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Memória RAM</label>
                <input type="text" name="ram" placeholder="Ex: 16GB DDR4" required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Armazenamento</label>
                <select name="storageType" className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
                  <option value="SSD">SSD</option>
                  <option value="HD">HD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Interface (Se HD, será SATA)</label>
                <select name="storageInterface" className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition">
                  <option value="NVMe">NVMe</option>
                  <option value="SATA">SATA</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Capacidade</label>
                <input type="text" name="storageCapacity" placeholder="Ex: 512GB" required className="w-full bg-enwBlack border border-gray-700 text-white p-2.5 rounded focus:border-enwGold outline-none transition" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-enwGold text-enwBlack font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg mt-2">
            Salvar Equipamento
          </button>
        </form>
      </div>

      {/* SEÇÃO DA TABELA (Mantida como estava) */}
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
                  <span className="px-2 py-1 bg-enwBlack text-enwGold border border-white/10 rounded text-xs">{eq.empresa}</span>
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