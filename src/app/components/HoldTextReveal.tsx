import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const serviceTexts = [
  // First Row
  'Brand Design',
  'Packaging Design',
  'Web Design',
  // Second Row
  'Social Media',
  'Strategy',
  'Content Creation',
  // Third Row
  'Campaigns',
  'Creative Direction',
  'Production',
];

interface TextPosition {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface HoldTextRevealProps {
  onHoldChange: (isHolding: boolean) => void;
}

export function HoldTextReveal({ onHoldChange }: HoldTextRevealProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [textPositions, setTextPositions] = useState<TextPosition[]>([]);
  const holdTimeoutRef = useRef<number>();

  useEffect(() => {
    const handleMouseDown = () => {
      // Small delay to differentiate from clicks
      holdTimeoutRef.current = window.setTimeout(() => {
        setIsHolding(true);
        onHoldChange(true);
        
        // Generate evenly spaced positions for texts in a grid
        const positions: TextPosition[] = serviceTexts.map((text, index) => {
          const cols = 3;
          const rows = Math.ceil(serviceTexts.length / cols);
          const col = index % cols;
          const row = Math.floor(index / cols);
          
          return {
            id: index,
            text,
            x: 20 + (col * 60 / (cols - 1)), // Evenly space from 20% to 80%
            y: 25 + (row * 50 / (rows - 1)), // Evenly space from 25% to 75%
          };
        });
        
        setTextPositions(positions);
      }, 150);
    };

    const handleMouseUp = () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
      setIsHolding(false);
      onHoldChange(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onHoldChange]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {isHolding && textPositions.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute text-white whitespace-nowrap"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: 'easeOut',
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}