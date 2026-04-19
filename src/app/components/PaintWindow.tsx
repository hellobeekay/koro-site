import { useRef, useState, useEffect } from 'react';
import { Window95 } from './Window95';

interface PaintWindowProps {
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  zIndex?: number;
}

type Tool = 
  | 'freeform-select' 
  | 'select' 
  | 'eraser' 
  | 'fill' 
  | 'picker' 
  | 'magnifier' 
  | 'pencil' 
  | 'brush' 
  | 'airbrush' 
  | 'text' 
  | 'line' 
  | 'curve' 
  | 'rectangle' 
  | 'polygon' 
  | 'ellipse' 
  | 'roundrect';

const WIN95_COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000', '#ffffff', '#c0c0c0',
  '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#80ffff',
  '#800040', '#ff0080', '#ff8040', '#ff8080'
];

export function PaintWindow({ onClose, onSave, zIndex }: PaintWindowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(1);
  const [hasDrawn, setHasDrawn] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // Auto-save when drawing stops
  useEffect(() => {
    if (hasDrawn) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const dataUrl = canvas.toDataURL();
          onSave(dataUrl);
          setHasDrawn(false);
        }
      }, 1000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [hasDrawn, onSave]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    lastPosRef.current = { x, y };
    
    if (tool === 'fill') {
      handleFill(x, y);
    } else if (tool === 'picker') {
      handlePickColor(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHasDrawn(true);

    const lastX = lastPosRef.current.x;
    const lastY = lastPosRef.current.y;

    switch (tool) {
      case 'pencil':
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;

      case 'brush':
        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;

      case 'airbrush':
        ctx.fillStyle = color;
        for (let i = 0; i < 20; i++) {
          const offsetX = (Math.random() - 0.5) * 15;
          const offsetY = (Math.random() - 0.5) * 15;
          ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
        break;

      case 'eraser':
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;

      case 'line':
        // Line tool would need start/end point logic
        break;
    }

    lastPosRef.current = { x, y };
  };

  const handleFill = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setHasDrawn(true);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handlePickColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    setColor(hexColor);
  };

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      onSave(dataUrl);
      alert('Saved to Recycle Bin!');
    }
  };

  const ToolButton = ({ toolType, children, title }: { toolType: Tool; children: React.ReactNode; title?: string }) => (
    <button
      onClick={() => setTool(toolType)}
      title={title}
      className="w-[23px] h-[23px] flex items-center justify-center"
      style={{
        border: '1px solid',
        borderColor: tool === toolType ? '#000 #fff #fff #000' : '#dfdfdf #808080 #808080 #dfdfdf',
        backgroundColor: tool === toolType ? '#c0c0c0' : '#c0c0c0',
        boxShadow: tool === toolType ? 'inset 1px 1px 2px rgba(0,0,0,0.2)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </button>
  );

  return (
    <Window95 title="untitled - Paint" onClose={onClose} width={680} height={500} zIndex={zIndex}>
      <div className="w-full h-full flex flex-col" style={{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px', backgroundColor: '#c0c0c0' }}>
        {/* Menu Bar */}
        <div 
          className="h-[18px] flex items-center px-2"
          style={{ 
            backgroundColor: '#c0c0c0',
            borderBottom: '2px solid',
            borderColor: '#fff #808080',
          }}
        >
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">File</span>
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">Edit</span>
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">View</span>
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">Image</span>
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">Options</span>
          <span className="px-2 cursor-default hover:bg-[#000080] hover:text-white">Help</span>
        </div>

        {/* Toolbar */}
        <div 
          className="h-[44px] flex items-center gap-2 px-2"
          style={{
            backgroundColor: '#c0c0c0',
            borderBottom: '2px solid',
            borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
          }}
        >
          <button
            onClick={handleSaveClick}
            className="w-[24px] h-[24px] flex items-center justify-center"
            title="Save"
            style={{
              border: '1px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              backgroundColor: '#c0c0c0',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="2" y="1" width="12" height="14" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
              <rect x="2" y="1" width="12" height="4" fill="#000080"/>
              <rect x="5" y="9" width="6" height="6" fill="#808080"/>
              <circle cx="8" cy="12" r="1" fill="#000"/>
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Toolbox */}
          <div 
            className="w-[54px] flex flex-col p-1"
            style={{
              backgroundColor: '#c0c0c0',
              borderRight: '2px solid',
              borderColor: '#dfdfdf #808080',
            }}
          >
            {/* Tools Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-[1px]">
              {/* Row 1 */}
              <ToolButton toolType="freeform-select" title="Free-Form Select">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M3 3 L8 2 L11 4 L10 8 L6 9 L3 7 Z" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="1,1"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="select" title="Select">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="12" height="10" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="1,1"/>
                </svg>
              </ToolButton>
              
              {/* Row 2 */}
              <ToolButton toolType="eraser" title="Eraser/Color Eraser">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="6" width="10" height="7" fill="#ffc0cb" stroke="#000" strokeWidth="1"/>
                  <rect x="3" y="11" width="10" height="2" fill="#808080"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="fill" title="Fill With Color">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M9 3 L13 9 L5 9 Z" fill="#ffff00" stroke="#000" strokeWidth="1"/>
                  <rect x="6" y="9" width="6" height="1" fill="#c0c0c0"/>
                  <ellipse cx="9" cy="11" rx="2" ry="1" fill="#0000ff"/>
                </svg>
              </ToolButton>
              
              {/* Row 3 */}
              <ToolButton toolType="picker" title="Pick Color">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M6 14 L8 6 L10 14 L8 12 Z" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                  <line x1="8" y1="6" x2="8" y2="2" stroke="#000" strokeWidth="1"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="magnifier" title="Magnifier">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="6" cy="6" r="4" fill="none" stroke="#000" strokeWidth="1.5"/>
                  <line x1="9" y1="9" x2="13" y2="13" stroke="#000" strokeWidth="2"/>
                </svg>
              </ToolButton>
              
              {/* Row 4 */}
              <ToolButton toolType="pencil" title="Pencil">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M2 14 L6 3 L10 5 L6 16 Z" fill="#ffcc66" stroke="#000" strokeWidth="1"/>
                  <path d="M6 3 L8 2 L12 4 L10 5 Z" fill="#ff6666" stroke="#000" strokeWidth="1"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="brush" title="Brush">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <ellipse cx="8" cy="4" rx="2" ry="3" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                  <path d="M6 6 L5 10 Q6 13 8 13 Q10 13 11 10 L10 6 Z" fill="#8b6914" stroke="#000" strokeWidth="1"/>
                </svg>
              </ToolButton>
              
              {/* Row 5 */}
              <ToolButton toolType="airbrush" title="Airbrush">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="8" width="4" height="7" rx="1" fill="#808080" stroke="#000" strokeWidth="1"/>
                  <ellipse cx="5" cy="5" rx="2" ry="2.5" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
                  <circle cx="9" cy="3" r="0.5" fill="#000"/>
                  <circle cx="11" cy="4" r="0.5" fill="#000"/>
                  <circle cx="10" cy="6" r="0.5" fill="#000"/>
                  <circle cx="12" cy="5" r="0.5" fill="#000"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="text" title="Text">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <text x="2" y="13" fill="#000080" fontSize="12" fontWeight="bold" fontFamily="serif">A</text>
                </svg>
              </ToolButton>
              
              {/* Row 6 */}
              <ToolButton toolType="line" title="Line">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <line x1="2" y1="13" x2="14" y2="3" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="curve" title="Curve">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M2 12 Q8 2 14 10" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
              
              {/* Row 7 */}
              <ToolButton toolType="rectangle" title="Rectangle">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="4" width="10" height="8" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="polygon" title="Polygon">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 2 L14 6 L12 13 L4 13 L2 6 Z" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
              
              {/* Row 8 */}
              <ToolButton toolType="ellipse" title="Ellipse">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <ellipse cx="8" cy="8" rx="6" ry="5" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
              <ToolButton toolType="roundrect" title="Rounded Rectangle">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="4" width="10" height="8" rx="2" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </ToolButton>
            </div>
          </div>

          {/* Right Side - Canvas + Scrollbars */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Area with vertical scrollbar */}
            <div className="flex-1 flex overflow-hidden">
              {/* Canvas */}
              <div 
                className="flex-1 overflow-auto relative"
                style={{ backgroundColor: '#808080' }}
              >
                <div className="p-1">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                      backgroundColor: '#ffffff',
                      cursor: getCursor(tool),
                      imageRendering: 'pixelated',
                    }}
                  />
                </div>
              </div>

              {/* Vertical Scrollbar */}
              <div 
                className="w-[16px] flex flex-col"
                style={{
                  backgroundColor: '#c0c0c0',
                  borderLeft: '1px solid #808080',
                }}
              >
                <button 
                  className="h-[16px] flex items-center justify-center"
                  style={{
                    border: '1px solid',
                    borderColor: '#fff #000 #000 #fff',
                    backgroundColor: '#c0c0c0',
                  }}
                >
                  <span style={{ fontSize: '8px' }}>▲</span>
                </button>
                <div 
                  className="flex-1"
                  style={{
                    backgroundColor: '#808080',
                    backgroundImage: 'repeating-linear-gradient(45deg, #808080 0, #808080 2px, #c0c0c0 2px, #c0c0c0 4px)',
                  }}
                />
                <button 
                  className="h-[16px] flex items-center justify-center"
                  style={{
                    border: '1px solid',
                    borderColor: '#fff #000 #000 #fff',
                    backgroundColor: '#c0c0c0',
                  }}
                >
                  <span style={{ fontSize: '8px' }}>▼</span>
                </button>
              </div>
            </div>

            {/* Horizontal Scrollbar */}
            <div 
              className="h-[16px] flex"
              style={{
                backgroundColor: '#c0c0c0',
                borderTop: '1px solid #808080',
              }}
            >
              <button 
                className="w-[16px] flex items-center justify-center"
                style={{
                  border: '1px solid',
                  borderColor: '#fff #000 #000 #fff',
                  backgroundColor: '#c0c0c0',
                }}
              >
                <span style={{ fontSize: '8px' }}>◀</span>
              </button>
              <div 
                className="flex-1"
                style={{
                  backgroundColor: '#808080',
                  backgroundImage: 'repeating-linear-gradient(90deg, #808080 0, #808080 2px, #c0c0c0 2px, #c0c0c0 4px)',
                }}
              />
              <button 
                className="w-[16px] flex items-center justify-center"
                style={{
                  border: '1px solid',
                  borderColor: '#fff #000 #000 #fff',
                  backgroundColor: '#c0c0c0',
                }}
              >
                <span style={{ fontSize: '8px' }}>▶</span>
              </button>
              <div 
                className="w-[16px] h-[16px]"
                style={{ backgroundColor: '#c0c0c0' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Color Palette + Status Bar */}
        <div>
          {/* Color Palette */}
          <div 
            className="p-1 flex gap-2 items-center"
            style={{
              backgroundColor: '#c0c0c0',
              borderTop: '2px solid',
              borderColor: '#fff #808080',
              height: '38px',
            }}
          >
            {/* Current Colors Display */}
            <div className="flex items-center">
              <div 
                className="w-[32px] h-[28px] relative mr-2"
                style={{
                  border: '2px solid',
                  borderColor: '#808080 #fff #fff #808080',
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-[22px] h-[18px]"
                  style={{ 
                    backgroundColor: color,
                    border: '1px solid #000',
                  }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-[22px] h-[18px]"
                  style={{ 
                    backgroundColor: secondaryColor,
                    border: '1px solid #000',
                  }}
                />
              </div>
            </div>

            {/* Color Grid */}
            <div className="grid grid-cols-14 gap-[1px]">
              {WIN95_COLORS.map((clr, idx) => (
                <button
                  key={idx}
                  onClick={() => setColor(clr)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setSecondaryColor(clr);
                  }}
                  className="w-[14px] h-[14px]"
                  style={{
                    backgroundColor: clr,
                    border: '1px solid',
                    borderColor: clr === color ? '#000' : '#808080',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div 
            className="h-[18px] flex items-center px-2"
            style={{
              backgroundColor: '#c0c0c0',
              borderTop: '2px solid',
              borderColor: '#fff #808080',
              fontSize: '10px',
            }}
          >
            <div 
              className="flex-1"
              style={{
                border: '1px solid',
                borderColor: '#808080 #fff',
                padding: '0 4px',
              }}
            >
              For Help, click Help Topics on the Help Menu.
            </div>
          </div>
        </div>
      </div>
    </Window95>
  );
}

function getCursor(tool: Tool): string {
  switch (tool) {
    case 'pencil':
    case 'brush':
    case 'airbrush':
    case 'line':
    case 'curve':
      return 'crosshair';
    case 'eraser':
      return 'cell';
    case 'fill':
      return 'copy';
    case 'picker':
      return 'copy';
    case 'text':
      return 'text';
    default:
      return 'default';
  }
}
