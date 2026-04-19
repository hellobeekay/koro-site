import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import paintIcon from '@/assets/images/graveyard/paint-icon.png';

interface Icon95Props {
  name: string;
  iconType: string;
  x: number;
  y: number;
  imageUrl?: string;
  onClick: () => void;
}

export function Icon95({ name, iconType, x, y, imageUrl, onClick }: Icon95Props) {
  const [isSelected, setIsSelected] = useState(false);

  const renderIcon = () => {
    if (iconType === 'image' && imageUrl) {
      return (
        <div 
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#fff',
            border: '1px solid #000',
            padding: '1px',
          }}
        >
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }}
          />
        </div>
      );
    }

    // Paint icon with custom image
    if (iconType === 'paint') {
      return (
        <div 
          style={{
            width: '32px',
            height: '32px',
          }}
        >
          <img
            src={paintIcon}
            alt="Paint"
            style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }}
          />
        </div>
      );
    }

    // System icons
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
        {iconType === 'computer' && (
          <>
            <rect x="4" y="8" width="24" height="16" fill="#808080" stroke="#000"/>
            <rect x="6" y="10" width="20" height="12" fill="#00a8e8"/>
            <rect x="13" y="24" width="6" height="3" fill="#808080"/>
            <rect x="10" y="27" width="12" height="2" fill="#404040"/>
          </>
        )}
        {iconType === 'recyclebin' && (
          <>
            <rect x="10" y="8" width="12" height="2" fill="#808080"/>
            <path d="M8 10 L10 28 L22 28 L24 10 Z" fill="#404040" stroke="#000"/>
            <rect x="12" y="14" width="2" height="10" fill="#c0c0c0"/>
            <rect x="18" y="14" width="2" height="10" fill="#c0c0c0"/>
          </>
        )}
        {iconType === 'network' && (
          <>
            <circle cx="16" cy="16" r="10" fill="#808080" stroke="#000"/>
            <line x1="6" y1="16" x2="26" y2="16" stroke="#c0c0c0" strokeWidth="2"/>
            <ellipse cx="16" cy="16" rx="4" ry="10" stroke="#c0c0c0" strokeWidth="2" fill="none"/>
          </>
        )}
        {iconType === 'folder' && (
          <>
            <path d="M4 10 L4 26 L28 26 L28 14 L16 14 L14 10 Z" fill="#ffff00" stroke="#000"/>
            <rect x="4" y="10" width="10" height="4" fill="#ffcc00"/>
          </>
        )}
      </svg>
    );
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{ left: `${x}px`, top: `${y}px`, width: '70px' }}
      onClick={() => {
        setIsSelected(!isSelected);
        onClick();
      }}
    >
      <div className={isSelected ? 'outline outline-1 outline-dashed outline-white p-1' : 'p-1'}>
        {renderIcon()}
      </div>
      <div
        style={{
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '11px',
          color: isSelected ? '#fff' : '#000',
          backgroundColor: isSelected ? '#000080' : 'transparent',
          padding: '0 2px',
          textAlign: 'center',
          wordBreak: 'break-word',
          textShadow: isSelected ? 'none' : '1px 1px 0 #fff',
        }}
      >
        {name}
      </div>
    </div>
  );
}