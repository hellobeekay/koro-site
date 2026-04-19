import { useRef, useState, useEffect } from 'react';
import { Window95 } from './Window95';

interface DinoGameProps {
  onClose: () => void;
  zIndex?: number;
}

interface Obstacle {
  x: number;
  type: 'cactus' | 'bird';
  height: number;
}

export function DinoGame({ onClose, zIndex }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameStateRef = useRef({
    dinoY: 0,
    dinoVelocity: 0,
    isJumping: false,
    obstacles: [] as Obstacle[],
    frameCount: 0,
    animFrame: 0,
    speed: 6,
  });

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 200;
  const GROUND_Y = 150;
  const DINO_X = 50;
  const DINO_WIDTH = 40;
  const DINO_HEIGHT = 44;
  const GRAVITY = -0.6;
  const JUMP_FORCE = 12;
  const CACTUS_WIDTH = 20;
  const BIRD_WIDTH = 42;
  const BIRD_HEIGHT = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const drawDino = (y: number, frame: number) => {
      ctx.fillStyle = '#535353';
      
      // Body
      ctx.fillRect(DINO_X + 10, y + 10, 22, 24);
      
      // Head
      ctx.fillRect(DINO_X + 22, y, 18, 14);
      
      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(DINO_X + 30, y + 4, 4, 4);
      
      ctx.fillStyle = '#535353';
      
      // Tail
      ctx.fillRect(DINO_X, y + 18, 10, 8);
      
      // Arms
      ctx.fillRect(DINO_X + 16, y + 22, 6, 8);
      
      // Legs (alternating animation)
      if (frame % 2 === 0) {
        ctx.fillRect(DINO_X + 18, y + 34, 6, 10);
        ctx.fillRect(DINO_X + 26, y + 36, 6, 8);
      } else {
        ctx.fillRect(DINO_X + 18, y + 36, 6, 8);
        ctx.fillRect(DINO_X + 26, y + 34, 6, 10);
      }
    };

    const drawCactus = (x: number, height: number) => {
      ctx.fillStyle = '#535353';
      
      // Main stem
      ctx.fillRect(x + 6, GROUND_Y - height, 8, height);
      
      // Left arm
      ctx.fillRect(x, GROUND_Y - height + 10, 6, 12);
      ctx.fillRect(x, GROUND_Y - height + 10, 10, 6);
      
      // Right arm
      ctx.fillRect(x + 14, GROUND_Y - height + 16, 6, 10);
      ctx.fillRect(x + 10, GROUND_Y - height + 16, 10, 6);
    };

    const drawBird = (x: number, y: number, frame: number) => {
      ctx.fillStyle = '#535353';
      
      // Body
      ctx.fillRect(x + 10, y + 10, 22, 10);
      
      // Head
      ctx.fillRect(x + 26, y + 6, 10, 8);
      
      // Beak
      ctx.fillRect(x + 36, y + 8, 6, 4);
      
      // Wings (flapping animation)
      if (frame % 20 < 10) {
        ctx.fillRect(x + 14, y, 14, 10);
      } else {
        ctx.fillRect(x + 14, y + 6, 14, 8);
      }
    };

    const drawGround = () => {
      ctx.strokeStyle = '#535353';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();
      
      // Ground dashes
      for (let i = 0; i < CANVAS_WIDTH; i += 20) {
        ctx.fillStyle = '#535353';
        ctx.fillRect(i + (gameStateRef.current.frameCount % 20), GROUND_Y + 5, 10, 2);
      }
    };

    const checkCollision = (obstacle: Obstacle) => {
      const dinoBottom = GROUND_Y - gameStateRef.current.dinoY;
      const dinoTop = dinoBottom - DINO_HEIGHT;
      const dinoRight = DINO_X + DINO_WIDTH;
      
      if (obstacle.type === 'cactus') {
        const obstacleTop = GROUND_Y - obstacle.height;
        const obstacleRight = obstacle.x + CACTUS_WIDTH;
        
        return (
          dinoRight > obstacle.x + 5 &&
          DINO_X < obstacleRight - 5 &&
          dinoBottom > obstacleTop &&
          dinoTop < GROUND_Y
        );
      } else {
        // Bird collision
        const birdY = GROUND_Y - 70;
        const birdRight = obstacle.x + BIRD_WIDTH;
        
        return (
          dinoRight > obstacle.x + 5 &&
          DINO_X < birdRight - 5 &&
          dinoTop < birdY + BIRD_HEIGHT &&
          dinoBottom > birdY
        );
      }
    };

    const gameLoop = () => {
      if (!ctx || !gameStarted || gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      const state = gameStateRef.current;
      
      // Clear canvas
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Update dino physics
      if (state.isJumping) {
        state.dinoVelocity += GRAVITY;
        state.dinoY += state.dinoVelocity;
        
        if (state.dinoY <= 0) {
          state.dinoY = 0;
          state.dinoVelocity = 0;
          state.isJumping = false;
        }
      }
      
      // Draw ground
      drawGround();
      
      // Draw dino
      const dinoYPos = GROUND_Y - DINO_HEIGHT - state.dinoY;
      drawDino(dinoYPos, Math.floor(state.frameCount / 6));
      
      // Update and draw obstacles
      state.frameCount++;
      
      // Add new obstacles
      if (state.frameCount % 100 === 0) {
        const shouldAddBird = score > 200 && Math.random() > 0.5;
        state.obstacles.push({
          x: CANVAS_WIDTH,
          type: shouldAddBird ? 'bird' : 'cactus',
          height: 30 + Math.random() * 20,
        });
      }
      
      // Update obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obstacle = state.obstacles[i];
        obstacle.x -= state.speed;
        
        if (obstacle.x < -50) {
          state.obstacles.splice(i, 1);
          setScore(prev => prev + 1);
        } else {
          if (obstacle.type === 'cactus') {
            drawCactus(obstacle.x, obstacle.height);
          } else {
            drawBird(obstacle.x, GROUND_Y - 70, state.frameCount);
          }
          
          // Check collision
          if (checkCollision(obstacle)) {
            setGameOver(true);
            if (score > highScore) {
              setHighScore(score);
            }
          }
        }
      }
      
      // Increase speed over time
      if (state.frameCount % 100 === 0 && state.speed < 12) {
        state.speed += 0.2;
      }
      
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        
        if (!gameStarted) {
          setGameStarted(true);
          setGameOver(false);
          setScore(0);
          gameStateRef.current = {
            dinoY: 0,
            dinoVelocity: 0,
            isJumping: false,
            obstacles: [],
            frameCount: 0,
            animFrame: 0,
            speed: 6,
          };
        } else if (gameOver) {
          setGameOver(false);
          setGameStarted(true);
          setScore(0);
          gameStateRef.current = {
            dinoY: 0,
            dinoVelocity: 0,
            isJumping: false,
            obstacles: [],
            frameCount: 0,
            animFrame: 0,
            speed: 6,
          };
        } else if (!gameStateRef.current.isJumping) {
          gameStateRef.current.isJumping = true;
          gameStateRef.current.dinoVelocity = JUMP_FORCE;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, score, highScore]);

  return (
    <Window95 
      title="Network Error - No Connectivity" 
      onClose={onClose} 
      width={640} 
      height={340} 
      zIndex={zIndex}
    >
      <div 
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ 
          backgroundColor: '#f7f7f7',
          fontFamily: 'MS Sans Serif, sans-serif',
        }}
      >
        {/* Message */}
        {!gameStarted && (
          <div 
            className="mb-4 text-center"
            style={{
              fontSize: '14px',
              color: '#535353',
            }}
          >
            <div className="mb-2">No Internet connection detected.</div>
            <div>Press <span style={{ fontWeight: 'bold' }}>Space</span> to start.</div>
          </div>
        )}

        {/* Game Over Message */}
        {gameOver && (
          <div 
            className="absolute top-[80px] text-center"
            style={{
              fontSize: '14px',
              color: '#535353',
              fontWeight: 'bold',
            }}
          >
            Game Over — Press <span style={{ fontWeight: 'bold' }}>Space</span> to Restart
          </div>
        )}

        {/* Scoreboard */}
        <div 
          className="absolute top-4 right-4 flex gap-4"
          style={{
            fontSize: '12px',
            color: '#535353',
            fontFamily: 'Courier New, monospace',
          }}
        >
          <div>HI: {String(highScore).padStart(5, '0')}</div>
          <div>{String(score).padStart(5, '0')}</div>
        </div>

        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: '2px solid',
            borderColor: '#808080 #fff #fff #808080',
            imageRendering: 'pixelated',
          }}
        />

        {/* Instructions */}
        <div 
          className="mt-4 text-center"
          style={{
            fontSize: '11px',
            color: '#808080',
          }}
        >
          Press <span style={{ fontWeight: 'bold' }}>SPACE</span> to jump
        </div>
      </div>
    </Window95>
  );
}