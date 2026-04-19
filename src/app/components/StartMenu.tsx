interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const menuItems = [
    { icon: '📁', label: 'Programs', hasArrow: true },
    { icon: '📄', label: 'Documents', hasArrow: true },
    { icon: '⚙️', label: 'Settings', hasArrow: true },
    { icon: '🔍', label: 'Find', hasArrow: true },
    { icon: '❓', label: 'Help', hasArrow: false },
    { icon: '▶️', label: 'Run...', hasArrow: false },
    { divider: true },
    { icon: '🔌', label: 'Shut Down...', hasArrow: false },
  ];

  return (
    <div
      className="absolute"
      style={{
        bottom: '32px',
        left: '0',
        width: '200px',
        backgroundColor: '#c0c0c0',
        border: '2px solid',
        borderColor: '#fff #000 #000 #fff',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Windows 95 Banner */}
      <div
        className="h-full absolute left-0 top-0 flex items-end px-1 pb-2"
        style={{
          width: '24px',
          background: 'linear-gradient(to right, #000080, #1084d0)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          color: '#fff',
          letterSpacing: '2px',
        }}
      >
        <span style={{ fontSize: '18px' }}>Windows 95</span>
      </div>

      {/* Menu Items */}
      <div style={{ marginLeft: '24px' }}>
        {menuItems.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={index}
                style={{
                  height: '2px',
                  margin: '2px 4px',
                  borderTop: '1px solid #808080',
                  borderBottom: '1px solid #fff',
                }}
              />
            );
          }

          return (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#000080] hover:text-white"
              style={{
                position: 'relative',
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.hasArrow && (
                <span style={{ fontSize: '10px' }}>▶</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
