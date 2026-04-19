import { useState } from 'react';

interface FolderIconProps {
  name: string;
  x: number;
  y: number;
  onDoubleClick: () => void;
}

export function FolderIcon({ name, x, y, onDoubleClick }: FolderIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{ left: `${x}px`, top: `${y}px`, width: '80px' }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      {/* Folder Icon */}
      <div className="mb-1">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Folder shadow */}
          <path
            d="M8 14 L8 38 L44 38 L44 18 L24 18 L20 14 Z"
            fill="rgba(0,0,0,0.2)"
            transform="translate(1, 2)"
          />
          {/* Folder back */}
          <path
            d="M6 12 L6 36 L42 36 L42 16 L22 16 L18 12 Z"
            fill="#FFD666"
          />
          {/* Folder tab */}
          <path
            d="M6 12 L18 12 L22 16 L42 16 L42 20 L6 20 Z"
            fill="#FFEB99"
          />
          {/* Folder front */}
          <path
            d="M6 18 L6 36 L42 36 L42 18 Z"
            fill="#FFC933"
          />
          {/* Folder highlights */}
          <path
            d="M7 19 L7 35 L8 35 L8 19 Z"
            fill="#FFEB99"
          />
          <path
            d="M7 19 L41 19 L41 20 L7 20 Z"
            fill="#FFEB99"
          />
        </svg>
      </div>

      {/* Folder Name */}
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
