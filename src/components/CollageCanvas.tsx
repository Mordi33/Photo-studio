import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

interface CollageCanvasProps {
  width: number;
  height: number;
  onCanvasReady: (canvas: fabric.Canvas) => void;
}

export const CollageCanvas: React.FC<CollageCanvasProps> = ({ 
  width, 
  height, 
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: '#ffffff',
    });

    fabricCanvas.current = canvas;
    onCanvasReady(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.setDimensions({ width, height });
      fabricCanvas.current.renderAll();
    }
  }, [width, height]);

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8 bg-zinc-100 min-h-[700px]">
      <div className="canvas-container shadow-2xl bg-white" style={{ width, height }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
