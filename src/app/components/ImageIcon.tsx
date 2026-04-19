import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageIconProps {
  name: string;
  x: number;
  y: number;
  imageUrl: string;
  onDoubleClick?: () => void;
}

export function ImageIcon({ name, x, y, imageUrl, onDoubleClick }: ImageIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{ left: `${x}px`, top: `${y}px`, width: '70px' }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      {/* Image Thumbnail - smaller and simpler */}
      <div 
        className="mb-0.5"
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#fff',
          border: '1px solid #999',
          padding: '2px',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image Name - smaller text */}
      <div
        className="px-0.5 text-center break-words text-white max-w-full"
        style={{
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '10px',
          textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
          backgroundColor: isSelected ? '#1660d4' : 'transparent',
          border: isSelected ? '1px dotted #fff' : '1px dotted transparent',
          lineHeight: '1.2',
        }}
      >
        {name}
      </div>
    </div>
  );
}