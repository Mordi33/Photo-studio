import React from 'react';
import { CollageTemplate, TEMPLATES } from '../constants';
import { Layout } from 'lucide-react';

interface SidebarProps {
  currentTemplate: CollageTemplate;
  onSelectTemplate: (template: CollageTemplate) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTemplate, onSelectTemplate }) => {
  return (
    <div className="w-72 border-r border-zinc-200 bg-white h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-200">
        <h2 className="font-display text-xl font-bold flex items-center gap-2">
          <Layout className="text-zinc-400" size={20} />
          Templates
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`
                group relative aspect-square rounded-xl border-2 transition-all p-2
                ${currentTemplate.id === template.id 
                  ? 'border-zinc-900 bg-zinc-50' 
                  : 'border-zinc-100 hover:border-zinc-300 bg-white'}
              `}
            >
              <div className="w-full h-full relative border border-zinc-200 rounded-sm overflow-hidden bg-zinc-100">
                {template.cells.map((cell, idx) => (
                  <div
                    key={idx}
                    className="absolute border border-zinc-300 bg-white"
                    style={{
                      top: `${cell.top * 100}%`,
                      left: `${cell.left * 100}%`,
                      width: `${cell.width * 100}%`,
                      height: `${cell.height * 100}%`,
                    }}
                  />
                ))}
              </div>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white px-2 py-0.5 rounded-full">
                {template.name}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Conseils</h3>
          <ul className="text-sm text-zinc-500 space-y-3">
            <li className="flex gap-2">
              <span className="text-zinc-900 font-bold">01</span>
              Glissez vos photos pour les déplacer
            </li>
            <li className="flex gap-2">
              <span className="text-zinc-900 font-bold">02</span>
              Utilisez les poignées pour redimensionner
            </li>
            <li className="flex gap-2">
              <span className="text-zinc-900 font-bold">03</span>
              Double-cliquez sur le texte pour éditer
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
