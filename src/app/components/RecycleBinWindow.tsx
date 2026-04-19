import { Window95 } from './Window95';

interface RecycleBinWindowProps {
  doodles: string[];
  onClose: () => void;
  zIndex?: number;
}

export function RecycleBinWindow({ doodles, onClose, zIndex }: RecycleBinWindowProps) {
  return (
    <Window95 title="Recycle Bin" onClose={onClose} width={500} height={400} zIndex={zIndex}>
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

        {/* Content Area */}
        <div 
          className="flex-1 overflow-auto p-3"
          style={{ backgroundColor: '#fff' }}
        >
          {doodles.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Recycle Bin is empty
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {doodles.map((doodle, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    style={{
                      border: '1px solid #000',
                      backgroundColor: '#fff',
                      padding: '2px',
                    }}
                  >
                    <img 
                      src={doodle} 
                      alt={`Doodle ${index + 1}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        imageRendering: 'pixelated',
                      }}
                    />
                  </div>
                  <span className="mt-1 text-center">doodle_{index + 1}.bmp</span>
                </div>
              ))}
            </div>
          )}
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
          {doodles.length} object(s)
        </div>
      </div>
    </Window95>
  );
}
