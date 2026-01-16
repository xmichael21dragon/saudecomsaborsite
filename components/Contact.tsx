
import React, { useState } from 'react';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <button onClick={onBack} className="mb-12 flex items-center gap-3 text-stone-400 hover:text-stone-800 transition-all font-black text-xs uppercase tracking-widest group">
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-stone-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ef4444]/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <header className="text-center mb-16 relative z-10">
          <span className="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.5em] mb-4 block">Fale Conosco</span>
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-6 leading-none uppercase">Atendimento ao <br/><span className="text-[#ef4444]">Leitor</span></h1>
          <p className="text-stone-400 font-medium italic text-lg">Dúvidas, parcerias ou sugestões? Estamos aqui para você.</p>
        </header>

        {status === 'success' ? (
          <div className="text-center py-20 animate-fade-in relative z-10">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 className="text-3xl font-black text-stone-800 mb-4">Mensagem Enviada!</h2>
            <p className="text-stone-500 font-medium italic mb-10">Nossa equipe retornará seu contato em até 48 horas úteis.</p>
            <button onClick={onBack} className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Retornar ao site</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-[#ef4444] text-xl flex-shrink-0 shadow-sm">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-black text-stone-800 uppercase tracking-widest text-[10px] mb-2">E-mail Direto</h4>
                  <p className="text-stone-600 font-bold">contato@saudecomsabor.com.br</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-[#3b82f6] text-xl flex-shrink-0 shadow-sm">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                  <h4 className="font-black text-stone-800 uppercase tracking-widest text-[10px] mb-2">Comercial</h4>
                  <p className="text-stone-600 font-bold">+55 (11) 99999-9999</p>
                </div>
              </div>
              <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100">
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-4">Horário de Resposta</p>
                <p className="text-sm text-stone-600 leading-relaxed font-medium italic">
                  Segunda a Sexta: 09h às 18h<br/>
                  Sábados: 10h às 14h
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Seu Nome</label>
                <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold text-stone-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">E-mail de Contato</label>
                <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold text-stone-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Assunto</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold text-stone-800 appearance-none">
                  <option>Dúvida sobre Receita</option>
                  <option>Parceria Comercial</option>
                  <option>Sugestão de Artigo</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Mensagem</label>
                <textarea required className="w-full px-6 py-4 rounded-3xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-medium text-stone-800 h-32 resize-none"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {status === 'sending' ? 'Processando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
