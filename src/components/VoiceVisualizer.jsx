import { useEffect, useRef } from 'react';

const VoiceVisualizer = ({ isListening, audioLevel = 0 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isListening) {
        // Draw animated voice waves
        const time = Date.now() * 0.005;
        const waves = 5;
        
        for (let i = 0; i < waves; i++) {
          const radius = 20 + i * 15 + Math.sin(time + i) * 10;
          const opacity = 0.3 - i * 0.05;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, audioLevel]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default VoiceVisualizer;