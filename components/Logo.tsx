
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sombra suave interna para profundidade */}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Lado Esquerdo: Gastronomia (Vermelho) - Perfil de Colher/Coração */}
      <path 
        d="M50 85C30 75 15 55 15 40C15 25 30 18 45 25" 
        stroke="#ef4444" 
        strokeWidth="9" 
        strokeLinecap="round"
        filter="url(#shadow)"
      />
      <circle cx="32" cy="40" r="8" fill="#ef4444" />
      
      {/* Lado Direito: Saúde (Azul) - Folha/Coração */}
      <path 
        d="M50 85C70 75 85 55 85 40C85 25 70 18 55 25" 
        stroke="#3b82f6" 
        strokeWidth="9" 
        strokeLinecap="round"
        filter="url(#shadow)"
      />
      <path 
        d="M55 25C65 35 75 55 55 70C45 55 45 35 55 25Z" 
        fill="#3b82f6"
      />
      
      {/* Detalhe Central de Conexão - Semente/Base */}
      <circle cx="50" cy="85" r="5" fill="#1c1c1c"/>
    </svg>
  );
};

export default Logo;
