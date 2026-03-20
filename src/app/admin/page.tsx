import { addEquipment, getEquipments, deleteEquipment, addRepair } from "../actions";
import { Trash2, Wrench } from "lucide-react";

export default async function AdminPage() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-8">
      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-enwGold mb-4">Cadastrar Novo Equipamento</h2>
        <form action={addEquipment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select name="empresa" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none">
            <option value="ENW">ENW</option>
            <option value="DOGMA">DOGMA</option>
          </select>
          <input type="text" name="patrimonio" placeholder="Patrimônio (Ex: ENW-001)" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="text" name="numeroSerie" placeholder="Serial Number" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="text" name="macAddress" placeholder="MAC Address" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="text" name="modelo" placeholder="Modelo (Ex: Dell Latitude)" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="text" name="configuracoes" placeholder="Configs (i5, 16GB, 256SSD)" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="number" name="idadeHardware" placeholder="Anos de uso (Ex: 2)" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="text" name="usuarioAtual" placeholder="Nome do Usuário" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          <input type="email" name="emailCorporativo" placeholder="E-mail Corporativo" required className="bg-enwBlack border border-gray-700 text-white p-2 rounded focus:border-enwGold outline-none" />
          
          <button type="submit" className="md:col-span-2 lg:col-span-3 bg-enwGold text-enwBlack font-bold py-2 rounded hover:bg-yellow-400 transition mt-2">
            Salvar Equipamento
          </button>
        </form>
      </div>

      <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl overflow-x-auto">
        <h2 className="text-xl font-bold text-enwGold mb-4">Gerenciamento Rápido</h2>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-2">Patrimônio</th>
              <th className="p-2">Empresa</th>
              <th className="p-2">Usuário</th>
              <th className="p-2">Reparos</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map((eq) => (
              <tr key={eq.id} className="border-b border-gray-800 hover:bg-enwBlack transition">
                <td className="p-2 font-mono text-enwGold">{eq.patrimonio}</td>
                <td className="p-2">{eq.empresa}</td>
                <td className="p-2">{eq.usuarioAtual}</td>
                <td className="p-2">{eq.numeroReparos}</td>
                <td className="p-2 flex gap-2">
                  <form action={addRepair.bind(null, eq.id)}>
                    <button type="submit" title="Adicionar Reparo" className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40 transition">
                      <Wrench size={16} />
                    </button>
                  </form>
                  <form action={deleteEquipment.bind(null, eq.id)}>
                    <button type="submit" title="Excluir Equipamento" className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}