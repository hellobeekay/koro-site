import { useEffect, useRef, useState } from 'react';
import {
  COFFEE_IMAGE_COUNT,
  COFFEE_PRODUCT_IMAGES,
} from '../content/coffeeProductImages';

export function UnblurHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  /** Downscaled pixelated rasters; drawn scaled up to the main canvas (no toDataURL). */
  const pixelatedCanvasesRef = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const images = [...COFFEE_PRODUCT_IMAGES];
    let loadedCount = 0;

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const pixelCanvas = document.createElement('canvas');
        const pixelCtx = pixelCanvas.getContext('2d');
        if (!pixelCtx) return;

        const pixelSize = 0.05;
        const smallWidth = Math.max(1, Math.floor(img.width * pixelSize));
        const smallHeight = Math.max(1, Math.floor(img.height * pixelSize));

        pixelCanvas.width = smallWidth;
        pixelCanvas.height = smallHeight;
        pixelCtx.drawImage(img, 0, 0, smallWidth, smallHeight);

        pixelatedCanvasesRef.current[index] = pixelCanvas;
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !pixelatedCanvasesRef.current[currentImageIndex]) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const drawPixelatedLayer = (index: number) => {
      const src = pixelatedCanvasesRef.current[index];
      if (!src) return;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawPixelatedLayer(currentImageIndex);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastX = -1;
    let lastY = -1;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';

      const brushSize = 80;

      if (lastX !== -1 && lastY !== -1) {
        const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
        const steps = Math.max(1, Math.floor(distance / 5));

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const interpX = lastX + (x - lastX) * t;
          const interpY = lastY + (y - lastY) * t;
          ctx.fillRect(interpX - brushSize, interpY - brushSize, brushSize * 2, brushSize * 2);
        }
      } else {
        ctx.fillRect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
      }

      lastX = x;
      lastY = y;
      ctx.globalCompositeOperation = 'source-over';
    };

    const resetTrail = () => {
      lastX = -1;
      lastY = -1;
    };

    const handleClick = () => {
      setCurrentImageIndex((i) => (i + 1) % COFFEE_IMAGE_COUNT);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', resetTrail);
    container.addEventListener('pointercancel', resetTrail);
    container.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', resetTrail);
      container.removeEventListener('pointercancel', resetTrail);
      container.removeEventListener('click', handleClick);
    };
  }, [imagesLoaded, currentImageIndex]);

  const clearUrl = COFFEE_PRODUCT_IMAGES[currentImageIndex];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden touch-none"
      style={{ touchAction: 'none' }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${clearUrl})` }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated', touchAction: 'none' }}
      />
    </div>
  );
}
