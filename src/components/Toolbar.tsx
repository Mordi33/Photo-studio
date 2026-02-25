import React from 'react';
import { Image, Type, Smile, Layout, Download, Trash2, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { EMOJIS } from '../constants';

interface ToolbarProps {
  onAddImage: () => void;
  onAddText: () => void;
  onAddEmoji: (emoji: string) => void;
  onDownload: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddImage,
  onAddText,
  onAddEmoji,
  onDownload,
  onDelete,
  onClear,
}) => {
  const [showEmojis, setShowEmojis] = React.useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/80 backdrop-blur-md border border-zinc-200 rounded-2xl shadow-xl z-50">
      <ToolButton onClick={onAddImage} icon={<Image size={20} />} label="Photo" />
      <ToolButton onClick={onAddText} icon={<Type size={20} />} label="Texte" />
      
      <div className="relative">
        <ToolButton 
          onClick={() => setShowEmojis(!showEmojis)} 
          icon={<Smile size={20} />} 
          label="Emoji" 
          active={showEmojis}
        />
        {showEmojis && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full mb-4 left-0 p-3 bg-white border border-zinc-200 rounded-xl shadow-2xl grid grid-cols-5 gap-2 w-48"
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onAddEmoji(emoji);
                  setShowEmojis(false);
                }}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="w-px h-8 bg-zinc-200 mx-1" />

      <ToolButton onClick={onDelete} icon={<Trash2 size={20} />} label="Supprimer" variant="danger" />
      <ToolButton onClick={onClear} icon={<Layers size={20} />} label="Vider" variant="danger" />
      
      <div className="w-px h-8 bg-zinc-200 mx-1" />

      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium"
      >
        <Download size={18} />
        Exporter
      </button>
    </div>
  );
};

interface ToolButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  variant?: 'default' | 'danger';
}

const ToolButton: React.FC<ToolButtonProps> = ({ onClick, icon, label, active, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all
      ${active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}
      ${variant === 'danger' ? 'hover:text-red-600 hover:bg-red-50' : ''}
    `}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">{label}</span>
  </button>
);
