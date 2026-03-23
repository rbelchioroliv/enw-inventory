"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Laptop, Wrench, User, Hash, HardDrive, Calendar, Fingerprint, X, Mail, Cpu, SearchX } from "lucide-react";

export default function DashboardClient({ equipamentos }: { equipamentos: any[] }) {
  
  const [selectedEq, setSelectedEq] = useState<any | null>(null);

  
  const [filterUsuario, setFilterUsuario] = useState("");
  const [filterPatrimonio, setFilterPatrimonio] = useState("");
  const [filterSN, setFilterSN] = useState("");


  useEffect(() => {
    if (selectedEq) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEq]);

  
  const filteredEquipamentos = equipamentos.filter((eq) => {
    const matchUsuario = eq.usuarioAtual.toLowerCase().includes(filterUsuario.toLowerCase());
    const matchPatrimonio = eq.patrimonio.toLowerCase().includes(filterPatrimonio.toLowerCase());
    const matchSN = filterSN === "" || (eq.numeroSerie && eq.numeroSerie.toLowerCase().includes(filterSN.toLowerCase()));

    return matchUsuario && matchPatrimonio && matchSN;
  });

  
  const limparFiltros = () => {
    setFilterUsuario("");
    setFilterPatrimonio("");
    setFilterSN("");
  };

  return (
    <div className="space-y-6">
     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-enwGold/20 pb-4 gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
          Visão Geral do Inventário
        </h1>
        <div className="text-sm font-medium text-gray-200 bg-enwBlack px-4 py-2 rounded-full border border-enwGold/20 shadow-inner whitespace-nowrap">
          Exibindo: <span className="text-enwGold font-bold mx-1">{filteredEquipamentos.length}</span> 
          {equipamentos.length !== filteredEquipamentos.length && <span className="text-gray-500">de {equipamentos.length}</span>}
        </div>
      </div>

     
      <div className="bg-enwDarkGray/60 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4 shadow-sm backdrop-blur-sm">
        <div className="relative flex-1 group">
          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por Usuário..." 
            value={filterUsuario}
            onChange={(e) => setFilterUsuario(e.target.value)}
            className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-enwGold outline-none transition text-sm shadow-inner"
          />
        </div>
        <div className="relative flex-1 group">
          <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por Patrimônio..." 
            value={filterPatrimonio}
            onChange={(e) => setFilterPatrimonio(e.target.value)}
            className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-enwGold outline-none transition text-sm shadow-inner"
          />
        </div>
        <div className="relative flex-1 group">
          <Fingerprint size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por S/N..." 
            value={filterSN}
            onChange={(e) => setFilterSN(e.target.value)}
            className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-enwGold outline-none transition text-sm shadow-inner"
          />
        </div>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        {filteredEquipamentos.map((eq) => (
          <div 
            key={eq.id} 
            onClick={() => setSelectedEq(eq)} 
            className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-in fade-in zoom-in-95 ${
              eq.alertaTroca 
                ? 'border-red-500/30 bg-gradient-to-b from-red-950/30 to-enwDarkGray shadow-[0_0_15px_rgba(239,68,68,0.05)]' 
                : 'border-white/5 bg-enwDarkGray hover:border-enwGold/30 hover:bg-enwDarkGray/80'
            }`}
          >
            {eq.alertaTroca && (
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 text-xs font-bold text-red-50 bg-red-600 px-3 py-1.5 rounded-full shadow-lg shadow-red-900/50 animate-pulse z-10">
                <AlertTriangle size={14} /> 
                TROCA RECOMENDADA
              </div>
            )}
            
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
                  <p className="text-xs text-gray-300 truncate text-enwGold/80 hover:text-enwGold transition-colors" title="Clique para ver completo">Ver detalhes...</p>
                </div>
              </div>
            </div>

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

       
        {filteredEquipamentos.length === 0 && equipamentos.length > 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-enwBlack/30 animate-in fade-in">
            <div className="p-4 bg-enwDarkGray rounded-full mb-4 border border-white/5 text-gray-500">
              <SearchX size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">Nenhum equipamento encontrado</h3>
            <p className="text-white text-sm mb-4">Tente procurar com outros termos ou limpe os filtros.</p>
            <button onClick={limparFiltros} className="px-4 py-2 bg-enwGold/10 text-enwGold border border-enwGold/20 rounded-lg hover:bg-enwGold hover:text-enwBlack font-semibold transition-colors text-sm">
              Limpar Filtros
            </button>
          </div>
        )}

    
        {equipamentos.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-enwBlack/30">
            <h3 className="text-xl font-bold text-gray-300">Nenhum equipamento cadastrado</h3>
          </div>
        )}
      </div>

    
      {selectedEq && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEq(null)}>
          <div className="bg-enwDarkGray border border-enwGold/30 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedEq(null)} className="absolute top-4 right-4 p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all">
              <X size={20} />
            </button>

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