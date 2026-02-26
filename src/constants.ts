export interface CanvasFormat {
  id: string;
  name: string;
  width: number;
  height: number;
}

export const CANVAS_FORMATS: CanvasFormat[] = [
  { id: 'square', name: 'Carré', width: 600, height: 600 },
  { id: 'landscape', name: 'Paysage', width: 800, height: 600 },
  { id: 'portrait', name: 'Portrait', width: 600, height: 800 },
];

export const EMOJIS = ['❤️', '✨', '🔥', '😂', '🚀', '🌈', '🎨', '📸', '🌟', '🎉', '🍕', '🐱', '🐶', '🌸', '☀️'];
