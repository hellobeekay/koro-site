import { useState, useRef, useEffect, ReactNode } from 'react';

interface Window95Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
  height?: number;
  zIndex?: number;
}

export function Window95({ title, children, onClose, width = 400, height = 300, zIndex = 100 }: Window95Props) {
  const [position, setPosition] = useState({ x: 100, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${isMaximized ? '100%' : width}px`,
        height: `${isMaximized ? '100%' : height}px`,
        backgroundColor: '#c0c0c0',
        border: '2px solid',
        borderColor: '#fff #000 #000 #fff',
        boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 2px 2px 4px rgba(0,0,0,0.3)',
        zIndex,
      }}
    >
      {/* Title Bar */}
      <div
        className="h-[20px] flex items-center justify-between px-1 cursor-move select-none"
        style={{
          background: 'linear-gradient(to right, #000080, #1084d0)',
          color: '#fff',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '11px',
        }}
        onMouseDown={handleMouseDown}
      >
        <span>{title}</span>
        <div className="flex gap-[2px]">
          {/* Minimize Button */}
          <button
            className="w-[16px] h-[14px] flex items-center justify-center"
            style={{
              backgroundColor: '#c0c0c0',
              border: '1px solid',
              borderColor: '#fff #000 #000 #fff',
              fontSize: '10px',
              lineHeight: '1',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span style={{ marginBottom: '6px' }}>_</span>
          </button>
          
          {/* Maximize Button */}
          <button
            className="w-[16px] h-[14px] flex items-center justify-center"
            style={{
              backgroundColor: '#c0c0c0',
              border: '1px solid',
              borderColor: '#fff #000 #000 #fff',
              fontSize: '10px',
              lineHeight: '1',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" style={{ marginTop: '1px' }}>
              <rect x="0" y="0" width="9" height="9" fill="none" stroke="#000" strokeWidth="1"/>
              <rect x="0" y="0" width="9" height="2" fill="#000"/>
            </svg>
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-[16px] h-[14px] flex items-center justify-center"
            style={{
              backgroundColor: '#c0c0c0',
              border: '1px solid',
              borderColor: '#fff #000 #000 #fff',
              fontSize: '11px',
              lineHeight: '1',
            }}
          >
            <span style={{ color: '#000' }}>×</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ height: 'calc(100% - 20px)' }}>
        {children}
      </div>
    </div>
  );
}