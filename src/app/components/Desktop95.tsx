import { useState } from 'react';
import { Icon95 } from './Icon95';
import { ImageWindow } from './ImageWindow';
import { FolderWindow } from './FolderWindow';
import { PaintWindow } from './PaintWindow';
import { AlertWindow } from './AlertWindow';
import { RecycleBinWindow } from './RecycleBinWindow';
import { DinoGame } from './DinoGame';
import { StartMenu } from './StartMenu';

interface OpenWindow {
  id: string;
  type: 'image' | 'folder' | 'paint' | 'alert' | 'recyclebin' | 'dinogame';
  title: string;
  data?: any;
}

// System icons on the left
const systemIcons = [
  { id: 'computer', name: 'My Computer', type: 'computer', x: 10, y: 10 },
  { id: 'recyclebin', name: 'Recycle Bin', type: 'recyclebin', x: 10, y: 90 },
  { id: 'network', name: 'Network Neighborhood', type: 'network', x: 10, y: 170 },
  { id: 'paint', name: 'Paint', type: 'paint', x: 10, y: 250 },
];

// 20 image icons scattered
const imageIcons = [
  { id: 'img1', name: 'beach.jpg', type: 'image', x: 150, y: 50, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
  { id: 'img2', name: 'mountain.jpg', type: 'image', x: 280, y: 120, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { id: 'img3', name: 'city.jpg', type: 'image', x: 420, y: 80, imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800' },
  { id: 'img4', name: 'forest.jpg', type: 'image', x: 550, y: 40, imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800' },
  { id: 'img5', name: 'sunset.jpg', type: 'image', x: 680, y: 100, imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800' },
  { id: 'img6', name: 'desert.jpg', type: 'image', x: 180, y: 220, imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800' },
  { id: 'img7', name: 'ocean.jpg', type: 'image', x: 320, y: 280, imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800' },
  { id: 'img8', name: 'lake.jpg', type: 'image', x: 460, y: 240, imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800' },
  { id: 'img9', name: 'river.jpg', type: 'image', x: 600, y: 200, imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800' },
  { id: 'img10', name: 'valley.jpg', type: 'image', x: 720, y: 280, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { id: 'img11', name: 'canyon.jpg', type: 'image', x: 140, y: 380, imageUrl: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=800' },
  { id: 'img12', name: 'falls.jpg', type: 'image', x: 270, y: 440, imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800' },
  { id: 'img13', name: 'aurora.jpg', type: 'image', x: 400, y: 400, imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800' },
  { id: 'img14', name: 'glacier.jpg', type: 'image', x: 530, y: 360, imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800' },
  { id: 'img15', name: 'volcano.jpg', type: 'image', x: 660, y: 420, imageUrl: 'https://images.unsplash.com/photo-1554647286-f365d7defc2d?w=800' },
  { id: 'img16', name: 'island.jpg', type: 'image', x: 160, y: 520, imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' },
  { id: 'img17', name: 'cliff.jpg', type: 'image', x: 290, y: 560, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { id: 'img18', name: 'cave.jpg', type: 'image', x: 420, y: 540, imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800' },
  { id: 'img19', name: 'meadow.jpg', type: 'image', x: 550, y: 500, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800' },
  { id: 'img20', name: 'peak.jpg', type: 'image', x: 680, y: 540, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
];

// 5 folder icons scattered
const folderIcons = [
  { id: 'folder1', name: 'Projects', type: 'folder', x: 240, y: 30, content: ['website_redesign/', 'mobile_app/', 'branding_kit/', 'marketing_materials/'] },
  { id: 'folder2', name: 'Documents', type: 'folder', x: 380, y: 160, content: ['report.doc', 'presentation.ppt', 'budget.xls', 'notes.txt'] },
  { id: 'folder3', name: 'Downloads', type: 'folder', x: 520, y: 140, content: ['installer.exe', 'readme.txt', 'archive.zip', 'update.msi'] },
  { id: 'folder4', name: 'Music', type: 'folder', x: 350, y: 360, content: ['playlist1.m3u', 'song1.wav', 'song2.wav', 'album/'] },
  { id: 'folder5', name: 'Games', type: 'folder', x: 640, y: 320, content: ['solitaire.exe', 'minesweeper.exe', 'freecell.exe', 'saves/'] },
];

export function Desktop95() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [savedDoodles, setSavedDoodles] = useState<string[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleIconClick = (icon: any) => {
    // Check if window already open
    if (openWindows.find(w => w.id === icon.id)) return;

    let newWindow: OpenWindow | null = null;

    if (icon.type === 'image') {
      newWindow = { id: icon.id, type: 'image', title: icon.name, data: icon.imageUrl };
    } else if (icon.type === 'folder') {
      newWindow = { id: icon.id, type: 'folder', title: icon.name, data: icon.content };
    } else if (icon.type === 'paint') {
      newWindow = { id: icon.id, type: 'paint', title: 'Paint' };
    } else if (icon.type === 'computer') {
      newWindow = { id: icon.id, type: 'alert', title: 'My Computer' };
    } else if (icon.type === 'recyclebin') {
      newWindow = { id: icon.id, type: 'recyclebin', title: 'Recycle Bin', data: savedDoodles };
    } else if (icon.type === 'network') {
      newWindow = { id: icon.id, type: 'dinogame', title: 'Network Neighborhood' };
    }

    if (newWindow) {
      setOpenWindows([...openWindows, newWindow]);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const handleSaveDoodle = (dataUrl: string) => {
    setSavedDoodles([...savedDoodles, dataUrl]);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden win95-cursor"
      style={{ backgroundColor: '#008080' }}
      onClick={() => setIsStartMenuOpen(false)}
    >
      {/* System Icons */}
      {systemIcons.map(icon => (
        <Icon95
          key={icon.id}
          name={icon.name}
          iconType={icon.type}
          x={icon.x}
          y={icon.y}
          onClick={() => handleIconClick(icon)}
        />
      ))}

      {/* Image Icons */}
      {imageIcons.map(icon => (
        <Icon95
          key={icon.id}
          name={icon.name}
          iconType="image"
          x={icon.x}
          y={icon.y}
          imageUrl={icon.imageUrl}
          onClick={() => handleIconClick(icon)}
        />
      ))}

      {/* Folder Icons */}
      {folderIcons.map(icon => (
        <Icon95
          key={icon.id}
          name={icon.name}
          iconType="folder"
          x={icon.x}
          y={icon.y}
          onClick={() => handleIconClick(icon)}
        />
      ))}

      {/* Open Windows */}
      {openWindows.map((window, index) => {
        if (window.type === 'image') {
          return (
            <ImageWindow
              key={window.id}
              title={window.title}
              imageUrl={window.data}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={100 + index}
            />
          );
        } else if (window.type === 'folder') {
          return (
            <FolderWindow
              key={window.id}
              title={window.title}
              content={window.data}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={100 + index}
            />
          );
        } else if (window.type === 'paint') {
          return (
            <PaintWindow
              key={window.id}
              onClose={() => handleCloseWindow(window.id)}
              onSave={handleSaveDoodle}
              zIndex={100 + index}
            />
          );
        } else if (window.type === 'alert') {
          return (
            <AlertWindow
              key={window.id}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={100 + index}
            />
          );
        } else if (window.type === 'recyclebin') {
          return (
            <RecycleBinWindow
              key={window.id}
              doodles={savedDoodles}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={100 + index}
            />
          );
        } else if (window.type === 'dinogame') {
          return (
            <DinoGame
              key={window.id}
              onClose={() => handleCloseWindow(window.id)}
              zIndex={100 + index}
            />
          );
        }
        return null;
      })}

      {/* Taskbar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[32px] flex items-center px-1"
        style={{
          backgroundColor: '#c0c0c0',
          borderTop: '2px solid #fff',
          boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
        }}
      >
        <button 
          className="h-[26px] px-2 flex items-center gap-1"
          style={{
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: isStartMenuOpen ? '#000 #fff #fff #000' : '#fff #000 #000 #fff',
            boxShadow: isStartMenuOpen ? 'inset 1px 1px 0 #808080' : 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsStartMenuOpen(!isStartMenuOpen);
          }}
        >
          {/* Windows 95 Logo */}
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ imageRendering: 'pixelated' }}>
            <path d="M0 0 L8 1 L8 8 L0 8 Z" fill="#ff0000"/>
            <path d="M9 1 L18 2 L18 8 L9 8 Z" fill="#00ff00"/>
            <path d="M0 9 L8 9 L8 16 L0 17 Z" fill="#0000ff"/>
            <path d="M9 9 L18 9 L18 16 L9 17 Z" fill="#ffff00"/>
          </svg>
          <span>Start</span>
        </button>

        {/* Start Menu */}
        {isStartMenuOpen && (
          <StartMenu onClose={() => setIsStartMenuOpen(false)} />
        )}
      </div>
    </div>
  );
}