"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Laptop, Wrench, User, Hash, HardDrive, Calendar, Fingerprint, X, Mail, Cpu } from "lucide-react";

export default function DashboardClient({ equipamentos }: { equipamentos: any[] }) {
 
  const [selectedEq, setSelectedEq] = useState<any | null>(null);

  
  useEffect(() => {
    if (selectedEq) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEq]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between border-b border-enwGold/20 pb-4">
        <h1 className="text-3xl font-extrabold text-enwGray tracking-tight drop-shadow-sm">
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
            onClick={() => setSelectedEq(eq)}
            className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              eq.alertaTroca 
                ? 'border-red-500/30 bg-gradient-to-b from-red-950/30 to-enwDarkGray shadow-[0_0_15px_rgba(239,68,68,0.05)]' 
                : 'border-white/5 bg-enwDarkGray hover:border-enwGold/30 hover:bg-enwDarkGray/80'
            }`}
          >
            {/* Etiqueta de Alerta */}
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
                <h3 className="font-bold text-xl text-white truncate">{eq.modelo}</h3>
                <div className="inline-flex mt-1.5 px-2.5 py-0.5 bg-enwGold/10 border border-enwGold/20 text-enwGold text-xs font-bold rounded-md uppercase tracking-wider">
                  {eq.empresa}
                </div>
              </div>
            </div>

            {/* Bloco de Informações Técnicas (Resumo) */}
            <div className="flex-grow space-y-4 bg-enwBlack/40 p-5 rounded-xl border border-white/5">
              <div className="flex items-start gap-3">
                <User size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Usuário Atribuído</p>
                  <p className="text-sm font-medium text-gray-200 truncate">{eq.usuarioAtual}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1"><Hash size={12}/> Patrimônio</p>
                  <p className="text-sm font-medium text-gray-300 truncate">{eq.patrimonio}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1"><HardDrive size={12}/> Configs</p>
                  <p className="text-xs text-gray-300 truncate" title="Clique para ver completo">Ver detalhes...</p>
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
              <div className={`h-2.5 w-2.5 rounded-full ${eq.idadeHardware >= 4 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : eq.idadeHardware >= 3 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}></div>
            </div>
          </div>
        ))}

        {equipamentos.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-enwBlack/30">
            <h3 className="text-xl font-bold text-gray-300">Nenhum equipamento cadastrado</h3>
          </div>
        )}
      </div>

      {/* ======================= MODAL ======================= */}
      {selectedEq && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedEq(null)} 
        >
          <div 
            className="bg-enwDarkGray border border-enwGold/30 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()} 
          >
            {/* Botão Fechar */}
            <button 
              onClick={() => setSelectedEq(null)} 
              className="absolute top-4 right-4 p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho do Modal */}
            <div className="mb-8 pr-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl border ${selectedEq.alertaTroca ? 'bg-red-950/50 border-red-500/30 text-red-400' : 'bg-enwBlack border-enwGold/30 text-enwGold'}`}>
                  <Laptop size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedEq.modelo}</h2>
                  <span className="px-3 py-1 bg-enwGold/10 border border-enwGold/20 text-enwGold text-xs font-bold rounded-md uppercase tracking-wider">
                    {selectedEq.empresa}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Info de Usuário */}
              <div className="bg-enwBlack/50 p-5 rounded-xl border border-white/5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={16} className="text-enwGold"/> Informações de Usuário
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nome Completo</p>
                    <p className="text-white font-medium">{selectedEq.usuarioAtual}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">E-mail Corporativo</p>
                    <p className="text-white font-medium flex items-center gap-2 break-all">
                      <Mail size={14} className="text-gray-500 shrink-0"/> {selectedEq.emailCorporativo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detalhes */}
              <div className="bg-enwBlack/50 p-5 rounded-xl border border-white/5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu size={16} className="text-enwGold"/> Especificações Técnicas
                </h3>
                <div className="space-y-5">
                  <div className="bg-enwBlack border border-white/5 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Configuração de Hardware</p>
                    
                    <p className="text-enwGold font-medium break-words leading-relaxed text-lg">
                      {selectedEq.configuracoes}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tempo de Uso</p>
                      <p className="text-white font-medium">
                        {selectedEq.idadeHardware} anos 
                        {selectedEq.alertaTroca && <span className="text-red-400 text-xs ml-2 font-bold block md:inline mt-1 md:mt-0">(Troca Recomendada)</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Reparos Realizados</p>
                      <p className="text-white font-medium">{selectedEq.numeroReparos}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identificadores */}
              <div className="bg-enwBlack/50 p-5 rounded-xl border border-white/5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Hash size={16} className="text-enwGold"/> Identificadores de Rede e Físico
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Patrimônio</p>
                    <p className="text-white font-mono font-bold bg-white/5 px-2 py-1 rounded inline-block">{selectedEq.patrimonio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Serial Number (S/N)</p>
                    <p className="text-gray-300 font-mono break-all">{selectedEq.numeroSerie || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">MAC Address</p>
                    <p className="text-gray-300 font-mono break-all">{selectedEq.macAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}