import { useEffect, useRef, useState } from 'react';
import heroImage from '@/assets/images/home/hero-1.png';
import heroImage2 from '@/assets/images/home/hero-2.png';
import heroImage3 from '@/assets/images/home/hero-3.png';

export function UnblurHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const pixelatedImagesRef = useRef<HTMLImageElement[]>([]);
  const clearImagesRef = useRef<string[]>([heroImage, heroImage2, heroImage3]);

  useEffect(() => {
    // Create pixelated versions of both images
    const images = [heroImage, heroImage2, heroImage3];
    let loadedCount = 0;
    
    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      
      img.onload = () => {
        const pixelCanvas = document.createElement('canvas');
        const pixelCtx = pixelCanvas.getContext('2d');
        if (!pixelCtx) return;
        
        // Set small size for pixelation - smaller value = more pixelated
        const pixelSize = 0.05; // 5% for heavy pixelation effect
        const smallWidth = img.width * pixelSize;
        const smallHeight = img.height * pixelSize;
        
        // Draw small version
        pixelCanvas.width = smallWidth;
        pixelCanvas.height = smallHeight;
        pixelCtx.drawImage(img, 0, 0, smallWidth, smallHeight);
        
        // Create image element from pixelated data
        const pixelatedImg = new Image();
        pixelatedImg.src = pixelCanvas.toDataURL();
        pixelatedImg.onload = () => {
          pixelatedImagesRef.current[index] = pixelatedImg;
          loadedCount++;
          if (loadedCount === images.length) {
            setImagesLoaded(true);
          }
        };
      };
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !pixelatedImagesRef.current[currentImageIndex]) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    // Set canvas size and draw initial pixelated image
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Draw pixelated image to fill canvas
      if (pixelatedImagesRef.current[currentImageIndex]) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pixelatedImagesRef.current[currentImageIndex], 0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastX = -1;
    let lastY = -1;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Erase pixelated canvas to reveal clear image below
      ctx.globalCompositeOperation = 'destination-out';
      
      const brushSize = 80; // Half size for centering
      
      // If we have a last position, draw line between points for smooth trail
      if (lastX !== -1 && lastY !== -1) {
        const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
        const steps = Math.max(1, Math.floor(distance / 5));
        
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const interpX = lastX + (x - lastX) * t;
          const interpY = lastY + (y - lastY) * t;
          
          // Draw square brush centered on cursor
          ctx.fillRect(interpX - brushSize, interpY - brushSize, brushSize * 2, brushSize * 2);
        }
      } else {
        // Draw square brush centered on cursor
        ctx.fillRect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
      }
      
      lastX = x;
      lastY = y;
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    };

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
    };

    const handleClick = () => {
      // Toggle to next image
      const nextIndex = (currentImageIndex + 1) % 3;
      setCurrentImageIndex(nextIndex);
      
      // Reset canvas to pixelated state with new image
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (pixelatedImagesRef.current[nextIndex]) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pixelatedImagesRef.current[nextIndex], 0, 0, canvas.width, canvas.height);
      }
      
      lastX = -1;
      lastY = -1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [imagesLoaded, currentImageIndex]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Clear background image (bottom layer) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${clearImagesRef.current[currentImageIndex]})` }}
      />
      
      {/* Canvas with pixelated image that gets erased */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}