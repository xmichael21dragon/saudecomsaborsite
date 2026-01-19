
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
}

/**
 * Componente para exibição de anúncios do Google AdSense
 * Nota: Os anúncios só aparecem em domínios verificados pelo Google.
 */
const AdBanner: React.FC<AdBannerProps> = ({ slot, className = "" }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.debug("AdSense ainda carregando ou bloqueado.");
    }
  }, []);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 my-12 no-print ${className}`}>
      <div className="ad-label">Publicidade</div>
      <div className="bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-center overflow-hidden min-h-[100px] md:min-h-[250px]">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-1966477514201373"
             data-ad-slot={slot || "auto"}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdBanner;
