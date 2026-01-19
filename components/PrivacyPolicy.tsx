
import React from 'react';
import AdBanner from './AdBanner';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-slide-up">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-stone-400 hover:text-[#1A3C34] transition-all font-black text-xs uppercase tracking-widest">
        <i className="fa-solid fa-arrow-left"></i> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-stone-100 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1A3C34] to-[#D2691E]"></div>
        
        <header className="mb-16 text-center">
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em] mb-4 block">Conformidade e Transparência</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A3C34] tracking-tighter mb-6">Política de Privacidade</h1>
          <p className="text-stone-400 font-medium italic text-lg">Nosso compromisso em proteger sua pegada digital e seus direitos de dados.</p>
        </header>

        <div className="space-y-12 text-stone-600 leading-relaxed text-lg">
          <section className="prose prose-stone prose-lg max-w-none">
            <p>A sua privacidade é de suma importância para o <strong>Saúde com Sabor</strong>. É nossa política respeitar e proteger qualquer informação que possamos coletar em nosso portal.</p>
          </section>

          <section className="bg-stone-50 p-8 md:p-12 rounded-[2.5rem] border border-stone-100">
            <h2 className="text-2xl font-black text-[#1A3C34] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2691E]">
                <i className="fa-solid fa-cookie-bite"></i>
              </span>
              Google AdSense e Cookies DART
            </h2>
            <p className="mb-6">O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios neste site. O uso do **cookie DART** pelo Google permite que ele exiba anúncios aos usuários com base em suas visitas a este e a outros sites na Internet.</p>
            <div className="space-y-4">
              <p className="font-bold text-stone-800">Diretrizes de Terceiros:</p>
              <ul className="list-disc pl-6 space-y-4 text-base">
                <li>Fornecedores terceiros, incluindo o Google, utilizam cookies para exibir anúncios com base em visitas anteriores do usuário ao seu website ou a outros websites.</li>
                <li>O uso de cookies de publicidade pelo Google permite que ele e seus parceiros exibam anúncios aos seus usuários com base nas visitas aos seus sites e/ou a outros sites na Internet.</li>
                <li>Os usuários podem optar por desativar a publicidade personalizada visitando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#D2691E] font-black underline">Configurações de Anúncios do Google</a>.</li>
              </ul>
            </div>
          </section>

          <AdBanner />

          <section>
            <h2 className="text-2xl font-black text-[#1A3C34] mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1A3C34]">
                <i className="fa-solid fa-shield-halved"></i>
              </span>
              Transparência na Coleta de Dados
            </h2>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para fornecer um serviço (como newsletters). Coletamos por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como os dados serão usados.</p>
          </section>

          <section className="bg-[#1A3C34] text-white p-10 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-xl font-black mb-4 uppercase tracking-widest text-[#D2691E]">Conformidade Global (LGPD/GDPR)</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-0">
              Estamos totalmente comprometidos com os padrões internacionais de proteção de dados. Você tem o direito de solicitar a exclusão de seus dados a qualquer momento através do nosso canal oficial de contato.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-stone-100 text-center text-stone-400 text-xs font-bold uppercase tracking-widest">
          Última atualização: Janeiro de 2025
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
