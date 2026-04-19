import { Window95 } from './Window95';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageWindowProps {
  title: string;
  imageUrl: string;
  onClose: () => void;
  zIndex?: number;
}

export function ImageWindow({ title, imageUrl, onClose, zIndex }: ImageWindowProps) {
  return (
    <Window95 title={title} onClose={onClose} width={500} height={450} zIndex={zIndex}>
      <div className="w-full h-full p-2 overflow-auto" style={{ backgroundColor: '#fff' }}>
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="max-w-full h-auto"
        />
      </div>
    </Window95>
  );
}
