import { getEquipments } from "./actions";
import { AlertTriangle, Laptop, Wrench } from "lucide-react";

export default async function Home() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-enwGold border-b border-enwGold/20 pb-2">Inventário Geral de Equipamentos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipamentos.map((eq) => (
          <div key={eq.id} className={`p-5 rounded-xl border ${eq.alertaTroca ? 'border-red-500/50 bg-red-950/20' : 'border-enwGold/20 bg-enwDarkGray'} shadow-lg relative flex flex-col`}>
            {eq.alertaTroca && (
              <span className="absolute top-4 right-4 text-red-500 flex items-center gap-1 text-xs font-bold bg-red-500/10 px-2 py-1 rounded">
                <AlertTriangle size={14} /> TROCA RECOMENDADA
              </span>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-enwBlack rounded-lg border border-enwGold/30 text-enwGold">
                <Laptop size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{eq.modelo}</h3>
                <span className="text-xs px-2 py-1 bg-enwGold text-enwBlack font-bold rounded">
                  {eq.empresa}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400 flex-grow">
              <p><strong className="text-gray-200">Usuário:</strong> {eq.usuarioAtual} ({eq.emailCorporativo})</p>
              <p><strong className="text-gray-200">Patrimônio:</strong> {eq.patrimonio}</p>
              <p><strong className="text-gray-200">SN / MAC:</strong> {eq.numeroSerie} / {eq.macAddress}</p>
              <p><strong className="text-gray-200">Configs:</strong> {eq.configuracoes}</p>
              <p><strong className="text-gray-200">Idade:</strong> {eq.idadeHardware} anos</p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-enwGold">
              <Wrench size={16} /> Reparos Realizados: <span className="font-bold text-white">{eq.numeroReparos}</span>
            </div>
          </div>
        ))}
        {equipamentos.length === 0 && <p className="text-gray-500">Nenhum equipamento cadastrado ainda.</p>}
      </div>
    </div>
  );
}