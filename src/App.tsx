/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import * as fabric from 'fabric';
import { CollageCanvas } from './components/CollageCanvas';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { TEMPLATES, CollageTemplate } from './constants';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<CollageTemplate>(TEMPLATES[0]);

  const handleCanvasReady = useCallback((readyCanvas: fabric.Canvas) => {
    setCanvas(readyCanvas);
  }, []);

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !canvas) return;

      const reader = new FileReader();
      reader.onload = async (f) => {
        const data = f.target?.result as string;
        const img = await fabric.FabricImage.fromURL(data);
        
        // Scale image to fit reasonably
        const scale = Math.min(300 / img.width!, 300 / img.height!);
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: 150,
          top: 150,
          cornerStyle: 'circle',
          cornerColor: '#18181b',
          cornerStrokeColor: '#ffffff',
          transparentCorners: false,
          borderColor: '#18181b',
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('Tapez ici...', {
      left: 200,
      top: 200,
      fontFamily: 'Inter',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#18181b',
      cornerStyle: 'circle',
      cornerColor: '#18181b',
      cornerStrokeColor: '#ffffff',
      transparentCorners: false,
      borderColor: '#18181b',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addEmoji = (emoji: string) => {
    if (!canvas) return;
    const text = new fabric.Text(emoji, {
      left: 250,
      top: 250,
      fontSize: 80,
      cornerStyle: 'circle',
      cornerColor: '#18181b',
      cornerStrokeColor: '#ffffff',
      transparentCorners: false,
      borderColor: '#18181b',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  };

  const downloadCollage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.download = 'mon-collage.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      <Sidebar 
        currentTemplate={currentTemplate} 
        onSelectTemplate={setCurrentTemplate} 
      />
      
      <main className="flex-1 relative flex flex-col">
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <h1 className="font-display font-bold text-lg tracking-tight">Collage Studio</h1>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 uppercase tracking-widest">
            <span>600 x 600 px</span>
            <div className="w-1 h-1 bg-zinc-200 rounded-full" />
            <span>Format Carré</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <CollageCanvas 
            template={currentTemplate} 
            onCanvasReady={handleCanvasReady} 
          />
        </div>

        <Toolbar 
          onAddImage={addImage}
          onAddText={addText}
          onAddEmoji={addEmoji}
          onDelete={deleteSelected}
          onClear={clearCanvas}
          onDownload={downloadCollage}
        />
      </main>

      <AnimatePresence>
        {!canvas && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-zinc-900 rounded-2xl mb-4"
            />
            <p className="font-display font-bold text-xl">Initialisation du studio...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
