/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import * as fabric from 'fabric';
import { CollageCanvas } from './components/CollageCanvas';
import { Toolbar } from './components/Toolbar';
import { CANVAS_FORMATS, CanvasFormat } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Settings2 } from 'lucide-react';

export default function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [currentFormat, setCurrentFormat] = useState<CanvasFormat>(CANVAS_FORMATS[0]);
  const [customWidth, setCustomWidth] = useState(600);
  const [customHeight, setCustomHeight] = useState(600);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [showResolutionSettings, setShowResolutionSettings] = useState(false);

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
        
        const scale = Math.min(300 / img.width!, 300 / img.height!);
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: customWidth / 4,
          top: customHeight / 4,
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
      left: customWidth / 3,
      top: customHeight / 3,
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
      left: customWidth / 2,
      top: customHeight / 2,
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

  const updateFormat = (format: CanvasFormat) => {
    setCurrentFormat(format);
    setCustomWidth(format.width);
    setCustomHeight(format.height);
    setShowFormatMenu(false);
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      <main className="flex-1 relative flex flex-col">
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm" />
            </div>
            <h1 className="font-display font-bold text-lg tracking-tight">Collage Studio</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowFormatMenu(!showFormatMenu)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 rounded-lg transition-colors text-sm font-semibold text-zinc-700"
              >
                {currentFormat.name}
                <ChevronDown size={16} className={`transition-transform ${showFormatMenu ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showFormatMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
                  >
                    {CANVAS_FORMATS.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => updateFormat(format)}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50 transition-colors flex items-center justify-between ${currentFormat.id === format.id ? 'bg-zinc-50 font-bold text-zinc-900' : 'text-zinc-600'}`}
                      >
                        {format.name}
                        <span className="text-[10px] text-zinc-400">{format.width}x{format.height}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-zinc-200" />

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowResolutionSettings(!showResolutionSettings)}
                className={`p-2 rounded-lg transition-colors ${showResolutionSettings ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-500'}`}
              >
                <Settings2 size={20} />
              </button>

              <AnimatePresence>
                {showResolutionSettings && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 bg-white border border-zinc-200 p-2 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">L</span>
                      <input 
                        type="number" 
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className="w-16 px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-xs font-bold focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <span className="text-zinc-300">×</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">H</span>
                      <input 
                        type="number" 
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className="w-16 px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-xs font-bold focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showResolutionSettings && (
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                  <span>{customWidth} x {customHeight} px</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <CollageCanvas 
            width={customWidth}
            height={customHeight}
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
