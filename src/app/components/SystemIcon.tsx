import { useState } from 'react';

interface SystemIconProps {
  name: string;
  type: 'computer' | 'recyclebin' | 'internet';
  x: number;
  y: number;
  onDoubleClick: () => void;
}

export function SystemIcon({ name, type, x, y, onDoubleClick }: SystemIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const renderIcon = () => {
    switch (type) {
      case 'computer':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Monitor */}
            <rect x="8" y="12" width="32" height="24" fill="#4A90E2" stroke="#2C5AA0" strokeWidth="2"/>
            <rect x="10" y="14" width="28" height="20" fill="#87CEEB"/>
            {/* Stand */}
            <rect x="20" y="36" width="8" height="4" fill="#5A5A5A"/>
            <rect x="16" y="40" width="16" height="2" fill="#5A5A5A"/>
            {/* Screen highlight */}
            <rect x="12" y="16" width="2" height="10" fill="#B8E6FF"/>
          </svg>
        );
      case 'recyclebin':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Bin body */}
            <path d="M14 18 L16 40 L32 40 L34 18 Z" fill="#6B6B6B" stroke="#4A4A4A" strokeWidth="1"/>
            {/* Bin top */}
            <rect x="12" y="15" width="24" height="3" fill="#7B7B7B" stroke="#4A4A4A" strokeWidth="1"/>
            {/* Handle */}
            <path d="M18 15 L18 12 C18 10 20 10 22 10 L26 10 C28 10 30 10 30 12 L30 15" 
                  stroke="#4A4A4A" strokeWidth="2" fill="none"/>
            {/* Papers inside */}
            <rect x="18" y="22" width="3" height="14" fill="#E8E8E8"/>
            <rect x="23" y="24" width="3" height="12" fill="#E8E8E8"/>
            <rect x="28" y="23" width="3" height="13" fill="#E8E8E8"/>
          </svg>
        );
      case 'internet':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Globe */}
            <circle cx="24" cy="24" r="14" fill="#4A90E2" stroke="#2C5AA0" strokeWidth="2"/>
            {/* Latitude lines */}
            <ellipse cx="24" cy="24" rx="14" ry="5" stroke="#B8E6FF" strokeWidth="1" fill="none"/>
            <line x1="10" y1="24" x2="38" y2="24" stroke="#B8E6FF" strokeWidth="1"/>
            {/* Longitude lines */}
            <ellipse cx="24" cy="24" rx="5" ry="14" stroke="#B8E6FF" strokeWidth="1" fill="none"/>
            <line x1="24" y1="10" x2="24" y2="38" stroke="#B8E6FF" strokeWidth="1"/>
            {/* Highlight */}
            <circle cx="18" cy="18" r="3" fill="#E6F4FF" opacity="0.6"/>
          </svg>
        );
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{ left: `${x}px`, top: `${y}px`, width: '80px' }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      {/* Icon */}
      <div className="mb-1">
        {renderIcon()}
      </div>

      {/* Icon Name */}
      <div
        className="px-1 py-0.5 text-center break-words text-white text-xs max-w-full"
        style={{
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '11px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          backgroundColor: isSelected ? '#1660d4' : 'transparent',
          border: isSelected ? '1px dotted #fff' : '1px dotted transparent',
        }}
      >
        {name}
      </div>
    </div>
  );
}
