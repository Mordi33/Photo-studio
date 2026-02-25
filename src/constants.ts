export interface CollageTemplate {
  id: string;
  name: string;
  cells: {
    top: number;
    left: number;
    width: number;
    height: number;
  }[];
}

export const TEMPLATES: CollageTemplate[] = [
  {
    id: 'single',
    name: 'Single',
    cells: [{ top: 0, left: 0, width: 1, height: 1 }]
  },
  {
    id: '2-vertical',
    name: '2 Vertical',
    cells: [
      { top: 0, left: 0, width: 0.5, height: 1 },
      { top: 0, left: 0.5, width: 0.5, height: 1 }
    ]
  },
  {
    id: '2-horizontal',
    name: '2 Horizontal',
    cells: [
      { top: 0, left: 0, width: 1, height: 0.5 },
      { top: 0.5, left: 0, width: 1, height: 0.5 }
    ]
  },
  {
    id: '3-grid',
    name: '3 Grid',
    cells: [
      { top: 0, left: 0, width: 0.5, height: 1 },
      { top: 0, left: 0.5, width: 0.5, height: 0.5 },
      { top: 0.5, left: 0.5, width: 0.5, height: 0.5 }
    ]
  },
  {
    id: '4-grid',
    name: '4 Grid',
    cells: [
      { top: 0, left: 0, width: 0.5, height: 0.5 },
      { top: 0, left: 0.5, width: 0.5, height: 0.5 },
      { top: 0.5, left: 0, width: 0.5, height: 0.5 },
      { top: 0.5, left: 0.5, width: 0.5, height: 0.5 }
    ]
  }
];

export const EMOJIS = ['❤️', '✨', '🔥', '😂', '🚀', '🌈', '🎨', '📸', '🌟', '🎉', '🍕', '🐱', '🐶', '🌸', '☀️'];
