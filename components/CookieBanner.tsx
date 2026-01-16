
import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onViewPrivacy: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onViewPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pequeno delay para não sobrecarregar a entrada do usuário
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] animate-fade-in">
      <div className="max-w-4xl mx-auto bg-stone-900/95 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#3b82f6] text-xl flex-shrink-0">
            <i className="fa-solid fa-cookie-bite"></i>
          </div>
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Privacidade & Cookies</h4>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xl font-medium">
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego do site e personalizar anúncios através do Google AdSense. Ao continuar, você concorda com nossa <button onClick={onViewPrivacy} className="text-white underline hover:text-[#3b82f6] transition-colors">Política de Privacidade</button>.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onViewPrivacy}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Configurar
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-10 py-3 bg-white text-stone-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#3b82f6] hover:text-white transition-all shadow-lg active:scale-95"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
