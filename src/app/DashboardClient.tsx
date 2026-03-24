"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Laptop, Wrench, User, Hash, HardDrive, Calendar, Fingerprint, X, Mail, Cpu, SearchX, Download } from "lucide-react";
import { exportToExcel } from "@/lib/exportExcel";

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
    <div className="space-y-6 max-w-full overflow-hidden px-2 sm:px-0">
      
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-enwGold/20 pb-4 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm text-center lg:text-left">
          Visão Geral do <span className="text-enwGold">Inventário</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-auto text-xs sm:text-sm font-medium text-gray-200 bg-enwBlack px-4 py-3 sm:py-2.5 rounded-lg border border-enwGold/20 shadow-inner text-center">
            Exibindo: <span className="text-enwGold font-bold mx-1">{filteredEquipamentos.length}</span> 
            {equipamentos.length !== filteredEquipamentos.length && <span className="text-gray-500">de {equipamentos.length}</span>}
          </div>
          
          <button 
            onClick={() => exportToExcel(filteredEquipamentos)} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
          >
            <Download size={18} /> Exportar Excel
          </button>
        </div>
      </div>

    
      <div className="bg-enwDarkGray/60 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-3 shadow-sm backdrop-blur-sm">
        <div className="relative flex-1 group">
          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input type="text" placeholder="Usuário..." value={filterUsuario} onChange={(e) => setFilterUsuario(e.target.value)} className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-enwGold outline-none text-sm" />
        </div>
        <div className="relative flex-1 group">
          <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input type="text" placeholder="Patrimônio..." value={filterPatrimonio} onChange={(e) => setFilterPatrimonio(e.target.value)} className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-enwGold outline-none text-sm" />
        </div>
        <div className="relative flex-1 group">
          <Fingerprint size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-enwGold transition-colors" />
          <input type="text" placeholder="Serial Number..." value={filterSN} onChange={(e) => setFilterSN(e.target.value)} className="w-full bg-enwBlack border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-enwGold outline-none text-sm" />
        </div>
      </div>
      
   
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pt-2">
        {filteredEquipamentos.map((eq) => (
          <div key={eq.id} onClick={() => setSelectedEq(eq)} className={`relative flex flex-col p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${eq.alertaTroca ? 'border-red-500/30 bg-gradient-to-b from-red-950/30 to-enwDarkGray' : 'border-white/5 bg-enwDarkGray hover:border-enwGold/30'}`}>
            {eq.alertaTroca && (
              <div className="absolute -top-3 -right-2 flex items-center gap-1 text-[10px] sm:text-xs font-bold text-red-50 bg-red-600 px-2 sm:px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                <AlertTriangle size={12} /> TROCA SUGERIDA
              </div>
            )}
            
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className={`p-2.5 sm:p-3.5 rounded-xl border shrink-0 ${eq.alertaTroca ? 'bg-red-950/50 border-red-500/20 text-red-400' : 'bg-enwBlack border-enwGold/20 text-enwGold shadow-inner'}`}>
                <Laptop size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-white truncate">{eq.modelo}</h3>
                <div className="inline-flex mt-1 px-2 py-0.5 bg-enwGold/10 border border-enwGold/20 text-enwGold text-[10px] sm:text-xs font-bold rounded-md uppercase">
                  {eq.empresa}
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-3 bg-enwBlack/40 p-4 rounded-xl border border-white/5">
              <div className="flex items-start gap-2">
                <User size={14} className="text-gray-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mb-0.5">Usuário Atribuído</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-200 truncate">{eq.usuarioAtual}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mb-0.5"><Hash size={10} className="inline mr-1"/> Patrimônio</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-300 truncate">{eq.patrimonio}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mb-0.5"><HardDrive size={10} className="inline mr-1"/> Configs</p>
                  <p className="text-xs text-enwGold/80 truncate">Detalhes...</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Wrench size={12} className={eq.numeroReparos > 0 ? 'text-orange-400' : 'text-green-400'} />
                <span>Reparos: <strong className={eq.numeroReparos > 0 ? 'text-orange-400' : 'text-green-400'}>{eq.numeroReparos}</strong></span>
              </div>
              <div className={`h-2 w-2 rounded-full ${eq.idadeHardware >= 4 ? 'bg-red-500' : eq.idadeHardware >= 3 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
            </div>
          </div>
        ))}
      </div>

      {selectedEq && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEq(null)}>
          <div className="bg-enwDarkGray border border-enwGold/30 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto no-scrollbar shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedEq(null)} className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 transition-all">
              <X size={18} />
            </button>

            <div className="mb-6 pr-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl border shrink-0 ${selectedEq.alertaTroca ? 'bg-red-950/50 border-red-500/30 text-red-400' : 'bg-enwBlack border-enwGold/30 text-enwGold'}`}>
                  <Laptop size={24} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-0.5 truncate">{selectedEq.modelo}</h2>
                  <span className="px-2 py-0.5 bg-enwGold/10 border border-enwGold/20 text-enwGold text-[10px] sm:text-xs font-bold rounded uppercase">
                    {selectedEq.empresa}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-enwBlack/50 p-4 rounded-xl border border-white/5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  <User size={14} className="text-enwGold"/> Utilizador
                </h3>
                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Nome</p>
                    <p className="text-sm text-white font-medium break-words">{selectedEq.usuarioAtual}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">E-mail</p>
                    <p className="text-sm text-white font-medium break-all">{selectedEq.emailCorporativo}</p>
                  </div>
                </div>
              </div>

              <div className="bg-enwBlack/50 p-4 rounded-xl border border-white/5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-enwGold"/> Especificações
                </h3>
                <div className="space-y-4">
                  <div className="bg-enwBlack border border-white/5 p-3 rounded-lg">
                    <p className="text-sm sm:text-base text-enwGold font-medium break-words leading-relaxed">
                      {selectedEq.configuracoes}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-0.5">Idade</p>
                      <p className="text-sm text-white font-medium">{selectedEq.idadeHardware} anos</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-0.5">Reparos</p>
                      <p className="text-sm text-white font-medium">{selectedEq.numeroReparos}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-enwBlack/50 p-4 rounded-xl border border-white/5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  <Hash size={14} className="text-enwGold"/> Identificadores
                </h3>
                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Patrimônio</p>
                    <p className="text-sm text-white font-mono bg-white/5 px-2 py-0.5 rounded inline-block">{selectedEq.patrimonio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Serial Number</p>
                    <p className="text-xs sm:text-sm text-gray-300 font-mono break-all">{selectedEq.numeroSerie || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">MAC Address</p>
                    <p className="text-xs sm:text-sm text-gray-300 font-mono break-all">{selectedEq.macAddress}</p>
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