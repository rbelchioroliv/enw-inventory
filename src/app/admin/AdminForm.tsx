"use client";

import { useState, useRef } from "react";
import { addEquipment } from "../actions";
import { AlertTriangle, X } from "lucide-react";

export default function AdminForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  
  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await addEquipment(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error); 
    } else if (result?.success) {
      formRef.current?.reset(); 
      setError(null);
    }
  }

  return (
    <div className="bg-enwDarkGray border border-enwGold/20 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-enwGold mb-6">Cadastrar Novo Equipamento</h2>
      
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        
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

        {/* Bloco de Especificações Técnicas */}
        <div className="border border-white/10 p-5 rounded-lg bg-enwBlack/40 space-y-4">
          <h3 className="text-sm font-bold text-enwGold uppercase tracking-wider border-b border-white/5 pb-2">Especificações Técnicas</h3>
          
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

        <button type="submit" disabled={loading} className="w-full bg-enwGold text-enwBlack font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "A Guardar Máquina..." : "Salvar Equipamento"}
        </button>
      </form>

      {/* ================= MODAL DE ERRO ================= */}
      {error && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setError(null)}>
          <div className="bg-enwDarkGray border border-red-500/50 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setError(null)} className="absolute top-4 right-4 p-2 bg-enwBlack border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all">
              <X size={20} />
            </button>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-950/50 border border-red-500/30 rounded-full text-red-500">
                <AlertTriangle size={40} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Atenção!</h2>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">{error}</p>
            <button type="button" onClick={() => setError(null)} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition shadow-lg">
              Entendi, vou verificar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}