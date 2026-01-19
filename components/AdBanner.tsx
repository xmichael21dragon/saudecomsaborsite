import React, { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, className = "" }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.debug("AdSense script loading or blocked by user.");
    }
  }, []);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 my-16 no-print ${className}`}>
      <div className="ad-label">Advertisement</div>
      <div className="bg-[#F3F2EE] rounded-[2.5rem] border border-stone-100 flex items-center justify-center overflow-hidden min-h-[100px] md:min-h-[280px] shadow-inner">
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