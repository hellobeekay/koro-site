import { Window95 } from './Window95';

interface AlertWindowProps {
  onClose: () => void;
  zIndex?: number;
}

export function AlertWindow({ onClose, zIndex }: AlertWindowProps) {
  return (
    <Window95 title="My Computer" onClose={onClose} width={320} height={140} zIndex={zIndex}>
      <div 
        className="w-full h-full flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: '#c0c0c0' }}
      >
        <div className="flex items-start gap-4 mb-4">
          {/* Red X Icon */}
          <div 
            className="w-[32px] h-[32px] flex items-center justify-center text-white"
            style={{
              backgroundColor: '#ff0000',
              borderRadius: '50%',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            ×
          </div>

          {/* Message */}
          <div style={{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px', paddingTop: '4px' }}>
            <strong>Warning: Access Denied</strong>
            <div className="mt-1">
              You do not have permission to access this resource.
            </div>
          </div>
        </div>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="px-6 h-[24px]"
          style={{
            border: '2px solid',
            borderColor: '#fff #000 #000 #fff',
            backgroundColor: '#c0c0c0',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            minWidth: '75px',
          }}
        >
          OK
        </button>
      </div>
    </Window95>
  );
}
