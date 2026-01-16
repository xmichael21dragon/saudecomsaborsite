
import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onEditorClick?: () => void;
  onTermsClick?: () => void;
  onViewChange?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onEditorClick, onTermsClick, onViewChange }) => {
  // Links oficiais e sociais atualizados
  const socialLinks = {
    instagram: "https://www.instagram.com/saudecomsaborr1/",
    facebook: "https://www.facebook.com/saudecomsabor",
    pinterest: "https://br.pinterest.com/saudecomsabor",
    github: "https://github.com/xmichael21dragon/SAUDECOMSABOR2"
  };

  return (
    <footer className="bg-white border-t border-stone-100 pt-16 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Social */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-stone-50 overflow-hidden p-2 group">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Logo />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-black tracking-tighter leading-none text-stone-800 uppercase">
                  Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
                </h2>
                <span className="text-[10px] font-black tracking-[0.2em] leading-none text-stone-400 mt-1 uppercase">Advanced Nutrition</span>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
              Sua fonte definitiva de gastronomia funcional e bem-estar. Unimos o prazer de comer com a ciência da longevidade.
            </p>
            <div className="flex gap-4">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Siga-nos no Instagram"
                className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Ver Código Fonte no GitHub"
                className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-stone-900 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <i className="fa-brands fa-github text-xl"></i>
              </a>
              <a 
                href={socialLinks.pinterest} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Veja nossas pastas no Pinterest"
                className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#ef4444] hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <i className="fa-brands fa-pinterest-p text-xl"></i>
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col md:items-center">
            <div className="w-full md:max-w-xs">
              <h4 className="font-black text-stone-800 mb-6 uppercase tracking-[0.2em] text-[10px]">Mapa do Site</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-bold">
                <li><button onClick={() => onViewChange?.('receitas')} className="hover:text-[#ef4444] transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[8px]"></i> Receitas Exclusivas</button></li>
                <li><button onClick={() => onViewChange?.('saude')} className="hover:text-[#3b82f6] transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[8px]"></i> Saúde & Longevidade</button></li>
                <li><button onClick={() => onViewChange?.('planner')} className="hover:text-stone-800 transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[8px]"></i> Plano Nutricional</button></li>
                <li><button onClick={() => onViewChange?.('sobre')} className="hover:text-stone-800 transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[8px]"></i> Nosso Manifesto</button></li>
              </ul>
            </div>
          </div>

          {/* Suporte */}
          <div className="flex flex-col md:items-end">
            <div className="w-full md:max-w-xs md:text-right">
              <h4 className="font-black text-stone-800 mb-6 uppercase tracking-[0.2em] text-[10px]">Suporte ao Leitor</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-bold">
                <li><button onClick={() => onViewChange?.('contato')} className="hover:text-emerald-600 transition-colors flex items-center md:justify-end gap-2">Central de Atendimento <i className="fa-solid fa-headset text-[10px]"></i></button></li>
                <li><button onClick={() => onViewChange?.('conversor')} className="hover:text-stone-800 transition-colors">Conversor de Medidas</button></li>
                <li><button onClick={() => onViewChange?.('imc')} className="hover:text-stone-800 transition-colors">Cálculo de IMC</button></li>
                <li><button onClick={() => onViewChange?.('privacidade')} className="hover:text-stone-800 transition-colors">Privacidade & LGPD</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="pt-8 border-t border-stone-100">
          <div className="bg-stone-50 p-8 rounded-[2.5rem] mb-12 border border-stone-100 flex flex-col md:flex-row items-center gap-8 shadow-inner">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 text-2xl shadow-sm flex-shrink-0">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-stone-400 uppercase font-black tracking-[0.3em] mb-2">Aviso de Saúde Obrigatório</p>
              <p className="text-xs text-stone-600 leading-relaxed font-medium italic">
                O conteúdo do Saúde com Sabor é estritamente informativo. Nenhuma informação aqui contida substitui a consulta com médicos e nutricionistas. 
                Sempre consulte um profissional antes de iniciar dietas ou suplementações.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400 font-bold">
            <p className="tracking-tight">© 2024 SAÚDE COM SABOR - PROJETO GASTRONOMIA CONSCIENTE.</p>
            <div className="flex items-center gap-8">
              <button onClick={onTermsClick} className="hover:text-stone-800 transition-colors uppercase tracking-widest text-[10px]">Termos</button>
              <button onClick={() => onViewChange?.('privacidade')} className="hover:text-stone-800 transition-colors uppercase tracking-widest text-[10px]">Privacidade</button>
              <button 
                onClick={onEditorClick}
                title="Configurações do Autor"
                className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-200 hover:text-stone-600 transition-all border border-stone-100"
              >
                <i className="fa-solid fa-gear text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
