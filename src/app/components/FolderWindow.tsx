import { Window95 } from './Window95';

interface FolderWindowProps {
  title: string;
  content: string[];
  onClose: () => void;
  zIndex?: number;
}

export function FolderWindow({ title, content, onClose, zIndex }: FolderWindowProps) {
  return (
    <Window95 title={title} onClose={onClose} width={400} height={350} zIndex={zIndex}>
      <div className="w-full h-full flex flex-col" style={{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px' }}>
        {/* Menu Bar */}
        <div 
          className="h-[18px] flex items-center gap-2 px-1"
          style={{
            backgroundColor: '#c0c0c0',
            borderBottom: '1px solid #808080',
          }}
        >
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>

        {/* Toolbar */}
        <div 
          className="h-[32px] flex items-center gap-1 px-1"
          style={{
            backgroundColor: '#c0c0c0',
            borderBottom: '2px solid',
            borderColor: '#808080 #fff #fff #808080',
          }}
        >
          <button 
            className="px-2 h-[22px]"
            style={{
              border: '1px solid',
              borderColor: '#fff #000 #000 #fff',
              backgroundColor: '#c0c0c0',
            }}
          >
            Up
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-2" style={{ backgroundColor: '#fff' }}>
          {content.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 p-1 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              {item.endsWith('/') ? (
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                  <path d="M2 5 L2 13 L14 13 L14 7 L8 7 L7 5 Z" fill="#ffff00" stroke="#000"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                  <rect x="3" y="2" width="10" height="12" fill="#fff" stroke="#000"/>
                  <line x1="5" y1="5" x2="11" y2="5" stroke="#000"/>
                  <line x1="5" y1="7" x2="11" y2="7" stroke="#000"/>
                  <line x1="5" y1="9" x2="11" y2="9" stroke="#000"/>
                </svg>
              )}
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div 
          className="h-[20px] flex items-center px-2"
          style={{
            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #fff',
            borderBottom: '1px solid #808080',
          }}
        >
          {content.length} object(s)
        </div>
      </div>
    </Window95>
  );
}
