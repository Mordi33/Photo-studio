import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { CollageTemplate } from '../constants';

interface CollageCanvasProps {
  template: CollageTemplate;
  onCanvasReady: (canvas: fabric.Canvas) => void;
}

export const CollageCanvas: React.FC<CollageCanvasProps> = ({ template, onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 600,
      backgroundColor: '#ffffff',
    });

    fabricCanvas.current = canvas;
    onCanvasReady(canvas);

    // Initial template setup
    updateTemplate(canvas, template);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas.current) {
      updateTemplate(fabricCanvas.current, template);
    }
  }, [template]);

  const updateTemplate = (canvas: fabric.Canvas, template: CollageTemplate) => {
    canvas.setDimensions({ width: 600, height: 600 });
    
    // Remove old guides
    const oldGuides = canvas.getObjects().filter(obj => (obj as any).isGuide);
    canvas.remove(...oldGuides);

    // Add new guides
    template.cells.forEach((cell) => {
      const rect = new fabric.Rect({
        top: cell.top * 600,
        left: cell.left * 600,
        width: cell.width * 600,
        height: cell.height * 600,
        fill: 'transparent',
        stroke: '#e4e4e7',
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
      });
      (rect as any).isGuide = true;
      canvas.add(rect);
      canvas.sendObjectToBack(rect);
    });

    canvas.renderAll();
  };

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8 bg-zinc-100 min-h-[700px]">
      <div className="canvas-container shadow-2xl bg-white">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
