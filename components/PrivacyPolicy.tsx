
import React from 'react';
import AdBanner from './AdBanner';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-all font-black text-xs uppercase tracking-widest">
        <i className="fa-solid fa-arrow-left"></i> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-stone-100 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3b82f6] to-[#ef4444]"></div>
        
        <header className="mb-16 text-center">
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em] mb-4 block">Segurança e Transparência</span>
          <h1 className="text-5xl md:text-6xl font-black text-stone-800 tracking-tighter mb-6">Política de Privacidade</h1>
          <p className="text-stone-400 font-medium italic text-lg">Nosso compromisso com a proteção dos seus dados pessoais.</p>
        </header>

        <div className="space-y-12 text-stone-600 leading-relaxed text-lg">
          <section className="prose prose-stone prose-lg max-w-none">
            <p>A sua privacidade é de extrema importância para o <strong>Saúde com Sabor</strong>. É nossa política respeitar e proteger qualquer informação que possamos coletar em nosso portal.</p>
          </section>

          <section className="bg-stone-50 p-8 md:p-12 rounded-[2.5rem] border border-stone-100">
            <h2 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#3b82f6]">
                <i className="fa-solid fa-cookie-bite"></i>
              </span>
              Google AdSense e Cookies
            </h2>
            <p className="mb-6">O Google, como fornecedor de publicidade de terceiros, utiliza cookies para veicular anúncios neste site. O uso do cookie **DART** permite que o Google exiba anúncios baseados nas visitas que você faz a este e a outros sites na Internet.</p>
            <div className="space-y-4">
              <p className="font-bold text-stone-800">Diretrizes de Terceiros:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>Fornecedores terceiros, incluindo o Google, utilizam cookies para veicular anúncios com base em visitas anteriores dos usuários.</li>
                <li>O uso de cookies de publicidade permite ao Google e aos seus parceiros veicular anúncios com base nas visitas feitas a este ou a outros sites.</li>
                <li>Os usuários podem desativar a publicidade personalizada visitando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-black underline">Configurações de Anúncios do Google</a>.</li>
              </ul>
            </div>
          </section>

          <AdBanner />

          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                <i className="fa-solid fa-shield-halved"></i>
              </span>
              Coleta de Dados
            </h2>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (como newsletters). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como as informações serão usadas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#ef4444]">
                <i className="fa-solid fa-handshake"></i>
              </span>
              Compartilhamento com Terceiros
            </h2>
            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. Nosso site pode conter links para sites externos que não são operados por nós, portanto, não temos controle sobre seu conteúdo e políticas de privacidade.</p>
          </section>

          <section className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-xl font-black mb-4 uppercase tracking-widest text-[#3b82f6]">Conformidade LGPD</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-0">
              Estamos totalmente comprometidos com a Lei Geral de Proteção de Dados (LGPD). Você tem o direito de solicitar a exclusão de seus dados a qualquer momento através do nosso canal de contato oficial.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-stone-100 text-center text-stone-400 text-xs font-bold uppercase tracking-widest">
          Última atualização: Julho de 2024
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
