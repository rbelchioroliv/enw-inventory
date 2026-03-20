import { getEquipments } from "./actions";
import { AlertTriangle, Laptop, Wrench, User, Hash, HardDrive, Calendar, Fingerprint } from "lucide-react";

export default async function Home() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-enwGold/20 pb-4">
        <h1 className="text-3xl font-extrabold text-enwBlack tracking-tight drop-shadow-sm">
          Visão Geral do Inventário
        </h1>
        <div className="text-sm font-medium text-gray-200 bg-enwBlack px-4 py-2 rounded-full border border-enwGold/20 shadow-inner">
          Total: <span className="text-enwGold font-bold ml-1">{equipamentos.length}</span>
        </div>
      </div>

      {/* Grelha de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {equipamentos.map((eq) => (
          <div
            key={eq.id}
            className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${eq.alertaTroca
              ? 'border-red-500/30 bg-gradient-to-b from-red-950/30 to-enwDarkGray shadow-[0_0_15px_rgba(239,68,68,0.05)]'
              : 'border-white/5 bg-enwDarkGray hover:border-enwGold/30 hover:bg-enwDarkGray/80'
              }`}
          >
            {/* Etiqueta de Alerta (Flutuante) */}
            {eq.alertaTroca && (
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 text-xs font-bold text-red-50 bg-red-600 px-3 py-1.5 rounded-full shadow-lg shadow-red-900/50 animate-pulse">
                <AlertTriangle size={14} />
                TROCA RECOMENDADA
              </div>
            )}

            {/* Cabeçalho do Cartão */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`p-3.5 rounded-xl border ${eq.alertaTroca ? 'bg-red-950/50 border-red-500/20 text-red-400' : 'bg-enwBlack border-enwGold/20 text-enwGold shadow-inner'}`}>
                <Laptop size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-white truncate" title={eq.modelo}>
                  {eq.modelo}
                </h3>
                <div className="inline-flex mt-1.5 px-2.5 py-0.5 bg-enwGold/10 border border-enwGold/20 text-enwGold text-xs font-bold rounded-md uppercase tracking-wider">
                  {eq.empresa}
                </div>
              </div>
            </div>

            {/* Bloco de Informações Técnicas */}
            <div className="flex-grow space-y-4 bg-enwBlack/40 p-5 rounded-xl border border-white/5">

              {/* Utilizador */}
              <div className="flex items-start gap-3">
                <User size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Usuário Atribuído</p>
                  <p className="text-sm font-medium text-gray-200 truncate">{eq.usuarioAtual}</p>
                  <p className="text-xs text-gray-400 truncate">{eq.emailCorporativo}</p>
                </div>
              </div>

              {/* Grelha de Dados (2 colunas) */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Hash size={12} /> Patrimônio
                  </p>
                  <p className="text-sm font-medium text-gray-300 truncate" title={eq.patrimonio}>{eq.patrimonio}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Calendar size={12} /> Idade
                  </p>
                  <p className="text-sm font-medium text-gray-300">{eq.idadeHardware} anos</p>
                </div>
              </div>

              {/* Grelha de Dados (2 colunas) */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Fingerprint size={12} /> SN / MAC
                  </p>
                  <p className="text-xs font-mono text-gray-400 truncate" title={eq.numeroSerie}>SN: {eq.numeroSerie}</p>
                  <p className="text-xs font-mono text-gray-400 truncate" title={eq.macAddress}>MAC: {eq.macAddress}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <HardDrive size={12} /> Configs
                  </p>
                  <p className="text-xs text-gray-300 line-clamp-2" title={eq.configuracoes}>{eq.configuracoes}</p>
                </div>
              </div>
            </div>

            {/* Rodapé do Cartão */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className={`p-1.5 rounded-md ${eq.numeroReparos > 0 ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                  <Wrench size={14} />
                </div>
                <span>Reparos: <strong className={eq.numeroReparos > 0 ? 'text-orange-400' : 'text-green-400'}>{eq.numeroReparos}</strong></span>
              </div>

              {/* Bolinha indicadora de estado baseada na idade */}
              <div
                className={`h-2.5 w-2.5 rounded-full ${eq.idadeHardware >= 4 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : eq.idadeHardware >= 3 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}
                title="Indicador de vida útil"
              ></div>
            </div>
          </div>
        ))}

        {/* Estado Vazio (Sem equipamentos) */}
        {equipamentos.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-enwBlack/30">
            <div className="p-4 bg-enwDarkGray rounded-full mb-4 border border-white/5">
              <Laptop size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">Nenhum equipamento cadastrado</h3>
            <p className="text-gray-500 max-w-md">Os equipamentos que adicionar no painel de administrador aparecerão aqui perfeitamente organizados.</p>
          </div>
        )}
      </div>
    </div>
  );
}